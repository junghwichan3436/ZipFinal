import { useState, useEffect } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--ott-bg-color);
  color: var(--light-color);
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  gap: 40px;
  padding-top: 120px;
  padding-bottom: 30px;
  border-bottom: 1px solid #3c3c3c;
  h4 {
    font-size: 7rem;
    font-family: "EHNormalTrial";
    font-weight: bold;
  }
  p {
    line-height: 1.2;
    b {
      font-family: "EHNormalTrial";
    }
  }
  @media (max-width: 1024px) {
    gap: 20px;
    h4 {
      font-size: 5rem;
    }
    p {
      font-size: 1.4rem;
    }
  }
  @media (max-width: 428px) {
    gap: 20px;
    h4 {
      font-size: 3rem;
    }
  }
`;

const FilterGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  select {
    padding: 0 30px 0 10px;
    border: 1px solid #3c3c3c;
    background: var(--ott-bg-color);
    color: var(--light-color);
    outline: none;
    cursor: pointer;
  }
  @media (max-width: 428px) {
    select {
      padding: 0 16px 0 8px;
    }
  }
`;

const Category = styled.ul`
  width: 100%;
  display: flex;
  li {
    font-family: "EHNormalTrial";
    padding: 14px 20px;
    /* border: 1px solid var(--light-color); */
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      background: var(--light-color);
      color: var(--dark-color);
    }
    &.active {
      background: var(--light-color);
      color: var(--dark-color);
    }
  }
  @media (max-width: 1024px) {
    li {
      font-size: 1.4rem;
    }
  }
  @media (max-width: 428px) {
    li {
      padding: 10px 16px;
      font-size: 1.4rem;
    }
  }
`;

const Contents = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  margin: 40px 0;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Video = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
  } */
  img {
    width: 100%;
    object-fit: cover;
    cursor: pointer;
    transition: scale 0.3s;
    &:hover {
      scale: 1.1;
      /* transform: translateY(-10%); */
    }
  }
`;

const VideoText = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    width: 44px;
    height: 44px;
    object-fit: cover;
    border-radius: 50%;
  }
  p {
    &:nth-child(1) {
      font-weight: bold;
      margin-bottom: 10px;
    }
    &:nth-child(2) {
      font-size: 1.4rem;
      color: var(--border-color);
    }
  }
`;

const InMyBag = () => {
  const [artists, setArtists] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  useEffect(() => {
    fetch("/API/index.json")
      .then((res) => res.json())
      .then((data) => setArtists(data.artists))
      .catch((err) => console.error("데이터 에러", err));
  });

  const filteredArtists =
    selectedCategory === "ALL"
      ? artists
      : artists.filter(
          (artist) => artist.jobCategory.toUpperCase() === selectedCategory
        );
  // const opts = {
  //   width: "100%",
  //   height: "100%",
  //   playerVars: {
  //     mute: 1,
  //     rel: 0, //관련 동영상 표시하지 않음
  //     modestbranding: 1, // 유튜브 로고 최소화
  //     controls: 0, // 컨트롤 바 숨기기
  //     fs: 0, // 전체화면 버튼 숨기기
  //     disablekb: 1, // 키보드 제어 비활성화
  //   },
  // };
  return (
    <Container>
      <Title>
        <h4>BAG ZIP</h4>
        <p>
          당신이 좋아하는 연예인의 취향을 인마이백으로,
          <br />
          <b>BAG ZIP</b>에서
        </p>
      </Title>
      <FilterGroup>
        <Category>
          {["ALL", "ACTOR", "MUSICIAN", "SPORTS"].map((data) => (
            <li
              className={selectedCategory === data ? "active" : ""}
              key={data}
              onClick={() => setSelectedCategory(data)}
            >
              {data}
            </li>
          ))}
        </Category>
        <select name="filter" id="">
          <option value="">최신순</option>
          <option value="">인기순</option>
          <option value="">조회순</option>
        </select>
      </FilterGroup>
      <Contents>
        {filteredArtists.map((artist) => (
          <Video>
            {/* <YouTube videoId="5BRaRTjCPT0" opts={opts} /> */}
            <img
              src={`https://img.youtube.com/vi/${artist.videoURL}/maxresdefault.jpg`}
              alt=""
            />
            <VideoText>
              <div>
                <img src={artist.artistImg} alt="" />
              </div>
              <div>
                <p>{artist.artistName}의 애장템은?</p>
                <p>W 코리아</p>
              </div>
            </VideoText>
          </Video>
        ))}
      </Contents>
    </Container>
  );
};

export default InMyBag;
