import { useState } from "react";
import styled from "styled-components";
import { StarData, bagDataWithViews } from "../../StarData";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--ott-bg-color);
  color: var(--light-color);
  padding-top: 120px;
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  gap: 40px;
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
      font-size: 1.6rem;
    }
  }
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: start;
    gap: 20px;
    h4 {
      font-size: 4rem;
    }
    p {
      display: flex;
      font-size: 1.4rem;
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
    cursor: pointer;
    transition: scale 0.3s;
    border-radius: 4px;
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

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const InMyBag = () => {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("latest");
  const { data, isLoading, error } = bagDataWithViews();
  const {
    data: starData,
    isLoading: starLoading,
    error: starError,
  } = StarData();
  const navigate = useNavigate();

  const [page, setPage] = useState(1); //현재 페이지
  const itemsPerPage = 12;
  const changePageHandler = (pageNumber) => {
    setPage(pageNumber);
  };

  const categoryFiltered =
    selectedCategory === "ALL"
      ? data
      : data?.filter((item) =>
          item.videoOwnerChannelTitle
            ?.toUpperCase()
            .includes(selectedCategory.toUpperCase())
        );

  const filteredItems = categoryFiltered?.slice().sort((a, b) => {
    if (sortOrder === "latest") {
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    } else if (sortOrder === "popular") {
      return (b.viewCount || 0) - (a.viewCount || 0);
    }
    return 0;
  });

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = filteredItems?.slice(startIndex, endIndex);

  return (
    <Container>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <div>
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
              // const { snippet } = item;
              // const videoId = snippet.resourceId?.videoId;
              // const thumbnail = snippet.thumbnails?.maxres?.url;
              // const title = snippet.title;
              // const videoOwnerChannelTitle = snippet.videoOwnerChannelTitle;

              const title = item.title || item.snippet?.title;
              const videoId =
                item.resourceId?.videoId || item.videoId || item.id;
              const thumbnail =
                item.thumbnails?.maxres?.url || item.thumbnails?.high?.url;
              const videoOwnerChannelTitle =
                item.videoOwnerChannelTitle ||
                item.snippet?.videoOwnerChannelTitle;

              console.log(filteredItems);

              const matchedArtist = starData?.artists?.find((artist) =>
                title.includes(artist.artistName)
              );
              // console.log(snippet);
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
                        onClick={() =>
                          navigate(`/star/${matchedArtist.artistName}`)
                        }
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
        </div>
      )}
    </Container>
  );
};

export default InMyBag;
