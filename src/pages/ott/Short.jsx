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
  gap: 40px;
  align-items: end;
  padding-top: 200px;
  padding-bottom: 50px;
  border-bottom: 1px solid #3c3c3c;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
    padding-top: 100px;
  }

  h4 {
    font-size: 11rem;
    font-family: "EHNormalTrial", sans-serif;
    font-weight: 500;
    letter-spacing: -5px;

    @media screen and (max-width: 768px) {
      font-size: 6rem;
    }
  }

  p {
    font-size: 2rem;
    font-weight: 300;
    line-height: 1.4;

    @media screen and (max-width: 768px) {
      font-size: 1.6rem;
    }

    b {
      font-weight: 300;
      font-family: "EHNormalTrial", sans-serif;
    }
  }
`;

const Title = styled.h4`
  font-size: 11rem;
  text-transform: uppercase;
  font-family: "EHNormalTrial", sans-serif;
  font-weight: 500;
  letter-spacing: -5px;
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
    max-width: 3200px;
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease;
    opacity: 0.4;
    filter: brightness(0.6);
  }

  .swiper-slide-active {
    opacity: 1 !important;
    filter: brightness(1) !important;
    transform: scale(1.05);
  }
`;

// 🚀 메인 Short 컴포넌트
const Short = () => {
  // 📱 상태 관리
  const [activeIndex, setActiveIndex] = useState(2);
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

  const swiperRef = useRef(null);
  const playerRefs = useRef({});

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

  // 🎞️ 슬라이드 변경 핸들러
  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.activeIndex);
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
            <Title>zip. shorts</Title>
            <p>
              "스타들의 IT템, 지금 클로즈업!"
              <br />
              <b>ZIP. SHORT</b>에서
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
              slidesPerView={5}
              spaceBetween={40}
              coverflowEffect={{
                rotate: 18,
                stretch: 0,
                depth: 180,
                modifier: 1,
                slideShadows: false,
              }}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className="mySwiper"
              onSlideChange={handleSlideChange}
              loop={true}
              initialSlide={2}
              breakpoints={{
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                480: {
                  slidesPerView: 1,
                  spaceBetween: 10,
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
