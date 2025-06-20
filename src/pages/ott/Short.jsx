import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import styled, { css } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import VideoCard from "../../components/shorts/VideoCard";
import KakaoShare from "../../components/shorts/KakaoShare";
import Comment from "../../components/shorts/comment";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// 📱 스타일 컴포넌트들 (기존과 동일)
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  color: #fff;
  background: var(--ott-bg-color, #000);
  font-family: "Pretendard", sans-serif;
  position: relative;
`;

const Wrapper = styled.div`
  padding: 0 3%;
`;

const TitleSection = styled.section`
  text-transform: uppercase;
`;

const MainTitle = styled.div`
  display: flex;
  gap: 30px;
  align-items: end;
  padding-top: 177px;
  padding-bottom: 20px;
  border-bottom: 1px solid #3c3c3c;
  h4 {
    font-size: 7rem;
    font-family: "EHNormalTrial";
    font-weight: 500;
    letter-spacing: -3px;
  }
  p {
    font-size: 1.6rem;
    font-weight: 300;
    color: #ababab;
    font-weight: 400;
    line-height: 2rem;
    b {
      font-size: 1.7rem;
      font-weight: 400;
      font-family: "EHNormalTrial";
    }
  }

  @media screen and (max-width: 1024px) {
    padding-bottom: 20px;
    gap: 20px;
    flex-direction: column-reverse;
    flex-direction: column;
    align-items: start;
    h4 {
      font-size: 6rem;
      letter-spacing: -2px;
    }
    br {
      display: none;
    }
    p {
      font-size: 1.8rem;
      b {
        font-size: 1.7rem;
      }
    }
  }
  @media screen and (max-width: 767px) {
    gap: 20px;
    padding-top: 100px;
    padding-bottom: 20px;
    h4 {
      letter-spacing: -2px;
    }
    p {
    }
  }
  @media screen and (max-width: 767px) {
    gap: 18px;
    h4 {
      font-size: 5rem;
    }
    p {
      font-weight: 400;
      font-size: 1.6rem;
      b {
        font-size: 1.6rem;
        font-weight: 400;
      }
    }
  }
  @media screen and (max-width: 767px) {
    h4 {
      font-size: 4rem;
    }
    p {
      font-size: 1.4rem;
      b {
        font-size: 1.4rem;
      }
    }
  }
`;

const ContentSection = styled.section`
  padding: 40px 3% 60px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  @media screen and (min-width: 1025px) {
    display: ${(props) => (props.$commentOpen ? "flex" : "block")};
    gap: ${(props) => (props.$commentOpen ? "20px" : "0")};
    align-items: flex-start;
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    transform: ${(props) => (props.$commentOpen ? "scale(0.8)" : "scale(1)")};
    transform-origin: center left;
  }

  @media screen and (max-width: 768px) {
    ${(props) =>
      props.$commentOpen &&
      css`
        transform: scale(0.7);
        transform-origin: center top;
        margin-bottom: -80px;
      `}
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  @media screen and (min-width: 1025px) {
    flex: ${(props) => (props.$commentOpen ? "1" : "none")};
    min-width: 0;
  }

  .mySwiper {
    width: 100%;
    padding-top: 50px;
    padding-bottom: 100px; /* 페이지네이션을 위한 여백 증가 */
    overflow: visible;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease;
    opacity: 0.4;
    filter: brightness(0.6);
    /* Swiper가 자동으로 너비를 계산하도록 설정 */
    width: auto !important;
    flex-shrink: 0;
  }

  .swiper-slide-active {
    opacity: 1 !important;
    filter: brightness(1) !important;
    transform: scale(1.05);
  }

  /* 페이지네이션 스타일 개선 */
  .swiper-pagination {
    bottom: 20px !important;
    display: flex;
    justify-content: center;
    gap: 15px;
  }

  .swiper-pagination-bullet {
    width: 16px;
    height: 16px;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    opacity: 1;
    transition: all 0.3s ease;
    cursor: pointer;
    border: 2px solid transparent;
  }

  .swiper-pagination-bullet-active {
    background: #fff;
    transform: scale(1.3);
    border: 2px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 15px rgba(255, 255, 255, 0.4);
  }

  .swiper-pagination-bullet:hover {
    background: rgba(255, 255, 255, 0.7);
    transform: scale(1.15);
    border: 2px solid rgba(255, 255, 255, 0.3);
  }

  /* 데스크톱: 페이지네이션 캐러셀 (5개씩 그룹) */
  @media screen and (min-width: 1025px) {
    .mySwiper {
      max-width: 2500px; /* 5개 카드가 들어갈 수 있는 충분한 너비 */
      margin: 0 auto;
    }

    .swiper-wrapper {
      align-items: center;
    }

    .swiper-slide {
      width: 458px !important; /* 원래 카드 크기 고정 */
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      /* 데스크톱에서도 Coverflow 효과 유지 */
      opacity: 0.4;
      filter: brightness(0.6);
      transition: all 0.5s ease;
    }

    /* 데스크톱에서도 가운데 활성 슬라이드 강조 */
    .swiper-slide-active {
      opacity: 1 !important;
      filter: brightness(1) !important;
      transform: scale(1.05) !important;
    }

    /* 페이지네이션 위치 조정 */
    .swiper-pagination {
      position: relative;
      margin-top: 30px;
    }
  }

  /* 태블릿: 무한 슬라이드 방식 (3개씩) */
  @media screen and (min-width: 769px) and (max-width: 1024px) {
    .mySwiper {
      max-width: 1200px;
      margin: 0 auto;
    }

    .swiper-wrapper {
      align-items: center;
    }

    .swiper-slide {
      width: 380px !important;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
    }

    /* 태블릿에서는 페이지네이션 숨김 */
    .swiper-pagination {
      display: none;
    }
  }

  /* 모바일: 무한 슬라이드 방식 (1개씩) */
  @media screen and (max-width: 768px) {
    .mySwiper {
      max-width: 320px;
      margin: 0 auto;
    }

    .swiper-wrapper {
      align-items: center;
    }

    .swiper-slide {
      width: 280px !important;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
    }

    /* 모바일에서는 페이지네이션 숨김 */
    .swiper-pagination {
      display: none;
    }
  }
`;

// 🚀 메인 Short 컴포넌트
const Short = () => {
  // 📱 상태 관리
  const [activeIndex, setActiveIndex] = useState(0); // 초기값을 0으로 변경
  const [playingVideo, setPlayingVideo] = useState(null);
  const [loadingVideo, setLoadingVideo] = useState(null);
  const [loadedVideos, setLoadedVideos] = useState(new Set());
  const [shortVideos, setShortVideos] = useState({ originalData: [] });
  const [videoInteractions, setVideoInteractions] = useState({});
  const [useLiteEmbed] = useState(true);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // 🎭 댓글 모달 상태 (간소화됨)
  const [commentOpen, setCommentOpen] = useState(false);
  const [selectedCommentVideo, setSelectedCommentVideo] = useState(null);

  // 🎨 반응형 Coverflow 효과 상태
  const [coverflowConfig, setCoverflowConfig] = useState({
    rotate: 18,
    stretch: 0,
    depth: 180,
    modifier: 1,
    slideShadows: false,
  });

  const swiperRef = useRef(null);
  const playerRefs = useRef({});

  // 🎨 화면 크기에 따른 Coverflow 효과 조정
  useEffect(() => {
    const updateCoverflowEffect = () => {
      const width = window.innerWidth;
      if (width <= 1024 && width > 768) {
        setCoverflowConfig({
          rotate: 12,
          stretch: 0,
          depth: 120,
          modifier: 1,
          slideShadows: false,
        });
      } else if (width <= 768) {
        setCoverflowConfig({
          rotate: 8,
          stretch: 0,
          depth: 80,
          modifier: 1,
          slideShadows: false,
        });
      } else {
        setCoverflowConfig({
          rotate: 18,
          stretch: 0,
          depth: 180,
          modifier: 1,
          slideShadows: false,
        });
      }
    };

    updateCoverflowEffect();
    window.addEventListener("resize", updateCoverflowEffect);
    return () => window.removeEventListener("resize", updateCoverflowEffect);
  }, []);

  // 🔗 YouTube URL에서 video ID 추출하는 함수
  const extractVideoId = useCallback((url) => {
    if (!url) return "";
    if (url.length === 11 && !url.includes("/")) return url;

    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : url;
  }, []);

  // 📊 메모이제이션된 비디오 데이터 변환
  const shortsVideos = useMemo(() => {
    return shortVideos.originalData.map((video) => ({
      id: video.id,
      videoId: extractVideoId(video.shortUrl),
      title: video.mainTitle,
      keyword: video.keyword,
      itemInfo:
        video.item[0]?.itemImg ||
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      itemUrl: video.item[0]?.itemUrl || "#",
      likes: video.shorts[0]?.like
        ? `${(video.shorts[0].like / 1000).toFixed(1)}만`
        : "2.5만",
      views: `${Math.floor(Math.random() * 500 + 100)}만`,
      description: video.description,
    }));
  }, [shortVideos.originalData, extractVideoId]);

  // 🎯 현재 선택된 비디오 데이터
  const currentVideoData = useMemo(() => {
    if (selectedCommentVideo) {
      return shortVideos.originalData.find(
        (data) => data.id === selectedCommentVideo.id
      );
    }
    return null;
  }, [selectedCommentVideo, shortVideos.originalData]);

  // 🔧 카카오 SDK 초기화
  useEffect(() => {
    if (!window.Kakao) {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.js";
      script.async = true;
      script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init("788c9afcb57d04021e2f0c6df11eb2b1");
          console.log("카카오 SDK 로드 및 초기화 완료");
        }
      };
      document.head.appendChild(script);
    } else if (!window.Kakao.isInitialized()) {
      window.Kakao.init("788c9afcb57d04021e2f0c6df11eb2b1");
      console.log("카카오 SDK 초기화 완료");
    }
  }, []);

  // 📂 API 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/API/short.json");
        const data = await response.json();
        setShortVideos(data);

        const initialInteractions = {};
        data.originalData.forEach((video) => {
          initialInteractions[video.id] = {
            liked: false,
            commented: false,
            itemInfo: false,
            shared: false,
          };
        });
        setVideoInteractions(initialInteractions);
      } catch (error) {
        console.error("Failed to load short videos data:", error);
      }
    };

    loadData();
  }, []);

  // 🎞️ 슬라이드 변경 핸들러 (개선됨)
  const handleSlideChange = useCallback((swiper) => {
    const realIndex = swiper.realIndex; // loop 모드에서 실제 인덱스 사용
    setActiveIndex(realIndex);

    // 모든 비디오 정지
    Object.values(playerRefs.current).forEach((player) => {
      if (player && player.stopVideo) {
        player.stopVideo();
      }
    });
    setPlayingVideo(null);
    setLoadingVideo(null);
  }, []);

  // 📹 비디오 준비 핸들러
  const handleVideoReady = useCallback((event, videoId) => {
    playerRefs.current[videoId] = event.target;
    setLoadedVideos((prev) => new Set([...prev, videoId]));
    setLoadingVideo(null);
  }, []);

  // ▶️ 비디오 재생 핸들러
  const handlePlayVideo = useCallback((videoId) => {
    setLoadingVideo(videoId);

    Object.entries(playerRefs.current).forEach(([id, player]) => {
      if (id !== videoId.toString() && player && player.stopVideo) {
        player.stopVideo();
      }
    });

    const player = playerRefs.current[videoId];
    if (player && player.playVideo) {
      try {
        player.playVideo();
        setPlayingVideo(videoId);
        setLoadingVideo(null);
      } catch (error) {
        console.error(`Error playing video ${videoId}:`, error);
        setLoadingVideo(null);
      }
    }
  }, []);

  // 🎛️ 비디오 인터랙션 핸들러
  const handleVideoInteraction = useCallback((videoId, type) => {
    setVideoInteractions((prev) => ({
      ...prev,
      [videoId]: {
        ...prev[videoId],
        [type]: !prev[videoId]?.[type],
      },
    }));
  }, []);

  // 🛍️ 아이템 정보 링크 클릭 핸들러
  const handleItemInfoClick = useCallback((e, videoId, itemUrl) => {
    setVideoInteractions((prev) => ({
      ...prev,
      [videoId]: {
        ...prev[videoId],
        itemInfo: !prev[videoId]?.itemInfo,
      },
    }));
  }, []);

  // 💬 댓글 클릭 핸들러 (간소화됨)
  const handleCommentClick = useCallback(
    (e, video) => {
      e.stopPropagation();

      if (commentOpen && selectedCommentVideo?.id === video.id) {
        setCommentOpen(false);
        setSelectedCommentVideo(null);
        setVideoInteractions((prev) => ({
          ...prev,
          [video.id]: {
            ...prev[video.id],
            commented: false,
          },
        }));
      } else {
        setSelectedCommentVideo(video);
        setCommentOpen(true);
        setVideoInteractions((prev) => ({
          ...prev,
          [video.id]: {
            ...prev[video.id],
            commented: true,
          },
        }));
      }
    },
    [commentOpen, selectedCommentVideo]
  );

  // ❌ 댓글 모달 닫기 핸들러 (간소화됨)
  const closeCommentModal = useCallback(() => {
    if (selectedCommentVideo) {
      setVideoInteractions((prev) => ({
        ...prev,
        [selectedCommentVideo.id]: {
          ...prev[selectedCommentVideo.id],
          commented: false,
        },
      }));
    }

    setCommentOpen(false);
    setSelectedCommentVideo(null);
  }, [selectedCommentVideo]);

  // 📤 공유 모달 열기 핸들러
  const handleShareClick = useCallback(
    (e, video) => {
      e.stopPropagation();
      setSelectedVideo(video);
      setShareModalOpen(true);
      handleVideoInteraction(video.id, "shared");
    },
    [handleVideoInteraction]
  );

  // ❌ 공유 모달 닫기 핸들러
  const closeShareModal = useCallback(() => {
    setShareModalOpen(false);
    setSelectedVideo(null);
  }, []);

  // 🎬 비디오 로드 여부 결정
  const shouldLoadVideo = useCallback(
    (index, videoId) => {
      if (useLiteEmbed) return true;
      const range = 2;
      return Math.abs(index - activeIndex) <= range;
    },
    [activeIndex, useLiteEmbed]
  );

  // ⚙️ YouTube 옵션
  const youtubeOpts = useMemo(
    () => ({
      width: "100%",
      height: "100%",
      playerVars: {
        autoplay: 0,
        controls: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        mute: 0,
        loop: 1,
        enablejsapi: 1,
        origin: window.location.origin,
      },
    }),
    []
  );

  // 🎨 렌더링
  return (
    <Container>
      <Wrapper>
        <TitleSection>
          <MainTitle>
            <h4>zip shorts</h4>
            <p>
              "스타들의 IT템, 지금 클로즈업!"
              <br />
              <b>zip shorts</b>에서
            </p>
          </MainTitle>
        </TitleSection>

        <ContentSection $commentOpen={commentOpen}>
          <CarouselContainer $commentOpen={commentOpen}>
            <Swiper
              ref={swiperRef}
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={5} // 데스크톱 기본값
              spaceBetween={40}
              coverflowEffect={coverflowConfig}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className="mySwiper"
              onSlideChange={handleSlideChange}
              // 데스크톱에서는 페이지네이션, 모바일/태블릿에서는 무한 루프
              loop={window.innerWidth <= 1024} // 1024px 이하에서만 무한 루프
              loopAdditionalSlides={window.innerWidth <= 1024 ? 3 : 0}
              slidesPerGroup={window.innerWidth >= 1025 ? 5 : 1} // 데스크톱에서는 5개씩 그룹
              pagination={
                window.innerWidth >= 1025
                  ? {
                      clickable: true,
                      dynamicBullets: true,
                    }
                  : false
              } // 데스크톱에서만 페이지네이션
              initialSlide={0}
              speed={600}
              resistance={true}
              resistanceRatio={0.85}
              watchSlidesProgress={true}
              breakpoints={{
                1025: {
                  slidesPerView: 5,
                  spaceBetween: 40,
                  centeredSlides: true, // 가운데 정렬로 변경
                  slidesPerGroup: 5, // 5개씩 그룹
                  loop: false, // 무한 루프 비활성화
                  pagination: {
                    clickable: true,
                    dynamicBullets: true,
                  },
                },
                769: {
                  slidesPerView: 3,
                  spaceBetween: 25,
                  centeredSlides: true,
                  slidesPerGroup: 1, // 1개씩 이동
                  loop: true, // 무한 루프
                  pagination: false, // 페이지네이션 비활성화
                },
                0: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                  centeredSlides: true,
                  slidesPerGroup: 1, // 1개씩 이동
                  loop: true, // 무한 루프
                  pagination: false, // 페이지네이션 비활성화
                },
              }}
            >
              {shortsVideos.map((video, index) => (
                <SwiperSlide key={video.id}>
                  <VideoCard
                    video={video}
                    index={index}
                    activeIndex={activeIndex}
                    useLiteEmbed={useLiteEmbed}
                    shouldLoadVideo={shouldLoadVideo}
                    youtubeOpts={youtubeOpts}
                    videoInteractions={videoInteractions}
                    handleVideoReady={handleVideoReady}
                    handlePlayVideo={handlePlayVideo}
                    handleVideoInteraction={handleVideoInteraction}
                    handleItemInfoClick={handleItemInfoClick}
                    handleCommentClick={handleCommentClick}
                    handleShareClick={handleShareClick}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </CarouselContainer>

          {/* 💬 새로운 댓글 컴포넌트 */}
          <Comment
            isOpen={commentOpen}
            onClose={closeCommentModal}
            video={selectedCommentVideo}
            videoData={currentVideoData}
            commentCount={currentVideoData?.comments?.length || 0}
          />
        </ContentSection>
      </Wrapper>

      {/* 📤 공유 모달 컴포넌트 */}
      <KakaoShare
        isOpen={shareModalOpen}
        onClose={closeShareModal}
        video={selectedVideo}
      />
    </Container>
  );
};

export default React.memo(Short);
