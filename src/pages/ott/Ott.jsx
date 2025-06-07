import { useRef, useEffect } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { StarData } from "../../StarData";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  height: 3000px;
  background: var(--ott-bg-color);
  color: var(--light-color);
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

const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const MainSlide = styled.div`
  width: 100%;
  height: 100vh;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    background-attachment: fixed;
  }
`;

const SlideText = styled.div`
  position: absolute;
  top: 50%;
  left: 3%;
`;
const UserLike = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  padding: 5% 3%;
  .swiper-slide {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;

const SlideTitle = styled.h3`
  font-size: 3.6rem;
  font-weight: bold;
  font-family: "EHNormalTrial";
`;

const VideoCon = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
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
      justify-content: space-between;
      p {
        &:nth-child(2) {
          font-size: 1.4rem;
          color: var(--subTitle);
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
`;

const ZipOriginal = styled(UserLike)`
  background: var(--light-color);
  color: var(--dark-color);
`;
const BagInside = styled(UserLike)``;
const Interview = styled(UserLike)``;
const ZipShorts = styled(UserLike)``;

const Ott = () => {
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
  const { isLoading, data } = StarData();
  const orgData = data?.artists.map((artist) => artist);
  const bagInsideVid = orgData?.slice(0, 8);
  const bagInsideVid02 = orgData?.slice(8, 16);
  const bagInsideVid03 = orgData?.slice(16, 24);
  const bagInsideVid04 = orgData?.slice(24, 32);
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
      showinfo: 0, // 제목 숨기기 시도 (현재는 거의 안 먹힘)
      autoplay: 1, // 자동재생
      enablejsapi: 1, // JS API 활성화
    },
  };
  return (
    <Container>
      <BannerWrapper>
        <Swiper
          breakpoints={{
            1920: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            0: {
              slidesPerView: 1, // ✅ 모바일용 설정 추가 (예: 1개 보여줌)
              spaceBetween: 0,
            },
          }}
        >
          <SwiperSlide>
            <MainSlide>
              <div>
                <img
                  src="https://i.scdn.co/image/ab67616100005174d57cec71915fe90346a37df6"
                  alt=""
                />
              </div>
              <SlideText>
                <p>에스파 닝닝의 애장템은?</p>
                <p>W 코리아</p>
              </SlideText>
            </MainSlide>
          </SwiperSlide>
          <SwiperSlide>
            <MainSlide>
              <div>
                <img
                  src="https://i.scdn.co/image/ab67616100005174d57cec71915fe90346a37df6"
                  alt=""
                />
              </div>
              <SlideText>
                <p>에스파 닝닝의 애장템은?</p>
                <p>W 코리아</p>
              </SlideText>
            </MainSlide>
          </SwiperSlide>
        </Swiper>
      </BannerWrapper>
      <UserLike>
        <SlideTitle>You Also Like</SlideTitle>
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
          {bagInsideVid02?.map((video) => (
            <SwiperSlide key={video.artistName}>
              <VideoCon onMouseEnter={VideoPlay} onMouseLeave={VideoStop}>
                <img
                  src={`https://i.ytimg.com/vi/${video.videoURL}/hqdefault.jpg`}
                  alt=""
                />
                <YouTube
                  videoId={video.videoURL}
                  opts={opts}
                  onReady={handleReady}
                />
              </VideoCon>
              <VideoText>
                <div onClick={() => navigate(`/star/${video.artistName}`)}>
                  <img src={video.artistImg} alt="" />
                </div>
                <div>
                  <p>{video.artistName}의 애장템은?</p>
                  <p>W 코리아</p>
                </div>
              </VideoText>
            </SwiperSlide>
          ))}
        </Swiper>
      </UserLike>
      <ZipOriginal>
        <SlideTitle>오직 ZIP.에서만 만나는 이야기</SlideTitle>
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
          {bagInsideVid03?.map((video) => (
            <SwiperSlide key={video.artistName}>
              <VideoCon onMouseEnter={VideoPlay} onMouseLeave={VideoStop}>
                <img
                  src={`https://i.ytimg.com/vi/${video.videoURL}/hqdefault.jpg`}
                  alt=""
                />
                <YouTube
                  videoId={video.videoURL}
                  opts={opts}
                  onReady={handleReady}
                />
              </VideoCon>
              <VideoText>
                <div onClick={() => navigate(`/star/${video.artistName}`)}>
                  <img src={video.artistImg} alt="" />
                </div>
                <div>
                  <p>{video.artistName}의 애장템은?</p>
                  <p>W 코리아</p>
                </div>
              </VideoText>
            </SwiperSlide>
          ))}
        </Swiper>
      </ZipOriginal>
      <BagInside>
        <SlideTitle>BAG INSIDE</SlideTitle>
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
          {bagInsideVid?.map((video) => (
            <SwiperSlide key={video.artistName}>
              <VideoCon onMouseEnter={VideoPlay} onMouseLeave={VideoStop}>
                <img
                  src={`https://i.ytimg.com/vi/${video.videoURL}/hqdefault.jpg`}
                  alt=""
                />
                <YouTube
                  videoId={video.videoURL}
                  opts={opts}
                  onReady={handleReady}
                />
              </VideoCon>
              <VideoText>
                <div onClick={() => navigate(`/star/${video.artistName}`)}>
                  <img src={video.artistImg} alt="" />
                </div>
                <div>
                  <p>{video.artistName}의 애장템은?</p>
                  <p>W 코리아</p>
                </div>
              </VideoText>
            </SwiperSlide>
          ))}
        </Swiper>
      </BagInside>
      <Interview>
        <SlideTitle>INTERVIEW</SlideTitle>
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
          {bagInsideVid04?.map((video) => (
            <SwiperSlide key={video.artistName}>
              <VideoCon onMouseEnter={VideoPlay} onMouseLeave={VideoStop}>
                <img
                  src={`https://i.ytimg.com/vi/${video.videoURL}/hqdefault.jpg`}
                  alt=""
                />
                <YouTube
                  videoId={video.videoURL}
                  opts={opts}
                  onReady={handleReady}
                />
              </VideoCon>
              <VideoText>
                <div onClick={() => navigate(`/star/${video.artistName}`)}>
                  <img src={video.artistImg} alt="" />
                </div>
                <div>
                  <p>{video.artistName}의 애장템은?</p>
                  <p>W 코리아</p>
                </div>
              </VideoText>
            </SwiperSlide>
          ))}
        </Swiper>
      </Interview>
      <ZipShorts>
        <SlideTitle>ZIP. SHORTS</SlideTitle>
      </ZipShorts>
    </Container>
  );
};

export default Ott;
