import { useState } from "react";
import styled from "styled-components";
import { bagData, StarData } from "../../StarData";

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
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &:nth-child(2) {
      font-size: 1.4rem;
      color: var(--border-color);
    }
  }
  @media screen and (max-width: 767px) {
    p {
      &:nth-child(1) {
        font-size: 1.4rem;
      }
      &:nth-child(2) {
        font-size: 1.2rem;
      }
    }
  }
`;

const InMyBag = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const { data, isLoading, error } = bagData();
  const {
    data: starData,
    isLoading: starLoading,
    error: starError,
  } = StarData();

  const filteredItems =
    selectedCategory === "ALL"
      ? data?.items
      : data?.items.filter((item) =>
          item.snippet.videoOwnerChannelTitle
            ?.toUpperCase()
            .includes(selectedCategory.toUpperCase())
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
          {["ALL", "ALLURE", "ELLE", "GQ", "VOGUE", "W"].map((data) => (
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
        {filteredItems?.map((item) => {
          const { snippet } = item;
          const videoId = snippet.resourceId?.videoId;
          const thumbnail = snippet.thumbnails?.maxres?.url;
          const title = snippet.title;
          const videoOwnerChannelTitle = snippet.videoOwnerChannelTitle;

          const matchedArtist = starData?.artists?.find((artist) =>
            title.includes(artist.artistName)
          );

          return (
            <Video key={videoId}>
              <img src={thumbnail} alt={title} />
              <VideoText>
                <div>
                  <img
                    src={matchedArtist ? matchedArtist.artistImg : ""}
                    alt={matchedArtist?.artistName || "artist"}
                  />
                </div>
                <div>
                  <p>{title}</p>
                  <p>{videoOwnerChannelTitle}</p>
                </div>
              </VideoText>
            </Video>
          );
        })}
      </Contents>
    </Container>
  );
};

export default InMyBag;
