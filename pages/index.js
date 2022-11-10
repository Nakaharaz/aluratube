import styled from 'styled-components'
import { useState } from 'react'

import config from '../config.json'
import { CSSReset } from '../src/components/CSSReset';
import Menu from '../src/components/Menu';
import { StyledTimeline } from '../src/components/TimeLine';

function HomePage() {
    const [filterValue, setFilterValue] = useState('');

    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
            }}>
                <Menu filterValue={filterValue} setFilterValue={setFilterValue} />
                <Header imageSrc={config.mainBanner} />
                <TimeLine searchValue={filterValue} playlists={config.playlists} />
            </div>
        </>
    );
}

export default HomePage

const StyledHeader = styled.div`
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
        box-shadow: 0px 5px 10px rgba(70, 130, 180, .5);
    }
`;
const StyledBanner = styled.div`
    background-image: url(${config.bg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    height: 250px;

`

function Header(props) {

    return (
        <StyledHeader>
            <StyledBanner />
            <section className="user-info">
                <img className="avatar" src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
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

                                    return titleNormalized.includes(searchValueNormalized)
                                })
                                .map((video) => {
                                    return (
                                        <a key={video.url} href={video.url}>
                                            <img src={video.thumb} />
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                                })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}

