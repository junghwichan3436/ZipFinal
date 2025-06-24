import { useState } from "react";
import { StarData, useAllDataViews, playlistIds } from "../../StarData";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import Pagination from "react-js-pagination";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  .videoWrapper {
    display: flex;
    width: 100%;
    &.active {
      .swiper-button-prev,
      .swiper-button-next {
        display: none;
      }
    }
  }
  .swiper-slide {
    display: flex;
    flex-direction: column;
    gap: 16px;
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
  }
`;
const Value = styled.p`
  font-size: 2.4rem;
  span {
    font-weight: bold;
    display: inline-block;
  }
`;
const NotFound = styled.p`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
const StarResult = styled.div`
  display: flex;
  gap: 20px;
  font-size: 1.4rem;
  text-align: center;
  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    object-fit: cover;
  }
`;
const VideoResult = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const VideoWrap = styled.div`
  display: flex;
  gap: 20px;
  div {
    &:nth-child(1) {
      img {
        aspect-ratio: 16 / 9;
        width: 350px;
        object-fit: cover;
        cursor: pointer;
        border-radius: 4px;
      }
    }
    &:nth-child(2) {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      gap: 20px;
      div {
        display: flex;
        flex-direction: column;
        gap: 10px;
        &:nth-child(2) {
          display: flex;
          flex-direction: column;
          span {
            font-size: 1.2rem;
            color: var(--video-text);
            &:nth-child(1) {
              display: flex;
              align-items: center;
              gap: 14px;
              cursor: pointer;
              span {
                color: var(--light-color);
                font-size: 1.4rem;
              }
              img {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                object-fit: cover;
              }
            }
          }
        }
        &:nth-child(3) {
          span {
            font-size: 1.4rem;
          }
        }
        h3 {
          font-size: 1.8rem;
          line-height: 2.4rem;
          cursor: pointer;
        }
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          font-size: 1.4rem;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          color: var(--video-text);
        }
      }
    }
  }
  @media screen and (max-width: 1024px) {
    div {
      &:nth-child(1) {
        img {
          width: 300px;
        }
      }
      &:nth-child(2) {
        div {
          h3 {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            font-size: 1.6rem;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    div {
      &:nth-child(1) {
        img {
          width: 300px;
        }
      }
    }
  }
  @media screen and (max-width: 560px) {
    div {
      &:nth-child(1) {
        img {
          width: 250px;
        }
      }
    }
  }
`;
const PaginationWrap = styled.div`
  width: 100%;
  padding-bottom: 30px;
  ul {
    display: flex;
    justify-content: center;
    li {
      width: 30px;
      height: 30px;
    }
  }
`;

const OttSearchUpdate = ({ inputValue, scrollAreaRef }) => {
  console.log(scrollAreaRef);
  const [page, setPage] = useState(1); //현재 페이지
  const changePageHandler = (pageNumber) => {
    setPage(pageNumber);
    scrollAreaRef.current.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const { isLoading, data } = StarData();
  const { isLoading: loading02, data: data02 } = useAllDataViews(playlistIds);
  const navigate = useNavigate();
  let star = data?.artists?.filter((artist) =>
    artist.artistName.includes(inputValue)
  );
  let video = data02?.filter((item) => item.title.includes(inputValue));

  const date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  const today = `${date.getFullYear()}-${month}-${day}`;
  const calc = 1000 * 60 * 60 * 24;

  const itemsPerPage = 12;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = video?.slice(startIndex, endIndex);

  return (
    <Container>
      {star.length === 0 && video.length === 0 ? (
        <NotFound>검색결과가 없습니다.</NotFound>
      ) : (
        <Value>
          "<span>{inputValue}</span>" 에 대한 검색결과(
          <span>{star.length + video.length}건</span>)입니다.
        </Value>
      )}
      {star.length > 0 ? (
        <StarResult>
          <Swiper
            breakpoints={{
              1920: {
                slidesPerView: 7,
                spaceBetween: 20,
              },
              1440: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              767: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              0: {
                slidesPerView: 4, // ✅ 모바일용 설정 추가 (예: 1개 보여줌)
                spaceBetween: 20,
              },
            }}
            className={"videoWrapper"}
          >
            {star?.map((artist) => (
              <SwiperSlide
                onClick={() => {
                  navigate(`/star/${encodeURIComponent(artist.artistName)}`);
                }}
              >
                <div>
                  <img src={artist.artistImg} alt={artist.artistName} />
                </div>
                <p>{artist.artistName}</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </StarResult>
      ) : null}
      <VideoResult>
        {paginatedItems?.map((item) => {
          const artist = data?.artists?.find((artist) =>
            item.title.includes(artist.artistName)
          );
          const publishedDate = new Date(item.publishedAt.split("T")[0]);
          let diffDays = Math.floor(
            (new Date(today) - new Date(publishedDate)) / calc
          );
          if (diffDays >= 365) {
            diffDays = `${Math.floor(diffDays / 365)}년 전`;
          } else if (diffDays > 31) {
            diffDays = `${Math.floor(diffDays / 31)}달 전`;
          } else {
            diffDays = `${diffDays}일 전`;
          }
          return (
            <VideoWrap>
              <div
                onClick={() => {
                  navigate(`/ott/detail/${encodeURIComponent(item.title)}`);
                }}
              >
                <img src={item.thumbnails.high.url} alt="" />
              </div>
              <div>
                <div>
                  <h3
                    onClick={() => {
                      navigate(`/ott/detail/${encodeURIComponent(item.title)}`);
                    }}
                  >
                    {item.title}
                  </h3>
                  <div>
                    <span
                      onClick={() => navigate(`/star/${artist?.artistName}`)}
                    >
                      <img src={artist?.artistImg} alt="" />
                      <span>{artist?.artistName}</span>
                    </span>
                    <span>
                      조회수 {item.viewCount.toLocaleString()}회 • {diffDays}
                    </span>
                  </div>
                </div>

                <div>
                  <p>{item.description}</p>
                </div>
              </div>
            </VideoWrap>
          );
        })}
      </VideoResult>
      {star.length === 0 && video.length === 0 ? null : (
        <PaginationWrap>
          <Pagination
            activePage={page}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={video?.length}
            pageRangeDisplayed={5}
            prevPageText={"‹"}
            nextPageText={"›"}
            hideFirstLastPages={true}
            onChange={changePageHandler}
          />
        </PaginationWrap>
      )}
    </Container>
  );
};

export default OttSearchUpdate;
