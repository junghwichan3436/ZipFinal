import { useState, useRef, useEffect, useMemo } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import {
  StarData,
  bagData,
  interviewData,
  workingData,
  allData,
  useAllDataViews,
  playlistIds,
  bagDataWithViews,
} from "../../StarData";
import OttBanner from "./OttBanner";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  background: var(--ott-bg-color);
  color: var(--light-color);
  font-family: "Pretendard";
  .videoWrapper {
    display: flex;
    width: 100%;
  }
  .videoItem {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const UserLike = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  padding: 3% 3%;
  .swiper-slide {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .swiper-button-prev,
  .swiper-button-next {
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none; /* 안 보일 때 클릭 안 되게 */
    background: var(--light-color);
    border-radius: 50%;
    color: var(--dark-color);
    width: 40px;
    height: 40px;
    &::after {
      font-size: 3rem;
    }
  }
  &:hover {
    .swiper-button-prev,
    .swiper-button-next {
      opacity: 1;
      pointer-events: auto;
    }
  }
  .swiper-button-prev::after {
    content: "<";
  }
  .swiper-button-next::after {
    content: ">";
  }
  @media screen and (max-width: 767px) {
    padding: 10% 3%;
    .swiper-button-prev,
    .swiper-button-next {
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none; /* 안 보일 때 클릭 안 되게 */
      background: var(--light-color);
      border-radius: 50%;
      color: var(--dark-color);
      width: 32px;
      height: 32px;
      &::after {
        font-size: 2rem;
      }
    }
  }
`;

const SlideTitle = styled.h3`
  font-size: 2.8rem;
  font-weight: bold;
  font-family: "EHNormalTrial";
  z-index: 1;

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
  gap: 10px;
  div {
    &:nth-child(1) {
      flex: 1;
      cursor: pointer;
    }
    &:nth-child(2) {
      flex: 9;
      display: flex;
      flex-direction: column;
      gap: 10px;
      p {
        &:first-child {
          font-size: 1.4rem;
          line-height: 1.2;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &:nth-child(2) {
          font-size: 1.2rem;
          color: var(--subTitle);
          text-transform: uppercase;
        }
      }
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

const NewArrived = styled(UserLike)``;

const ZipOriginal = styled(UserLike)`
  background: var(--light-color);
  color: var(--dark-color);
  z-index: 1;
`;
const BagInside = styled(UserLike)``;

const Interview = styled(UserLike)``;

const ZipShorts = styled(UserLike)`
  .swiper-slide {
    div {
      img,
      iframe {
        aspect-ratio: 4 / 6;
      }
    }
  }
`;

const Ott = () => {
  const { isLoading, data } = StarData();
  const { isLoading: loading05, data: data05 } = useAllDataViews(playlistIds);
  const { isLoading: loading02, data: data02 } = bagData();
  const { isLoading: loading03, data: data03 } = interviewData();
  const { isLoading: loading04, data: data04 } = workingData();
  const allLoading =
    isLoading || loading02 || loading03 || loading04 || loading05;

  const inmybagData = useMemo(() => {
    if (allLoading || !data02) return [];
    return data02.slice(0, 8);
  }, [allLoading, data02]);

  const interviewDataSlice = useMemo(() => {
    if (allLoading || !data03) return [];
    return data03.slice(0, 8);
  }, [allLoading, data03]);

  const workingDataSlice = useMemo(() => {
    if (allLoading || !data04) return [];
    return data04.slice(0, 8);
  }, [allLoading, data04]);

  const allDataSlice = useMemo(() => {
    if (allLoading || !data05) return [];
    return data05
      .slice()
      .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
      .slice(0, 8);
  }, [allLoading, data05]);

  const allDataViewSlice = useMemo(() => {
    if (allLoading || !data05) return [];
    return data05
      .slice()
      .sort((a, b) => b.viewCount - a.viewCount)
      .slice(0, 8);
  }, [allLoading, data05]);

  console.log(allDataViewSlice);
  const VideoRef = useRef(null);
  const navigate = useNavigate();

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
    <div>
      {!allLoading ? (
        <Container>
          <OttBanner />
          <UserLike>
            <SlideTitle>TOP RATED</SlideTitle>
            <Swiper
              className="videoWrapper"
              modules={[Navigation]}
              navigation={true}
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
              {allDataViewSlice?.map((video) => {
                const working = data?.artists.find((artist) =>
                  video.title.includes(artist.artistName)
                );
                return working ? (
                  <SwiperSlide key={video.position}>
                    <VideoCon
                      onMouseEnter={VideoPlay}
                      onMouseLeave={VideoStop}
                      onClick={() =>
                        navigate(
                          `/ott/detail/${encodeURIComponent(video.title)}`
                        )
                      }
                    >
                      <img src={video.thumbnails.high.url} alt="" />
                      <YouTube
                        videoId={video.resourceId.videoId}
                        opts={opts}
                        onReady={handleReady}
                      />
                    </VideoCon>
                    <VideoText>
                      <div
                        onClick={() => navigate(`/star/${working.artistName}`)}
                      >
                        <img src={working?.artistImg} alt="" />
                      </div>
                      <div>
                        <p>{video.title}</p>
                        <p>{video.videoOwnerChannelTitle}</p>
                      </div>
                    </VideoText>
                  </SwiperSlide>
                ) : null;
              })}
            </Swiper>
          </UserLike>
          <NewArrived>
            <SlideTitle>NEW</SlideTitle>
            <Swiper
              className="videoWrapper"
              modules={[Navigation]}
              navigation={true}
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
              {allDataSlice?.map((video) => {
                const inmybag = data?.artists.find((artist) =>
                  video?.title.includes(artist.artistName)
                );
                return inmybag ? (
                  <SwiperSlide key={video.position}>
                    <VideoCon
                      onMouseEnter={VideoPlay}
                      onMouseLeave={VideoStop}
                      onClick={() =>
                        navigate(
                          `/ott/detail/${encodeURIComponent(
                            video.snippet.title
                          )}`
                        )
                      }
                    >
                      <img src={video.thumbnails.high.url} alt="" />
                      <YouTube
                        videoId={video.resourceId.videoId}
                        opts={opts}
                        onReady={handleReady}
                      />
                    </VideoCon>
                    <VideoText>
                      <div
                        onClick={() => navigate(`/star/${inmybag.artistName}`)}
                      >
                        <img src={inmybag?.artistImg} alt="" />
                      </div>
                      <div>
                        <p>{video.title}</p>
                        <p>{video.videoOwnerChannelTitle}</p>
                      </div>
                    </VideoText>
                  </SwiperSlide>
                ) : null;
              })}
            </Swiper>
          </NewArrived>
          <ZipOriginal>
            <SlideTitle>본업에 진심인 사람들.ZIP</SlideTitle>
            <Swiper
              className="videoWrapper"
              modules={[Navigation]}
              navigation={true}
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
              {workingDataSlice?.map((video) => {
                const working = data?.artists.find((artist) =>
                  video?.snippet?.title.includes(artist.artistName)
                );
                return working ? (
                  <SwiperSlide key={video.snippet.position}>
                    <VideoCon
                      onMouseEnter={VideoPlay}
                      onMouseLeave={VideoStop}
                      onClick={() =>
                        navigate(
                          `/ott/detail/${encodeURIComponent(
                            video.snippet.title
                          )}`
                        )
                      }
                    >
                      <img src={video.snippet.thumbnails.high.url} alt="" />
                      <YouTube
                        videoId={video.snippet.resourceId.videoId}
                        opts={opts}
                        onReady={handleReady}
                      />
                    </VideoCon>
                    <VideoText>
                      <div
                        onClick={() => navigate(`/star/${working.artistName}`)}
                      >
                        <img src={working?.artistImg} alt="" />
                      </div>
                      <div>
                        <p>{video.snippet.title}</p>
                        <p>{video.snippet.videoOwnerChannelTitle}</p>
                      </div>
                    </VideoText>
                  </SwiperSlide>
                ) : null;
              })}
            </Swiper>
          </ZipOriginal>
          <BagInside>
            <SlideTitle>BAG INSIDE</SlideTitle>
            <Swiper
              className="videoWrapper"
              modules={[Navigation]}
              navigation={true}
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
              {inmybagData?.map((video) => {
                const inmybag = data?.artists.find((artist) =>
                  video?.snippet?.title.includes(artist.artistName)
                );
                return inmybag ? (
                  <SwiperSlide key={video.snippet.position}>
                    <VideoCon
                      onMouseEnter={VideoPlay}
                      onMouseLeave={VideoStop}
                      onClick={() =>
                        navigate(
                          `/ott/detail/${encodeURIComponent(
                            video.snippet.title
                          )}`
                        )
                      }
                    >
                      <img src={video.snippet.thumbnails.high.url} alt="" />
                      <YouTube
                        videoId={video.snippet.resourceId.videoId}
                        opts={opts}
                        onReady={handleReady}
                      />
                    </VideoCon>
                    <VideoText>
                      <div
                        onClick={() => navigate(`/star/${inmybag.artistName}`)}
                      >
                        <img src={inmybag?.artistImg} alt="" />
                      </div>
                      <div>
                        <p>{video.snippet.title}</p>
                        <p>{video.snippet.videoOwnerChannelTitle}</p>
                      </div>
                    </VideoText>
                  </SwiperSlide>
                ) : null;
              })}
            </Swiper>
          </BagInside>
          <Interview>
            <SlideTitle>INTERVIEW</SlideTitle>
            <Swiper
              className="videoWrapper"
              modules={[Navigation]}
              navigation={true}
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
                  slidesPerView: 2, // 모바일용 설정 추가 (예: 1개 보여줌)
                  spaceBetween: 20,
                },
              }}
            >
              {interviewDataSlice?.map((video) => {
                const interview = data.artists.find((artist) =>
                  video.snippet.title.includes(artist.artistName)
                );
                if (!interview) return null;
                return (
                  <SwiperSlide key={video.snippet.title}>
                    <VideoCon
                      onMouseEnter={VideoPlay}
                      onMouseLeave={VideoStop}
                      onClick={() =>
                        navigate(
                          `/ott/detail/${encodeURIComponent(
                            video.snippet.title
                          )}`
                        )
                      }
                    >
                      <img src={video.snippet.thumbnails.high.url} alt="" />
                      <YouTube
                        videoId={video.snippet.resourceId.videoId}
                        opts={opts}
                        onReady={handleReady}
                      />
                    </VideoCon>
                    <VideoText>
                      <div
                        onClick={() =>
                          navigate(`/star/${interview.artistName}`)
                        }
                      >
                        <img src={interview?.artistImg} alt="" />
                      </div>
                      <div>
                        <p>{video.snippet.title}</p>
                        <p>{video.snippet.videoOwnerChannelTitle}</p>
                      </div>
                    </VideoText>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Interview>
          {/* <ZipShorts>
          <SlideTitle>ZIP. SHORTS</SlideTitle>
          <Swiper
            className="videoWrapper"
            modules={[Navigation]}
            navigation={true}
            breakpoints={{
              1920: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
              0: {
                slidesPerView: 2, // ✅ 모바일용 설정 추가 (예: 1개 보여줌)
                spaceBetween: 20,
              },
            }}
          >
            {data05?.items?.map((video) => {
              const shorts = data?.artists.find((artist) =>
                video?.snippet?.title.includes(artist.artistName)
              );
              return shorts ? (
                <SwiperSlide key={video.snippet.position}>
                  <VideoCon
                    onMouseEnter={VideoPlay}
                    onMouseLeave={VideoStop}
                    onClick={() =>
                      navigate(
                        `/ott/detail/${encodeURIComponent(video.snippet.title)}`
                      )
                    }
                  >
                    <img src={video.snippet.thumbnails.high.url} alt="" />
                    <YouTube
                      videoId={video.snippet.resourceId.videoId}
                      opts={opts}
                      onReady={handleReady}
                    />
                  </VideoCon>
                  <VideoText>
                    <div onClick={() => navigate(`/star/${shorts.artistName}`)}>
                      <img src={shorts?.artistImg} alt="" />
                    </div>
                    <div>
                      <p>{video.snippet.title}</p>
                      <p>{video.snippet.videoOwnerChannelTitle}</p>
                    </div>
                  </VideoText>
                </SwiperSlide>
              ) : (
                <div></div>
              );
            })}
          </Swiper>
        </ZipShorts> */}
        </Container>
      ) : (
        <div>넵</div>
      )}
    </div>
  );
};

export default Ott;
