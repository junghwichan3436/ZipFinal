import React, { useCallback, useRef, useEffect, useState } from "react";
import styled from "styled-components";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faBagShopping,
  faPaperPlane,
  faVolumeHigh,
  faVolumeLow,
  faVolumeXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartRegular,
  faComment as faCommentRegular,
  faPaperPlane as faPaperPlaneRegular,
} from "@fortawesome/free-regular-svg-icons";

// 스타일 컴포넌트들
const VideoCardContainer = styled.div`
  background: transparent;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.5s ease;
  cursor: pointer;
  position: relative;
  border: none;
  margin: 0 auto;
  width: 100%;
  height: 100%;

  opacity: ${(props) => (props.$isActive ? 1 : 0.4)};
  filter: brightness(${(props) => (props.$isActive ? 1 : 0.6)});

  ${(props) =>
    props.$isActive &&
    `
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
    border: 2px solid rgba(255, 255, 255, 0.6);
    z-index: 10;
  `}
`;

const FullYouTubeContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #000;
  border-radius: 10px;
  overflow: hidden;

  .yt-lite {
    width: 100% !important;
    height: 100% !important;
    border-radius: 10px !important;
    background-size: cover !important;
    background-position: center !important;
  }

  .yt-lite > iframe {
    border-radius: 10px !important;
    width: 100% !important;
    height: 100% !important;
  }
`;

const VolumeContainer = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 15;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transform: translateX(${(props) => (props.$visible ? 0 : "20px")});
`;

const VolumeButton = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  font-size: 12px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: scale(1.1);
  }
`;

const VolumeSlider = styled.input`
  width: 60px;
  height: 3px;
  background: rgba(255, 255, 255, 0.3);
  outline: none;
  border-radius: 2px;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid #fff;
  }
`;

const VolumeText = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
  min-width: 18px;
  text-align: center;
`;

const VideoOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 25px 15px 18px;
  color: white;
  z-index: 2;
`;

const VideoInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 55px;
  gap: 12px;
  width: 75%;
  padding: 24px 10px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 28px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const VideoMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.4rem;
  color: #fff;
  font-weight: 500;
`;

const ChannelInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ChannelAvatar = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
  background: #eee;
  margin-right: 5px;
`;

const VideoInteractions = styled.div`
  position: absolute;
  right: 15px;
  bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  z-index: 10;
`;

const InteractionButton = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  background: ${(props) => (props.$active ? "#fff" : "rgba(0, 0, 0, 0.6)")};
  backdrop-filter: blur(10px);
  color: ${(props) => (props.$active ? "#000" : "#fff")};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;

  &:hover {
    transform: scale(1.1);
  }
`;

const ItemInfoLink = styled.a`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  background: ${(props) => (props.$active ? "#fff" : "rgba(0, 0, 0, 0.6)")};
  backdrop-filter: blur(10px);
  color: ${(props) => (props.$active ? "#000" : "#fff")};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  text-decoration: none;

  &:hover {
    transform: scale(1.1);
    background: #fff !important;
    color: #000 !important;
  }
`;

const ShareButton = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  border: none;
  background: ${(props) => (props.$active ? "#fff" : "rgba(0, 0, 0, 0.6)")};
  backdrop-filter: blur(10px);
  color: ${(props) => (props.$active ? "#000" : "#fff")};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;

  &:hover {
    transform: scale(1.1);
    background: #fff !important;
    color: #000 !important;
  }
