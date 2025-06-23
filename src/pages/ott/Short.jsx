import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import styled, { css } from "styled-components";
import VideoCard from "../../components/shorts/VideoCard";
import KakaoShare from "../../components/shorts/KakaoShare";
import Comment from "../../components/shorts/comment";

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
  margin-bottom: 200px;
`;

const MainTitle = styled.div`
  display: flex;
  gap: 30px;
  align-items: end;
  padding-top: 177px;
  padding-bottom: 10px;
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
    padding-bottom: 10px;
    gap: 20px;
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
    gap: 18px;
    padding-top: 100px;
    padding-bottom: 5px;

    h4 {
      font-size: 4rem;
      letter-spacing: -2px;
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
  padding: 40px 3% 120px;
  position: relative;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);

  @media screen and (min-width: 1025px) {
    display: ${(props) => (props.$commentOpen ? "flex" : "block")};
    gap: ${(props) => (props.$commentOpen ? "0" : "0")};
    align-items: flex-start;
    padding: ${(props) =>
      props.$commentOpen ? "40px 1% 120px" : "40px 3% 120px"};
  }

  @media screen and (min-width: 769px) and (max-width: 1024px) {
    transform: ${(props) => (props.$commentOpen ? "scale(0.8)" : "scale(1)")};
    transform-origin: center left;
    padding: 30px 3% 100px;
  }

  @media screen and (max-width: 768px) {
    padding: 20px 3% 80px;
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
  width: 100%;
  height: 780px;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1200px;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  padding: 0;

  @media screen and (min-width: 1025px) {
    flex: ${(props) => (props.$commentOpen ? "1" : "none")};
    height: 80vh;
    min-width: 0;
    max-width: ${(props) => (props.$commentOpen ? "none" : "2500px")};
    margin: 0 auto;
    margin-bottom: 160px;
    margin-right: ${(props) => (props.$commentOpen ? "0" : "auto")};
  }

  @media screen and (max-width: 1600px) {
    height: 650px;
  }

  @media screen and (max-width: 1440px) {
    height: 580px;
  }

  @media screen and (max-width: 1280px) {
    height: 520px;
  }

  @media screen and (max-width: 1024px) {
    height: 460px;
  }

  @media screen and (max-width: 768px) {
    height: 400px;
  }

  @media screen and (max-width: 480px) {
    height: 340px;
  }
`;

const CardWrapper = styled.div`
  position: absolute;
  width: 458px;
  height: 700px;
  transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  transform-style: preserve-3d;
  cursor: pointer;

  ${(props) => {
    const { index, currentIndex, total } = props;
    const diff = index - currentIndex;

    if (diff === 0) {
      return css`
        transform: translateX(0) translateZ(100px) rotateY(0deg) scale(1.1);
        z-index: 100;
        opacity: 1;
        filter: brightness(1);
      `;
    } else if (diff === 1 || (currentIndex === total - 1 && index === 0)) {
      return css`
        transform: translateX(550px) translateZ(-50px) rotateY(-25deg)
          scale(0.9);
        z-index: 50;
        opacity: 0.8;
        filter: brightness(0.7);
      `;
    } else if (diff === -1 || (currentIndex === 0 && index === total - 1)) {
      return css`
        transform: translateX(-550px) translateZ(-50px) rotateY(25deg)
          scale(0.9);
        z-index: 50;
        opacity: 0.8;
        filter: brightness(0.7);
      `;
    } else if (diff === 2 || (currentIndex >= total - 2 && index < 2)) {
      return css`
        transform: translateX(900px) translateZ(-100px) rotateY(-35deg)
          scale(0.8);
        z-index: 25;
        opacity: 0.6;
        filter: brightness(0.5);
      `;
    } else if (diff === -2 || (currentIndex <= 1 && index >= total - 2)) {
      return css`
        transform: translateX(-900px) translateZ(-100px) rotateY(35deg)
          scale(0.8);
        z-index: 25;
        opacity: 0.6;
        filter: brightness(0.5);
      `;
    } else {
      return css`
        transform: translateX(${diff > 0 ? "1200px" : "-1200px"})
          translateZ(-200px) rotateY(${diff > 0 ? "-45deg" : "45deg"})
          scale(0.7);
        z-index: 1;
        opacity: 0;
        filter: brightness(0.3);
      `;
    }
  }}

  &:hover {
    ${(props) =>
      props.index === props.currentIndex &&
      css`
        transform: translateX(0) translateZ(120px) rotateY(0deg) scale(1.15);
      `}
  }

  @media screen and (max-width: 1600px) {
    width: 380px;
    height: 580px;
  }

  @media screen and (max-width: 1440px) {
    width: 340px;
    height: 520px;
  }

  @media screen and (max-width: 1280px) {
    width: 300px;
    height: 460px;
  }

  @media screen and (max-width: 1024px) {
    width: 260px;
    height: 400px;
  }

  @media screen and (max-width: 768px) {
    width: 220px;
    height: 340px;
  }

  @media screen and (max-width: 480px) {
    width: 180px;
    height: 280px;
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 200;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-50%) scale(1.1);
  }

  &.prev {
    left: 20px;
  }

  &.next {
    right: 20px;
  }

  svg {
    width: 24px;
    height: 24px;
    fill: none;
    stroke: currentColor;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  @media screen and (max-width: 768px) {
    width: 40px;
    height: 40px;

    svg {
      width: 20px;
      height: 20px;
    }

    &.prev {
      left: 10px;
    }

    &.next {
      right: 10px;
    }
  }
`;

// 🚀 메인 Short 컴포넌트
const Short = () => {
  // 📱 상태 관리
  const [activeIndex, setActiveIndex] = useState(0);
  const [shortVideos, setShortVideos] = useState({ originalData: [] });
  const [videoInteractions, setVideoInteractions] = useState({});
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // 🎭 댓글 모달 상태
  const [commentOpen, setCommentOpen] = useState(false);

  // 🎬 비디오 참조를 위한 ref
  const videoRefs = useRef({});

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

  // 🎯 현재 선택된 비디오 데이터 - 항상 현재 활성화된 비디오
  const currentVideoData = useMemo(() => {
    if (commentOpen && shortsVideos[activeIndex]) {
      return shortVideos.originalData.find(
        (data) => data.id === shortsVideos[activeIndex].id
      );
    }
    return null;
  }, [commentOpen, activeIndex, shortsVideos, shortVideos.originalData]);

  // 🔄 LiteYouTubeEmbed 컨테이너 리셋 함수
  const resetVideoContainer = useCallback((videoId) => {
    const container = document.querySelector(`[data-video-id="${videoId}"]`);
    if (container) {
      const liteYoutube = container.querySelector(".yt-lite");
      if (liteYoutube && liteYoutube.classList.contains("lty-activated")) {
        // 활성화된 YouTube embed를 비활성화 상태로 되돌림
        liteYoutube.classList.remove("lty-activated");
        const iframe = liteYoutube.querySelector("iframe");
        if (iframe) {
          iframe.remove();
        }
        console.log(`🔄 Reset LiteYouTube container for: ${videoId}`);
      }
    }
  }, []);

  // 🎬 비디오 정지 및 초기화 함수 (개선됨)
  const stopAndResetVideo = useCallback((videoId) => {
    const videoElement = videoRefs.current[videoId];
    if (!videoElement) {
      console.log(`❌ No video element found for: ${videoId}`);
      return;
    }

    try {
      console.log(`⏹️ Stopping video: ${videoId}`);

      // 1. YouTube iframe API 명령어 시도
      if (videoElement.contentWindow) {
        const commands = [
          '{"event":"command","func":"pauseVideo","args":""}',
          '{"event":"command","func":"stopVideo","args":""}',
          '{"event":"command","func":"seekTo","args":[0, true]}',
        ];

        commands.forEach((command, index) => {
          setTimeout(() => {
            try {
              videoElement.contentWindow.postMessage(command, "*");
              console.log(`📤 Sent command ${index + 1} to ${videoId}`);
            } catch (e) {
              console.log(`❌ PostMessage failed for ${videoId}:`, e.message);
            }
          }, index * 100); // 명령어 간 100ms 간격
        });
      }

      // 2. HTML5 video API 시도 (fallback)
      if (videoElement.pause && typeof videoElement.pause === "function") {
        videoElement.pause();
        videoElement.currentTime = 0;
        console.log(`✅ HTML5 video stopped: ${videoId}`);
      }

      // 3. 마지막 수단: iframe 숨기기 (src 변경 대신)
      setTimeout(() => {
        if (videoElement.style) {
          videoElement.style.opacity = "0";
          setTimeout(() => {
            if (videoElement.style) {
              videoElement.style.opacity = "1";
            }
          }, 200);
        }
      }, 300);
    } catch (error) {
      console.error(`❌ Video control failed for ${videoId}:`, error);
    }
  }, []);

  // 🎬 모든 비디오 정지 함수 (강화됨)
  const stopAllVideos = useCallback(() => {
    console.log("🛑 Stopping all videos...");

    Object.keys(videoRefs.current).forEach((videoId) => {
      stopAndResetVideo(videoId);
      // 추가로 컨테이너도 리셋
      setTimeout(() => resetVideoContainer(videoId), 500);
    });

    // 브라우저 차원에서 모든 미디어 정지 시도
    document.querySelectorAll("video, audio").forEach((media) => {
      if (!media.paused) {
        media.pause();
        media.currentTime = 0;
      }
    });

    // 모든 iframe에 정지 명령 브로드캐스트
    document
      .querySelectorAll('iframe[src*="youtube.com"]')
      .forEach((iframe) => {
        try {
          iframe.contentWindow?.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            "*"
          );
        } catch (e) {
          // 무시
        }
      });
  }, [stopAndResetVideo, resetVideoContainer]);

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

  // 🎮 카드 네비게이션 핸들러 (수정됨 - 비디오 정지 추가)
  const handlePrevCard = useCallback(() => {
    // 모든 비디오 정지 및 초기화
    stopAllVideos();

    setActiveIndex((prev) => {
      const newIndex = prev === 0 ? shortsVideos.length - 1 : prev - 1;
      return newIndex;
    });
  }, [shortsVideos.length, stopAllVideos]);

  const handleNextCard = useCallback(() => {
    // 모든 비디오 정지 및 초기화
    stopAllVideos();

    setActiveIndex((prev) => {
      const newIndex = prev === shortsVideos.length - 1 ? 0 : prev + 1;
      return newIndex;
    });
  }, [shortsVideos.length, stopAllVideos]);

  const handleCardClick = useCallback(
    (index) => {
      if (index !== activeIndex) {
        // 모든 비디오 정지 및 초기화
        stopAllVideos();
        setActiveIndex(index);
      }
    },
    [activeIndex, stopAllVideos]
  );

  // 🎬 비디오 ref 등록 함수
  const registerVideoRef = useCallback((videoId, videoElement) => {
    if (videoElement && videoId) {
      videoRefs.current[videoId] = videoElement;
      console.log(`✅ Video ref registered for: ${videoId}`);
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

  // 💬 댓글 클릭 핸들러 (수정됨)
  const handleCommentClick = useCallback(
    (e, video) => {
      e.stopPropagation();

      if (commentOpen) {
        // 댓글창이 이미 열려있으면 닫기
        setCommentOpen(false);
        setVideoInteractions((prev) => ({
          ...prev,
          [video.id]: {
            ...prev[video.id],
            commented: false,
          },
        }));
      } else {
        // 댓글창 열기
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
    [commentOpen]
  );

  // ❌ 댓글 모달 닫기 핸들러
  const closeCommentModal = useCallback(() => {
    if (shortsVideos[activeIndex]) {
      setVideoInteractions((prev) => ({
        ...prev,
        [shortsVideos[activeIndex].id]: {
          ...prev[shortsVideos[activeIndex].id],
          commented: false,
        },
      }));
    }

    setCommentOpen(false);
  }, [activeIndex, shortsVideos]);

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
            {/* 🎮 네비게이션 버튼 */}
            <NavigationButton className="prev" onClick={handlePrevCard}>
              <svg viewBox="0 0 24 24">
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </NavigationButton>

            <NavigationButton className="next" onClick={handleNextCard}>
              <svg viewBox="0 0 24 24">
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </NavigationButton>

            {/* 🃏 카드 스택 */}
            {shortsVideos.map((video, index) => (
              <CardWrapper
                key={video.id}
                index={index}
                currentIndex={activeIndex}
                total={shortsVideos.length}
                onClick={() => handleCardClick(index)}
              >
                <VideoCard
                  video={video}
                  index={index}
                  activeIndex={activeIndex}
                  isActive={index === activeIndex}
                  videoInteractions={videoInteractions}
                  handleVideoInteraction={handleVideoInteraction}
                  handleItemInfoClick={handleItemInfoClick}
                  handleCommentClick={handleCommentClick}
                  handleShareClick={handleShareClick}
                  registerVideoRef={registerVideoRef}
                />
              </CardWrapper>
            ))}
          </CarouselContainer>

          {/* 💬 댓글 컴포넌트 - 현재 활성화된 비디오의 댓글 표시 */}
          <Comment
            isOpen={commentOpen}
            onClose={closeCommentModal}
            video={shortsVideos[activeIndex]}
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
