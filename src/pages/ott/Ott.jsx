import { useState, useRef, useEffect } from "react";
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
} from "../../StarData";

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

const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: -280px;
  @media screen and (max-width: 767px) {
    margin-bottom: -150px;
  }
`;

const MainSlide = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  @media screen and (max-width: 767px) {
  }
`;

const SlideImg = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to top, rgba(0, 0, 0, 1), transparent),
      linear-gradient(to right, rgba(0, 0, 0, 0.7), transparent);
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 768px) {
    img {
      width: auto;
      transform: translateX(-200px);
    }
    &::after {
      /* background: linear-gradient(to top, rgba(0, 0, 0, 1), transparent); */
    }
  }
`;

const SlideInfo = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 30%;
  left: 3%;
  width: 550px;
  gap: 20px;
  @media screen and (max-width: 1024px) {
    width: 400px;
  }
  @media screen and (max-width: 768px) {
    width: 400px;
    top: auto;
    bottom: 30%;
  }
`;

const SlideText = styled.div`
  color: var(--light-color);
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s;
  p {
    font-weight: bold;
    font-size: 3rem;
    white-space: nowrap;
  }
  &.active {
    opacity: 1;
    transform: translateY(0);
  }
  @media screen and (max-width: 1024px) {
    p {
      font-size: 2.4rem;
    }
  }
`;

const SlideDesc = styled(SlideText)`
  transition-delay: 0.4s;
  line-height: 20px;
  font-size: 1.4rem;
`;