`;

const InteractionCount = styled.span`
  position: absolute;
  bottom: -7px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  color: #fff;
  white-space: nowrap;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.8);
  padding: 2px 7px;
  border-radius: 12px;
  min-width: 22px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const VideoCard = React.memo(
  ({
    video,
    index,
    activeIndex,
    isActive,
    videoInteractions,
    handleVideoInteraction,
    handleItemInfoClick,
    handleCommentClick,
    handleShareClick,
    registerVideoRef,
    globalVolume,
    globalMuted,
    onVolumeChange,
    onMuteToggle,
    onVideoReady,
  }) => {
    const containerRef = useRef(null);
    const playerRef = useRef(null);
    const [showVolumeControl, setShowVolumeControl] = useState(false);
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [isDestroyed, setIsDestroyed] = useState(false);

    const cardIsActive = activeIndex === index || isActive;

    // 🎵 볼륨 아이콘 선택
    const getVolumeIcon = () => {
      if (globalMuted || globalVolume === 0) return faVolumeXmark;
      if (globalVolume < 50) return faVolumeLow;
      return faVolumeHigh;
    };

    // 🎵 볼륨 변경 핸들러
    const handleVolumeChange = useCallback(
      (e) => {
        const newVolume = parseInt(e.target.value);
        onVolumeChange(newVolume);

        if (playerRef.current && isPlayerReady) {
          try {
            playerRef.current.setVolume(newVolume);
            if (newVolume === 0) {
              playerRef.current.mute();
            } else if (globalMuted) {
              playerRef.current.unMute();
            }
          } catch (error) {
            // Silent error handling for production
          }
        }
      },
      [onVolumeChange, isPlayerReady, globalMuted]
    );

    // 🎵 음소거 토글
    const handleMuteToggle = useCallback(
      (e) => {
        e.stopPropagation();
        onMuteToggle();

        if (playerRef.current && isPlayerReady) {
          try {
            if (!globalMuted) {
              playerRef.current.mute();
            } else {
              playerRef.current.unMute();
              playerRef.current.setVolume(globalVolume);
            }
          } catch (error) {
            // Silent error handling for production
          }
        }
      },
      [onMuteToggle, isPlayerReady, globalMuted, globalVolume]
    );

    // 🛑 강력한 비디오 정지 함수
    const forceStopVideo = useCallback(() => {
      try {
        // 1. Player API 정지
        if (playerRef.current) {
          playerRef.current.pauseVideo();
          playerRef.current.stopVideo();
          playerRef.current.seekTo(0, true);
        }

        // 2. iframe postMessage 정지
        const iframe = containerRef.current?.querySelector(
          'iframe[src*="youtube.com/embed"]'
        );
        if (iframe?.contentWindow) {
          iframe.contentWindow.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            "*"
          );
          iframe.contentWindow.postMessage(
            '{"event":"command","func":"stopVideo","args":""}',
            "*"
          );
        }

        // 3. HTML5 video 정지
        const allVideos = containerRef.current?.querySelectorAll("video");
        allVideos?.forEach((videoEl) => {
          videoEl.pause();
          videoEl.currentTime = 0;
          videoEl.removeAttribute("autoplay");
        });

        // 4. LiteYouTube 재초기화 로직
        const liteYoutubeElement =
          containerRef.current?.querySelector(".yt-lite");
        if (liteYoutubeElement?.classList.contains("lty-activated")) {
          // iframe 제거
          const existingIframe = liteYoutubeElement.querySelector("iframe");
          if (existingIframe) {
            existingIframe.remove();
          }

          // video 요소 제거
          const videoElements = liteYoutubeElement.querySelectorAll("video");
          videoElements.forEach((videoEl) => {
            videoEl.pause();
            videoEl.remove();
          });

          // 클래스 및 스타일 초기화
          liteYoutubeElement.classList.remove("lty-activated");
          liteYoutubeElement.style.cursor = "pointer";

          // 썸네일 복원
          const thumbnail = liteYoutubeElement.querySelector(
            '.lty-thumbnail, [style*="background-image"]'
          );
          if (thumbnail) {
            thumbnail.style.display = "block";
          }

          // 플레이 버튼 복원
          const playBtn = liteYoutubeElement.querySelector(".lty-playbtn");
          if (playBtn) {
            playBtn.style.display = "block";
            playBtn.style.opacity = "1";
          }
        }
      } catch (error) {
        // Silent error handling for production
      }
    }, [video.videoId]);

    // 🎬 YouTube Player 초기화
    const initializePlayer = useCallback(() => {
      if (!cardIsActive || isDestroyed) return;

      const iframe = containerRef.current?.querySelector(
        'iframe[src*="youtube.com/embed"]'
      );
      if (!iframe || playerRef.current) return;

      const createPlayer = () => {
        if (
          typeof window.YT !== "undefined" &&
          window.YT.Player &&
          !isDestroyed
        ) {
          try {
            const player = new window.YT.Player(iframe, {
              events: {
                onReady: (event) => {
                  if (isDestroyed || activeIndex !== index) {
                    event.target.destroy();
                    return;
                  }

                  playerRef.current = event.target;
                  setIsPlayerReady(true);

                  try {
                    event.target.setVolume(globalVolume);
                    if (globalMuted) {
                      event.target.mute();
                    }
                  } catch (e) {
                    // Silent error handling for production
                  }

                  onVideoReady && onVideoReady(video.videoId, event.target);
                },
                onStateChange: (event) => {
                  // 비활성 카드에서 재생 시작되면 즉시 정지
                  if (event.data === 1 && activeIndex !== index) {
                    try {
                      event.target.pauseVideo();
                      event.target.seekTo(0, true);
                    } catch (e) {
                      // Silent error handling for production
                    }
                  }
                },
                onError: (event) => {
                  // Silent error handling for production
                },
              },
            });
          } catch (error) {
            // Silent error handling for production
          }
        } else {
          setTimeout(createPlayer, 500);
        }
      };

      createPlayer();
    }, [
      cardIsActive,
      video.videoId,
      globalVolume,
      globalMuted,
      onVideoReady,
      activeIndex,
      index,
      isDestroyed,
    ]);

    // 🚨 핵심! activeIndex 변경 시 강력한 정지 처리
    useEffect(() => {
      const isCurrentlyActive = activeIndex === index;

      if (!isCurrentlyActive && !isDestroyed) {
        // 강력한 정지 실행
        forceStopVideo();

        // 플레이어 정리
        if (playerRef.current) {
          try {
            playerRef.current.destroy();
          } catch (e) {
            // Silent error handling for production
          }
          playerRef.current = null;
        }

        setIsPlayerReady(false);
      }
    }, [activeIndex, index, video.videoId, isDestroyed, forceStopVideo]);

    // 🎬 카드 활성화 시 초기화
    useEffect(() => {
      if (cardIsActive && !isDestroyed) {
        // YouTube API 로드
        if (!window.YT) {
          const script = document.createElement("script");
          script.src = "https://www.youtube.com/iframe_api";
          script.async = true;
          document.head.appendChild(script);

          window.onYouTubeIframeAPIReady = () => {
            // YouTube API loaded
          };
        }

        // 이벤트 리스너 재등록
        const liteYoutubeElement =
          containerRef.current?.querySelector(".yt-lite");
        if (liteYoutubeElement) {
          const handleClick = () => {
            setTimeout(() => {
              if (cardIsActive && !isDestroyed) {
                initializePlayer();
              }
            }, 1000);
          };

          // 기존 이벤트 리스너 제거 후 새로 추가
          liteYoutubeElement.removeEventListener("click", handleClick);
          liteYoutubeElement.addEventListener("click", handleClick);

          // MutationObserver로 iframe 생성 감지
          const observer = new MutationObserver(() => {
            const iframe = containerRef.current?.querySelector(
              'iframe[src*="youtube.com/embed"]'
            );
            if (iframe && !playerRef.current && cardIsActive && !isDestroyed) {
              setTimeout(() => {
                if (cardIsActive && !isDestroyed) {
                  initializePlayer();
                }
              }, 500);
              observer.disconnect();
            }
          });

          observer.observe(liteYoutubeElement, {
            childList: true,
            subtree: true,
          });

          return () => {
            liteYoutubeElement.removeEventListener("click", handleClick);
            observer.disconnect();
          };
        }
      }
    }, [cardIsActive, initializePlayer, video.videoId, isDestroyed]);

    // 🧹 컴포넌트 언마운트 시 정리
    useEffect(() => {
      return () => {
        setIsDestroyed(true);
        forceStopVideo();
        if (playerRef.current) {
          try {
            playerRef.current.destroy();
          } catch (e) {
            // Silent error handling for production
          }
        }
      };
    }, [forceStopVideo]);

    // 🔗 iframe 등록
    useEffect(() => {
      if (!registerVideoRef || !video.videoId || !containerRef.current) return;

      const findAndRegisterIframe = () => {
        const iframe = containerRef.current?.querySelector(
          'iframe[src*="youtube.com/embed"]'
        );
        if (iframe) {
          registerVideoRef(video.videoId, iframe);
          return true;
        }
        return false;
      };

      if (findAndRegisterIframe()) return;

      const observer = new MutationObserver(() => {
        if (findAndRegisterIframe()) {
          observer.disconnect();
        }
      });

      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });

      const timeoutId = setTimeout(() => observer.disconnect(), 3000);
      return () => {
        clearTimeout(timeoutId);
        observer.disconnect();
      };
    }, [registerVideoRef, video.videoId]);

    // 🎭 마우스 이벤트
    const handleMouseEnter = useCallback(() => {
      if (cardIsActive) setShowVolumeControl(true);
    }, [cardIsActive]);

    const handleMouseLeave = useCallback(() => {
      setShowVolumeControl(false);
    }, []);

    // 🎛️ 인터랙션 핸들러들
    const onLikeClick = useCallback(
      (e) => {
        e.stopPropagation();
        handleVideoInteraction(video.id, "liked");
      },
      [video.id, handleVideoInteraction]
    );

    const onCommentClick = useCallback(
      (e) => {
        handleCommentClick(e, video);
      },
      [handleCommentClick, video]
    );

    const onItemInfoClick = useCallback(
      (e) => {
        handleItemInfoClick(e, video.id, video.itemUrl);
      },
      [handleItemInfoClick, video.id, video.itemUrl]
    );

    const onShareClick = useCallback(
      (e) => {
        handleShareClick(e, video);
      },
      [handleShareClick, video]
    );

    return (
      <VideoCardContainer
        className={cardIsActive ? "active" : ""}
        $isActive={cardIsActive}
        data-video-id={video.videoId}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* YouTube 비디오 */}
        <FullYouTubeContainer ref={containerRef}>
          <LiteYouTubeEmbed
            id={video.videoId}
            title={video.title || "YouTube Video"}
            poster="maxresdefault"
            noCookie={true}
            params="enablejsapi=1&rel=0&showinfo=0&modestbranding=1&controls=1&iv_load_policy=3&autoplay=0"
          />
        </FullYouTubeContainer>

        {/* 볼륨 컨트롤 */}
        <VolumeContainer $visible={showVolumeControl && cardIsActive}>
          <VolumeButton onClick={handleMuteToggle}>
            <FontAwesomeIcon icon={getVolumeIcon()} />
          </VolumeButton>
          <VolumeSlider
            type="range"
            min="0"
            max="100"
            value={globalVolume}
            onChange={handleVolumeChange}
            onClick={(e) => e.stopPropagation()}
          />
          <VolumeText>{globalVolume}%</VolumeText>
        </VolumeContainer>

        {/* 비디오 오버레이 */}
        <VideoOverlay>
          <VideoInfo>
            <VideoMeta>
              <ChannelInfo>
                <ChannelAvatar
                  src={video.itemInfo}
                  alt={video.title || "Channel"}
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=45&h=45&fit=crop&crop=face";
                  }}
                />
                <span>{video.keyword?.join(", ") || "No keywords"}</span>
              </ChannelInfo>
            </VideoMeta>
          </VideoInfo>
        </VideoOverlay>

        {/* 인터랙션 버튼들 */}
        <VideoInteractions>
          <InteractionButton
            $active={videoInteractions[video.id]?.liked}
            onClick={onLikeClick}
          >
            <FontAwesomeIcon
              icon={
                videoInteractions[video.id]?.liked ? faHeart : faHeartRegular
              }
            />
            {videoInteractions[video.id]?.liked && (
              <InteractionCount>2.5만</InteractionCount>
            )}
          </InteractionButton>

          <InteractionButton
            $active={videoInteractions[video.id]?.commented}
            onClick={onCommentClick}
          >
            <FontAwesomeIcon
              icon={
                videoInteractions[video.id]?.commented
                  ? faComment
                  : faCommentRegular
              }
            />
            {videoInteractions[video.id]?.commented && (
              <InteractionCount>174</InteractionCount>
            )}
          </InteractionButton>

          <ItemInfoLink
            href={video.itemUrl}
            target="_blank"
            rel="noopener noreferrer"
            $active={videoInteractions[video.id]?.itemInfo}
            onClick={onItemInfoClick}
          >
            <FontAwesomeIcon icon={faBagShopping} />
            {videoInteractions[video.id]?.itemInfo && (
              <InteractionCount>아이템</InteractionCount>
            )}
          </ItemInfoLink>

          <ShareButton
            $active={videoInteractions[video.id]?.shared}
            onClick={onShareClick}
          >
            <FontAwesomeIcon
              icon={
                videoInteractions[video.id]?.shared
                  ? faPaperPlane
                  : faPaperPlaneRegular
              }
            />
            {videoInteractions[video.id]?.shared && (
              <InteractionCount>공유</InteractionCount>
            )}
          </ShareButton>
        </VideoInteractions>
      </VideoCardContainer>
    );
  }
);

VideoCard.displayName = "VideoCard";
export default VideoCard;
