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

// 기존 스타일 컴포넌트들...
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

// 🎵 볼륨 컨트롤 스타일 (VideoCard 내부에 추가)
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

  @media screen and (max-width: 768px) {
    top: 10px;
    right: 10px;
    padding: 6px 10px;
  }
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
  -webkit-appearance: none;

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

// 기존 스타일들... (VideoOverlay, VideoInfo, VideoInteractions 등)
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
  }) => {
    const containerRef = useRef(null);

    // 🎵 볼륨 관련 상태들
    const [volume, setVolume] = useState(50);
    const [isMuted, setIsMuted] = useState(false);
    const [showVolumeControl, setShowVolumeControl] = useState(false);

    // cardIsActive 정의를 먼저 해줍니다
    const cardIsActive = activeIndex === index || isActive;

    // YouTube Player 참조
    const [player, setPlayer] = useState(null);
    const [isPlayerReady, setIsPlayerReady] = useState(false);

    // YouTube API 명령 전송 (postMessage 방식)
    const sendYouTubeCommand = useCallback((command, args = []) => {
      const iframe = containerRef.current?.querySelector(
        'iframe[src*="youtube.com/embed"]'
      );
      if (iframe && iframe.contentWindow) {
        try {
          const message = JSON.stringify({
            event: "command",
            func: command,
            args: args,
          });
          iframe.contentWindow.postMessage(message, "*");
          console.log(`🎬 YouTube command sent: ${command}`, args);
        } catch (error) {
          console.error("YouTube command failed:", error);
        }
      }
    }, []);

    // YouTube Player API가 로드된 후 플레이어 인스턴스 생성
    const initializePlayer = useCallback(() => {
      if (
        typeof window.YT !== "undefined" &&
        window.YT.Player &&
        containerRef.current
      ) {
        const iframe = containerRef.current.querySelector(
          'iframe[src*="youtube.com/embed"]'
        );
        if (iframe && !player) {
          try {
            const newPlayer = new window.YT.Player(iframe, {
              events: {
                onReady: (event) => {
                  console.log(`🎬 Player ready: ${video.videoId}`);
                  setPlayer(event.target);
                  setIsPlayerReady(true);
                  // 초기 볼륨 설정
                  event.target.setVolume(volume);
                  if (isMuted) {
                    event.target.mute();
                  }
                },
                onStateChange: (event) => {
                  console.log(
                    `🎬 Player state changed: ${video.videoId}`,
                    event.data
                  );
                },
              },
            });
          } catch (error) {
            console.error("Player initialization failed:", error);
          }
        }
      }
    }, [player, video.videoId, volume, isMuted]);

    // 🎵 볼륨 변경 핸들러
    const handleVolumeChange = useCallback(
      (e) => {
        const newVolume = parseInt(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);

        // Player API 사용
        if (player && isPlayerReady) {
          try {
            player.setVolume(newVolume);
            if (newVolume === 0) {
              player.mute();
            } else if (isMuted) {
              player.unMute();
            }
            console.log(`🔊 Volume set to: ${newVolume}% for ${video.videoId}`);
          } catch (error) {
            console.error("Volume control failed:", error);
          }
        }

        // Fallback: postMessage 방식
        sendYouTubeCommand("setVolume", [newVolume]);
      },
      [player, isPlayerReady, isMuted, sendYouTubeCommand, video.videoId]
    );

    // 🎵 음소거 토글
    const handleMuteToggle = useCallback(
      (e) => {
        e.stopPropagation();

        const newMutedState = !isMuted;
        setIsMuted(newMutedState);

        // Player API 사용
        if (player && isPlayerReady) {
          try {
            if (newMutedState) {
              player.mute();
              console.log(`🔇 Muted: ${video.videoId}`);
            } else {
              player.unMute();
              player.setVolume(volume);
              console.log(`🔊 Unmuted: ${video.videoId}, volume: ${volume}%`);
            }
          } catch (error) {
            console.error("Mute toggle failed:", error);
          }
        }

        // Fallback: postMessage 방식
        if (newMutedState) {
          sendYouTubeCommand("mute");
        } else {
          sendYouTubeCommand("unMute");
          sendYouTubeCommand("setVolume", [volume]);
        }
      },
      [
        isMuted,
        player,
        isPlayerReady,
        volume,
        sendYouTubeCommand,
        video.videoId,
      ]
    );

    // 🎵 볼륨 아이콘 선택
    const getVolumeIcon = () => {
      if (isMuted || volume === 0) return faVolumeXmark;
      if (volume < 50) return faVolumeLow;
      return faVolumeHigh;
    };

    // 마우스 이벤트로 볼륨 컨트롤 표시
    const handleMouseEnter = useCallback(() => {
      if (cardIsActive) setShowVolumeControl(true);
    }, [cardIsActive]);

    const handleMouseLeave = useCallback(() => {
      setShowVolumeControl(false);
    }, []);

    // 🎬 비디오 정지 함수 개선
    const stopAndResetVideo = useCallback(() => {
      console.log(`🛑 Stopping video: ${video.videoId}`);

      // Player API 사용 (더 안정적)
      if (player && isPlayerReady) {
        try {
          player.stopVideo();
          player.seekTo(0, true);
          console.log(`✅ Video stopped via Player API: ${video.videoId}`);
          return;
        } catch (error) {
          console.error("Player API stop failed:", error);
        }
      }

      // Fallback: postMessage 방식
      const iframe = containerRef.current?.querySelector(
        'iframe[src*="youtube.com/embed"]'
      );
      if (iframe && iframe.contentWindow) {
        try {
          const commands = [
            { func: "pauseVideo", args: [] },
            { func: "stopVideo", args: [] },
            { func: "seekTo", args: [0, true] },
          ];

          commands.forEach((cmd, index) => {
            setTimeout(() => {
              try {
                const message = JSON.stringify({
                  event: "command",
                  func: cmd.func,
                  args: cmd.args,
                });
                iframe.contentWindow.postMessage(message, "*");
                console.log(`📤 Sent command: ${cmd.func} to ${video.videoId}`);
              } catch (e) {
                console.error(`❌ PostMessage failed for ${cmd.func}:`, e);
              }
            }, index * 100);
          });
        } catch (error) {
          console.error(`❌ Video control failed for ${video.videoId}:`, error);
        }
      }
    }, [video.videoId, player, isPlayerReady]);

    // 🎯 카드가 비활성화될 때 비디오 정지
    useEffect(() => {
      if (!cardIsActive) {
        console.log(
          `🔄 Card became inactive, stopping video: ${video.videoId}`
        );
        stopAndResetVideo();
        // 플레이어 상태 초기화
        setIsPlayerReady(false);
      }
    }, [cardIsActive, stopAndResetVideo, video.videoId]);

    // YouTube Player API 초기화
    useEffect(() => {
      if (cardIsActive) {
        // YouTube API 스크립트 로드
        if (!window.YT) {
          const script = document.createElement("script");
          script.src = "https://www.youtube.com/iframe_api";
          script.async = true;
          document.head.appendChild(script);

          window.onYouTubeIframeAPIReady = () => {
            console.log("🎬 YouTube API loaded");
            setTimeout(initializePlayer, 1000);
          };
        } else {
          setTimeout(initializePlayer, 1000);
        }
      }
    }, [cardIsActive, initializePlayer]);

    // 기존 iframe 등록 로직...
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

    // 기존 핸들러들...
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
            params="enablejsapi=1&rel=0&showinfo=0&modestbranding=1&controls=1&iv_load_policy=3"
          />
        </FullYouTubeContainer>

        {/* 🎵 볼륨 컨트롤 - 마우스 호버시에만 표시 */}
        <VolumeContainer $visible={showVolumeControl && cardIsActive}>
          <VolumeButton onClick={handleMuteToggle}>
            <FontAwesomeIcon icon={getVolumeIcon()} />
          </VolumeButton>
          <VolumeSlider
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            onClick={(e) => e.stopPropagation()}
          />
          <VolumeText>{volume}%</VolumeText>
        </VolumeContainer>

        {/* 기존 오버레이 */}
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

        {/* 기존 인터랙션 버튼들 */}
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

          <InteractionButton
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
          </InteractionButton>
        </VideoInteractions>
      </VideoCardContainer>
    );
  }
);

VideoCard.displayName = "VideoCard";
export default VideoCard;