const SlideBtn = styled(SlideText)`
  transition-delay: 0.8s;
  display: flex;
  gap: 10px;
  button {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-family: "EHNormalTrial";
  }
  @media screen and (max-width: 1024px) {
    button {
      padding: 8px 16px;
    }
  }
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
          line-height: 1.8rem;
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
  const { isLoading: loading02, data: data02 } = bagData();
  const { isLoading: loading03, data: data03 } = interviewData();
  const { isLoading: loading04, data: data04 } = workingData();
  const { isLoading: loading06, data: data06 } = allData();
  const { isLoading: loading05, data: data05 } = useAllDataViews(playlistIds);
  const [activeIndex, setActiveIndex] = useState(0);
  const VideoRef = useRef(null);
  const navigate = useNavigate();
  const inmybagData = data02?.slice(0, 8);
  const interviewDataSlice = data03?.slice(0, 8);
  const workingDataSlice = data04?.slice(0, 8);
  const allDataSlice = data06
    ?.sort(
      (a, b) =>
        new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
    )
    .slice(0, 8);
  const allDataViewSlice = data05
    ?.sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 8);
  console.log(allDataViewSlice);
  const BannerSlice = data05
    ?.sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, 4);
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

  const orgData = data?.artists.map((artist) => artist);
  const bagInsideVid = orgData?.slice(0, 8);
  const bagInsideVid02 = orgData?.slice(8, 16);
  const bagInsideVid03 = orgData?.slice(16, 24);
  const bagInsideVid04 = orgData?.slice(24, 32);
  const bagInsideVid05 = orgData?.slice(32, 40);
  const bagInsideVid06 = orgData?.slice(40, 48);
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
    <Container>
      <BannerWrapper>
        <Swiper
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          modules={[Autoplay, EffectFade]}
          effect="fade" // ✅ 페이드 효과 적용
          fadeEffect={{ crossFade: true }} // ✅ 부드럽게 교차 페이드
          autoplay={{
            delay: 5000, // 슬라이드 전환 간격 (ms)
            disableOnInteraction: false, // 사용자 터치 이후에도 자동 재생 유지
          }}
          loop={true}
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
          {/* {BannerSlice.map((item) => (
            <SwiperSlide>
              <MainSlide>
                <SlideImg>
                  <img src={item.thumbnails.maxres.url} alt="" />
                </SlideImg>
                <SlideInfo>
                  <SlideText className={activeIndex === 0 ? "active" : ""}>
                    <p>{item.title}</p>
                  </SlideText>
                  <SlideDesc className={activeIndex === 0 ? "active" : ""}>
                    {item.description}
                  </SlideDesc>
                  <SlideBtn className={activeIndex === 0 ? "active" : ""}>
                    <button onClick={() => navigate("/ott/detail")}>
                      Play
                    </button>
                    <button>+ My List</button>
                  </SlideBtn>
                </SlideInfo>
              </MainSlide>
            </SwiperSlide>
          ))} */}
          <SwiperSlide>
            <MainSlide>
              <SlideImg>
                <img
                  src="https://i.ytimg.com/vi/XOwGv4MFFto/maxresdefault.jpg"
                  alt=""
                />
              </SlideImg>
              <SlideInfo>
                <SlideText className={activeIndex === 0 ? "active" : ""}>
                  <p>INFP의 여왕 김지원 👑</p>
                </SlideText>
                <SlideDesc className={activeIndex === 0 ? "active" : ""}>
                  인프피의 여왕에게 주7회 약속이란? ❤️‍🩹 배우 #김지원 이 불가리
                  퍼퓸과 함께 엘르 카메라 앞에 섰습니다. 침대와 음악만 있으면
                  어디든 갈 수 있는 만렙 집순이의 루틴부터 환상의 궁합을
                  자랑하는 MBTI, 지하철에서 나도 모르게 뒤돌아보게 되는 향까지!
                  이모지로 파헤친 여왕님의 모든 것을 지금 바로 확인해 보세요.
                </SlideDesc>
                <SlideBtn className={activeIndex === 0 ? "active" : ""}>
                  <button onClick={() => navigate("/ott/detail")}>Play</button>
                  <button>+ My List</button>
                </SlideBtn>
              </SlideInfo>
            </MainSlide>
          </SwiperSlide>
          <SwiperSlide>
            <MainSlide>
              <SlideImg>
                <img
                  src="https://i.ytimg.com/vi/yHYMYCwR1p8/maxresdefault.jpg"
                  alt=""
                />
              </SlideImg>
              <SlideInfo>
                <SlideText className={activeIndex === 1 ? "active" : ""}>
                  <p>친해지면 이상해지는 설윤의 이모지 인터뷰💓</p>
                </SlideText>
                <SlideDesc className={activeIndex === 1 ? "active" : ""}>
                  최애를 처음 만났을 때 설레는 그 감정… 설윤도 느껴봤대요 💗
                  낯을 가리지만 친해지면 이상(?)해지는 반전 매력과 멀미 따위
                  모르는 FPS 게임 숨은 고수 설장군 모멘트, 데뷔 무대 직전
                  자신에게 해주고 싶은 말도 솔직하게 털어놓은 #엔믹스 설윤의 찐
                  매력을 엘르가 담았습니다.
                </SlideDesc>
                <SlideBtn className={activeIndex === 1 ? "active" : ""}>
                  <button onClick={() => navigate("/ott/detail")}>Play</button>
                  <button>+ My List</button>
                </SlideBtn>
              </SlideInfo>
            </MainSlide>
          </SwiperSlide>
        </Swiper>
      </BannerWrapper>
      <UserLike>
        <SlideTitle>YOU ALSO LIKE</SlideTitle>
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
                    navigate(`/ott/detail/${encodeURIComponent(video.title)}`)
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
                  <div onClick={() => navigate(`/star/${working.artistName}`)}>
                    <img src={working?.artistImg} alt="" />
                  </div>
                  <div>
                    <p>{video.title}</p>
                    <p>{video.videoOwnerChannelTitle}</p>
                  </div>
                </VideoText>
              </SwiperSlide>
            ) : (
              <div></div>
            );
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
              video?.snippet?.title.includes(artist.artistName)
            );
            return inmybag ? (
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
                  <div onClick={() => navigate(`/star/${inmybag.artistName}`)}>
                    <img src={inmybag?.artistImg} alt="" />
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
      </NewArrived>
      <ZipOriginal>
        <SlideTitle>오직 ZIP.에서만 만나는 이야기</SlideTitle>
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
                  <div onClick={() => navigate(`/star/${working.artistName}`)}>
                    <img src={working?.artistImg} alt="" />
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
                  <div onClick={() => navigate(`/star/${inmybag.artistName}`)}>
                    <img src={inmybag?.artistImg} alt="" />
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
            const interview = data?.artists.find((artist) =>
              video?.snippet?.title.includes(artist.artistName)
            );
            return interview ? (
              <SwiperSlide>
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
                  <div
                    onClick={() => navigate(`/star/${interview.artistName}`)}
                  >
                    <img src={interview?.artistImg} alt="" />
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
  );
};

export default Ott;
