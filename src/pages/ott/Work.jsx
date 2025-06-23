import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StarData, workingDataWithViews } from "../../StarData";
import styled from "styled-components";
import Pagination from "react-js-pagination";

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
  /* border-bottom: 1px solid #3c3c3c; */
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
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: start;
    gap: 20px;
    /* h4 {
      font-size: 3rem;
    } */
    p {
      display: flex;
      /* letter-spacing: 0.1rem; */
    }
  }
`;

const FilterGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  border: 1px solid var(--border-bottom);
  select {
    border: none;
    padding: 0 30px 0 10px;
    border-left: 1px solid var(--border-bottom);
    background: var(--ott-bg-color);
    color: var(--light-color);
    outline: none;
    cursor: pointer;
  }
  @media (max-width: 767px) {
    select {
      padding: 0 14px 0 8px;
    }
  }
`;

const Category = styled.ul`
  width: 100%;
  display: flex;
  li {
    background: var(--light-color);
    color: var(--dark-color);
    font-family: "EHNormalTrial";
    padding: 14px 20px;
    cursor: pointer;
  }
  @media (max-width: 1024px) {
    li {
      font-size: 1.4rem;
    }
  }
  @media (max-width: 767px) {
    li {
      padding: 10px 14px;
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
  @media (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Video = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
  /* iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
  } */
  img {
    width: 100%;
    object-fit: cover;
    aspect-ratio: 16 / 9;
    transition: scale 0.3s;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      scale: 1.04;
      /* transform: translateY(-10%); */
    }
  }
`;

const VideoText = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
  }
  p {
    &:nth-child(1) {
      /* font-weight: bold; */
      line-height: 1.2;
      margin-bottom: 10px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &:nth-child(2) {
      font-size: 1.4rem;
      color: var(--subTitle);
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

const PaginationWrap = styled.div`
  width: 100%;
  margin-bottom: 40px;
  ul {
    display: flex;
    justify-content: center;
    li {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--border-color);
      &.active {
        color: var(--light-color);
      }
    }
  }
`;

const Work = () => {
  const [sortOrder, setSortOrder] = useState("latest");
  const [page, setPage] = useState(1); //현재 페이지

  const { data, isLoading, error } = workingDataWithViews();
  const {
    data: starData,
    isLoading: starLoading,
    error: starError,
  } = StarData();
  const navigate = useNavigate();

  const filteredItems = data?.slice().sort((a, b) => {
    if (sortOrder === "latest") {
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    } else if (sortOrder === "popular") {
      return (b.viewCount || 0) - (a.viewCount || 0);
    }
    return 0;
  });

  //pagenation
  const itemsPerPage = 12;
  const changePageHandler = (pageNumber) => {
    setPage(pageNumber);
  };
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems?.slice(startIndex, endIndex);

  return (
    <Container>
      <Title>
        <h4>WORK ZIP</h4>
        <p>
          스타의 프로페셔널한 모습,
          <br />
          한눈에 <b>ZIP</b>
        </p>
      </Title>
      <FilterGroup>
        <Category>
          <li>ALL</li>
        </Category>
        <select
          name="filter"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="latest">최신순</option>
          <option value="popular">인기순</option>
          {/* <option value="">조회순</option> */}
        </select>
      </FilterGroup>
      <Contents>
        {paginatedItems?.map((item) => {
          const title = item.title || item.snippet?.title;
          const videoId = item.resourceId?.videoId || item.videoId || item.id;
          const thumbnail =
            item.thumbnails?.maxres?.url || item.thumbnails?.high?.url;
          const videoOwnerChannelTitle =
            item.videoOwnerChannelTitle || item.snippet?.videoOwnerChannelTitle;

          const matchedArtist = starData?.artists?.find((artist) =>
            title.includes(artist.artistName)
          );

          return (
            <Video key={videoId}>
              <img
                src={thumbnail}
                alt={title}
                onClick={() =>
                  navigate(`/ott/detail/${encodeURIComponent(title)}`)
                }
              />
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
      <PaginationWrap>
        <Pagination
          activePage={page}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={filteredItems?.length}
          pageRangeDisplayed={5}
          hideFirstLastPages={true} // 첫페이지, 끝페이지 버튼 숨기기
          onChange={changePageHandler} // 페이지 바뀔때 함수
        />
      </PaginationWrap>
    </Container>
  );
};

export default Work;
