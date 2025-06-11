import styled from "styled-components";
import YouTube from "react-youtube";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useRef, useEffect } from "react";
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
  .swiper-slide {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
`;
const MainSlide = styled.div`
  top: 0;
  width: 100%;
  position: relative;
  cursor: pointer;
  z-index: 1;
  padding-top: 56.25%;
  iframe {
    width: 100%;
    object-fit: cover;
    position: absolute;
    pointer-events: none;
    left: 0;
    top: 0;
    scroll-behavior: none;
    z-index: -1;
  }
`;

const UserLike = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  padding: 5% 3%;
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
  const [mouseEnter, SetMouseEnter] = useState(false);
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
      <MainSlide>
        <YouTube videoId="V9PVRfjEBTI" opts={opts} />
      </MainSlide>
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
          <SwiperSlide>
            <VideoCon onMouseEnter={VideoPlay} onMouseLeave={VideoStop}>
              <img src="https://i.pinimg.com/736x/f3/f7/5a/f3f75a650e00c2f5f7bdc424563bb617.jpg" alt="" />
              <YouTube videoId="5BRaRTjCPT0" opts={opts} onReady={handleReady} />
            </VideoCon>
            <VideoText>
              <div>
                <img src="https://i.scdn.co/image/ab67616100005174d57cec71915fe90346a37df6" alt="" />
              </div>
              <div>
                <p>에스파 닝닝의 애장템은?</p>
                <p>W 코리아</p>
              </div>
            </VideoText>
          </SwiperSlide>
          <SwiperSlide>
            <VideoCon onMouseEnter={VideoPlay} onMouseLeave={VideoStop}>
              <img src="https://i.pinimg.com/736x/f3/f7/5a/f3f75a650e00c2f5f7bdc424563bb617.jpg" alt="" />
              <YouTube videoId="5BRaRTjCPT0" opts={opts} onReady={handleReady} />
            </VideoCon>
            <VideoText>
              <div>
                <img src="https://i.scdn.co/image/ab67616100005174d57cec71915fe90346a37df6" alt="" />
              </div>
              <div>
                <p>에스파 닝닝의 애장템은?</p>
                <p>W 코리아</p>
              </div>
            </VideoText>
          </SwiperSlide>
          <SwiperSlide>
            <VideoCon onMouseEnter={VideoPlay} onMouseLeave={VideoStop}>
              <img src="https://i.pinimg.com/736x/f3/f7/5a/f3f75a650e00c2f5f7bdc424563bb617.jpg" alt="" />
              <YouTube videoId="5BRaRTjCPT0" opts={opts} onReady={handleReady} />
            </VideoCon>
            <VideoText>
              <div>
                <img src="https://i.scdn.co/image/ab67616100005174d57cec71915fe90346a37df6" alt="" />
              </div>
              <div>
                <p>에스파 닝닝의 애장템은?</p>
                <p>W 코리아</p>
              </div>
            </VideoText>
          </SwiperSlide>
          <SwiperSlide>
            <VideoCon onMouseEnter={VideoPlay} onMouseLeave={VideoStop}>
              <img src="https://i.pinimg.com/736x/f3/f7/5a/f3f75a650e00c2f5f7bdc424563bb617.jpg" alt="" />
              <YouTube videoId="5BRaRTjCPT0" opts={opts} onReady={handleReady} />
            </VideoCon>
            <VideoText>
              <div>
                <img src="https://i.scdn.co/image/ab67616100005174d57cec71915fe90346a37df6" alt="" />
              </div>
              <div>
                <p>에스파 닝닝의 애장템은?</p>
                <p>W 코리아</p>
              </div>
            </VideoText>
          </SwiperSlide>
          <SwiperSlide>
            <VideoCon onMouseEnter={VideoPlay} onMouseLeave={VideoStop}>
              <img src="https://i.pinimg.com/736x/f3/f7/5a/f3f75a650e00c2f5f7bdc424563bb617.jpg" alt="" />
              <YouTube videoId="5BRaRTjCPT0" opts={opts} onReady={handleReady} />
            </VideoCon>
            <VideoText>
              <div>
                <img src="https://i.scdn.co/image/ab67616100005174d57cec71915fe90346a37df6" alt="" />
              </div>
              <div>
                <p>에스파 닝닝의 애장템은?</p>
                <p>W 코리아</p>
              </div>
            </VideoText>
          </SwiperSlide>
        </Swiper>
      </UserLike>
      <ZipOriginal>
        <SlideTitle>오직 ZIP.에서만 만나는 이야기</SlideTitle>
      </ZipOriginal>
      <BagInside>
        <SlideTitle>BAG INSIDE</SlideTitle>
      </BagInside>
      <Interview>
        <SlideTitle>INTERVIEW</SlideTitle>
      </Interview>
      <ZipShorts>
        <SlideTitle>ZIP. SHORTS</SlideTitle>
      </ZipShorts>
    </Container>
  );
};

export default Ott;
