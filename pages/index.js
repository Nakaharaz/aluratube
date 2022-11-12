import styled from "styled-components";
import { useEffect, useState } from "react";

import config from "../config.json";
import Menu from "../src/components/Menu";
import { CSSReset } from "../src/components/CSSReset";
import { StyledTimeline } from "../src/components/TimeLine";
import { StyledFavorites } from "../src/components/Favorites";
import { videoService } from "../src/services/videoService";

function HomePage() {
  const service = videoService();
  const [filterValue, setFilterValue] = useState("");
  const [playlists, setPlaylists] = useState({});

  useEffect(() => {
    service
      .getAllVideos()
      .then((response) => {
        const novasPlaylists = { ...playlists };

        response.data.forEach((video) => {
          if (!novasPlaylists[video.playlist]) {
            novasPlaylists[video.playlist] = [];
          }
          novasPlaylists[video.playlist].push(video);
        });
        setPlaylists(novasPlaylists);
      });
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <Menu filterValue={filterValue} setFilterValue={setFilterValue} />
        <Header imageSrc={config.mainBanner} />
        <TimeLine searchValue={filterValue} playlists={playlists} />
        <Favorites favorites={config.favorites} />
      </div>
    </>
  );
}

export default HomePage;

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgrounLevel1};

  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    box-shadow: 0px 0px 5px black;
  }
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
    box-shadow: 0px 5px 10px black;
  }
`;
const StyledBanner = styled.div`
  background-image: url(${config.bg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 250px;
`;

function Header(props) {
  return (
    <StyledHeader>
      <StyledBanner />
      <section className="user-info">
        <img
          className="avatar"
          src={`https://github.com/${config.github}.png`}
        />
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  );
}

function TimeLine({ searchValue, ...props }) {
  const playlistsNames = Object.keys(props.playlists);

  return (
    <StyledTimeline>
      {playlistsNames.map((playlistName) => {
        const videos = props.playlists[playlistName];
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter((video) => {
                  const titleNormalized = video.title.toLowerCase();
                  const searchValueNormalized = searchValue.toLowerCase();

                  return titleNormalized.includes(searchValueNormalized);
                })
                .map((video) => {
                  return (
                    <a key={video.url} href={video.url} target={"_blank"}>
                      <img src={video.thumb} />
                      <span>{video.title}</span>
                    </a>
                  );
                })}
            </div>
          </section>
        );
      })}
    </StyledTimeline>
  );
}

function Favorites(props) {
  const favorites = props.favorites;

  return (
    <StyledFavorites>
      <h2> Favoritos </h2>
      <section>
        {favorites.map((favorites) => {
          return (
            <a
              key={favorites.channelUrl}
              href={favorites.channelUrl}
              target={"_blank"}
            >
              <img className="favorite-avatar" src={favorites.channelAvatar} />
              <span>{favorites.name}</span>
            </a>
          );
        })}
      </section>
    </StyledFavorites>
  );
}
