import styled from "styled-components";
import { useAllDataViews, playlistIds, StarData } from "../../StarData";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import YouTube from "react-youtube";
import { useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  height: 100%;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .videoWrapper {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  @media screen and (max-width: 1024px) {
    gap: 40px;
  }
`;

const Artist = styled.div`
  display: flex;
  width: 100%;
  gap: 50px;
  text-align: center;
  .artistBox {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 1.6rem;
    img {
      width: 100%;
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  @media screen and (max-width: 1300px) {
    flex-direction: column;
    gap: 20px;
  }
  @media screen and (max-width: 767px) {
    .artistBox {
      font-size: 1.4rem;
    }
  }
`;

const Category = styled.div`
  display: flex;
  width: 100%;
  gap: 50px;
  .swiper-slide {
    display: flex;
    cursor: pointer;
    flex-direction: column;
    gap: 16px;
  }
  @media screen and (max-width: 1300px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const SlideTitle = styled.h3`
  font-size: 2.8rem;
  font-weight: bold;
  font-family: "EHNormalTrial";
  z-index: 1;
  width: 10%;
  text-align: left;
  @media screen and (max-width: 1300px) {
    width: 100%;
  }
  @media screen and (max-width: 1024px) {
    font-size: 2.4rem;
  }
`;

const VideoCon = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    aspect-ratio: 16 / 9;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    display: block;
    transition: all 0.3s;
  }
  iframe {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 0;
  }
  &.active {
    img {
      opacity: -1;
    }
  }
`;

const VideoText = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 100px;
  div {
    p {
      font-size: 1.4rem;
      line-height: 1.2;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  @media screen and (max-width: 767px) {
    &:nth-child(2) {
      p {
        font-size: 1.4rem;
        &:nth-child(2) {
          font-size: 1.2rem !important;
        }
      }
    }
  }
`;

const FilterWrap = styled.div`
  display: flex;
  gap: 50px;
  @media screen and (max-width: 1300px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const Filter = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 20px;
  div {
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      position: relative;
      filter: brightness(70%);
      transition: all 0.3s;
    }
    p {
      position: absolute;
      left: 3%;
      bottom: 3%;
      text-transform: uppercase;
      font-family: "EHNormalTrial";
      transition: all 0.3s;
    }
    &:hover {
      img {
        filter: brightness(100%);
      }
      p {
        color: var(--dark-color);
      }
    }
  }
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const OttSearchResult = () => {
  const { isLoading, data } = useAllDataViews(playlistIds);
  const { isLoading: loading02, data: data02 } = StarData();
  const allLoading = isLoading || loading02;

  const topRatedData = useMemo(() => {
    if (allLoading || !data) return [];
    return data.sort((a, b) => b.viewCount - a.viewCount).slice(0, 12);
  }, [allLoading, data]);

  const artist = useMemo(() => {
    if (allLoading || !topRatedData || !data02?.artists) return [];
    return data02?.artists?.filter((artist) =>
      topRatedData?.find((item) => item.title.includes(artist.artistName))
    );
  }, [topRatedData, data02?.artists]);
  const VideoRef = useRef(null);
  const navigate = useNavigate();

  console.log(artist);

  const handleReady = (event) => {
    // event.target은 YT.Player 인스턴스
    VideoRef.current = event.target;
  };

  const VideoPlay = (e) => {
    if (VideoRef.current) {
      e.target.style.opacity = 0;
      VideoRef.current.stopVideo();
      VideoRef.current.playVideo();
    }
  };

  const VideoStop = (e) => {
    if (VideoRef.current) {
      e.target.style.opacity = 1;
      VideoRef.current.stopVideo();
    }
  };

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      mute: 1,
      loop: 1,
      controls: 0, // 컨트롤 바 숨기기
      modestbranding: 1, // 유튜브 로고 최소화
      rel: 0, // 관련 영상 숨기기
      fs: 0, // 전체화면 버튼 숨기기
      disablekb: 1, // 키보드 제어 비활성화
      autoplay: 1, // 자동재생
      enablejsapi: 1, // JS API 활성화
    },
  };
  return (
    <Wrapper>
      {!allLoading ? (
        <Container>
          <Artist>
            <SlideTitle>POPULAR STAR</SlideTitle>
            <Swiper
              className="videoWrapper"
              breakpoints={{
                1920: {
                  slidesPerView: 6,
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
            >
              {artist?.map((artist) => (
                <SwiperSlide
                  className="artistBox"
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
          </Artist>
          <Category>
            <SlideTitle>POPULAR VIDEO</SlideTitle>
            <Swiper
              className="videoWrapper"
              breakpoints={{
                1920: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                0: {
                  slidesPerView: 2, // ✅ 모바일용 설정 추가 (예: 1개 보여줌)
                  spaceBetween: 20,
                },
              }}
            >
              {topRatedData.map((video) => {
                const working = () =>
                  data02?.artists?.find((artist) =>
                    video.title.includes(artist.artistName)
                  );
                if (!working) return [];
                return (
                  <SwiperSlide
                    key={video.position}
                    onClick={() =>
                      navigate(`/ott/detail/${encodeURIComponent(video.title)}`)
                    }
                  >
                    <VideoCon onMouseEnter={VideoPlay} onMouseLeave={VideoStop}>
                      <img src={video.thumbnails.high.url} alt="" />
                      <YouTube
                        videoId={video.resourceId.videoId}
                        opts={opts}
                        onReady={handleReady}
                      />
                    </VideoCon>
                    <VideoText>
                      <div>
                        <p>{video.title}</p>
                      </div>
                    </VideoText>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Category>
          <FilterWrap>
            <SlideTitle>BROWSE ALL</SlideTitle>
            <Filter>
              <div onClick={() => navigate(`/ott/bagzip`)}>
                <div>
                  <img
                    src="https://imagedelivery.net/djfufN1Ft6CV8Emdrip5jA/cf88bc1e-e18e-436f-06ee-89ba28dabd00/w=1024,h=1024,fit=crop"
                    alt=""
                  />
                  <p>Bag</p>
                </div>
              </div>
              <div onClick={() => navigate(`/ott/stylezip`)}>
                <div>
                  <img
                    src="https://imagedelivery.net/djfufN1Ft6CV8Emdrip5jA/8665c12f-5a09-4a35-084c-5df2169e5900/w=1024,h=1280"
                    alt=""
                  />
                  <p>WORK</p>
                </div>
              </div>
              <div onClick={() => navigate(`/ott/talkzip`)}>
                <div>
                  <img
                    src="https://imagedelivery.net/djfufN1Ft6CV8Emdrip5jA/57bf338a-e313-4b3f-8b8c-319643327900/w=1024,h=1280"
                    alt=""
                  />
                  <p>Talk</p>
                </div>
              </div>
              <div onClick={() => navigate(`/ott/short`)}>
                <div>
                  <img
                    src="https://imagedelivery.net/djfufN1Ft6CV8Emdrip5jA/7590d225-7bb5-48e8-d0ec-40d7fd569d00/w=1024,h=1280"
                    alt=""
                  />
                  <p>Shorts</p>
                </div>
              </div>
              <div onClick={() => navigate(`/star`)}>
                <div>
                  <img
                    src="https://imagedelivery.net/djfufN1Ft6CV8Emdrip5jA/f08e38ff-57f2-4b57-c671-5c778c8f1200/w=1024,h=1345"
                    alt=""
                  />
                </div>
                <p>Star</p>
              </div>
              <div onClick={() => navigate(`/ott/original`)}>
                <div>
                  <img
                    src="https://imagedelivery.net/djfufN1Ft6CV8Emdrip5jA/a44fb309-73a5-4d88-a58a-2b3bd7f3a900/w=1024,h=1024,fit=crop"
                    alt=""
                  />
                  <p>Orginal</p>
                </div>
              </div>
            </Filter>
          </FilterWrap>
        </Container>
      ) : (
        <div>넵</div>
      )}
    </Wrapper>
  );
};

export default OttSearchResult;
