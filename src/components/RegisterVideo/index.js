import { useState } from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js";

function useForm(formProps) {
  const [values, setValues] = useState(formProps.initialValues);

  return {
    values,
    handleChange: (event) => {
      const value = event.target.value;
      const name = event.target.name;

      setValues({
        ...values,
        [name]: value,
      });
    },
    clearForm() {
      setValues({});
    },
  };
}

const PROJECT_URL = "https://easvtzmweodflypqdahr.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhc3Z0em13ZW9kZmx5cHFkYWhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyNTgyNzMsImV4cCI6MTk4MzgzNDI3M30.bYhoGvhdWa5pJATg11innRmyFc5inzPaJr9fahvF_0s";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

function getThumbnail(url) {
  return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}

export default function RegisterVideo() {
  const formRegistration = useForm({
    initialValues: {
      title: "teste",
      url: "teste",
    },
  });
  const [isVisible, setIsVisible] = useState(false);

  return (
    <StyledRegisterVideo>
      <button className="add-video" onClick={() => setIsVisible(true)}>
        +
      </button>
      {isVisible && (
        <form
          onSubmit={(event) => {
            event.preventDefault();

            supabase
              .from("video")
              .insert({
                title: formRegistration.values.title,
                url: formRegistration.values.url,
                thumb: getThumbnail(formRegistration.values.url),
                playlist: "Comédia",
              })
              .then((response) => {
                console.log(response);
              })
              .catch((err) => {
                console.log(err);
              });

            setIsVisible(false);
            formRegistration.clearForm();
          }}
        >
          <div>
            <button className="close-modal" onClick={() => setIsVisible(false)}>
              X
            </button>
            <input
              placeholder="Título do vídeo"
              value={formRegistration.values.title}
              name="title"
              onChange={formRegistration.handleChange}
            />
            <input
              placeholder="URL"
              value={formRegistration.values.url}
              name="url"
              onChange={formRegistration.handleChange}
            />
            <button type="submit">CADASTRAR</button>
          </div>
        </form>
      )}
    </StyledRegisterVideo>
  );
}
