import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://easvtzmweodflypqdahr.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhc3Z0em13ZW9kZmx5cHFkYWhyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyNTgyNzMsImV4cCI6MTk4MzgzNDI3M30.bYhoGvhdWa5pJATg11innRmyFc5inzPaJr9fahvF_0s";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
  return {
    getAllVideos() {
      return supabase
        .from("video")
        .select("*");
    },
  };
}
