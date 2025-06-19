import React, { useCallback } from "react";
import styled from "styled-components";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import YouTube from "react-youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faBagShopping,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartRegular,
  faComment as faCommentRegular,
  faPaperPlane as faPaperPlaneRegular,
} from "@fortawesome/free-regular-svg-icons";

// 📱 스타일 컴포넌트들
const VideoCardContainer = styled.div`
  background: #111;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.5s ease;
  cursor: pointer;
  width: 458px;
  height: 814px;
  position: relative;
  border: 2px solid transparent;
  margin: 0 auto;

  &:hover {
    transform: scale(1.03);
  }

  .swiper-slide-active & {
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.6);
    transform: scale(1.02);
  }

  @media screen and (max-width: 768px) {
    width: 280px;
    height: 498px;

    &:hover {
      transform: scale(1.02);
    }

    .swiper-slide-active & {
      box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
      border: 2px solid rgba(255, 255, 255, 0.6);
      transform: scale(1.01);
    }
  }
`;

const VideoThumbnail = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s ease;
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    pointer-events: none;
  }

  &.playing img {
    opacity: 0;
  }

  &.loading {
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 40px;
      height: 40px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-top: 3px solid #fff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      z-index: 4;
    }
  }

  @keyframes spin {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

const VideoOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 30px 15px 20px;
  color: white;
  z-index: 2;

  @media screen and (max-width: 768px) {
    padding: 20px 10px 15px;
  }
`;

const VideoInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 60px;
  gap: 12px;
  width: 75%;
  padding: 30px 10px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 30px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media screen and (max-width: 768px) {
    padding: 0 15px;
    height: 50px;
    gap: 10px;
  }
`;

const VideoMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.6rem;
  color: #fff;
  font-weight: 500;

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
    gap: 10px;
  }
`;

const ChannelInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ChannelAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  background: #eee;
  margin-right: 5px;

  @media screen and (max-width: 768px) {
    width: 35px;
    height: 35px;
  }
`;

const PlayButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 3;

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translate(-50%, -50%) scale(1.1);
  }

  &::after {
    content: "";
    width: 0;
    height: 0;
    border-left: 25px solid #000;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    margin-left: 5px;
  }

  &.playing {
    opacity: 0;
    pointer-events: none;
  }

  &.loading {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const VideoInteractions = styled.div`
  position: absolute;
  right: 15px;
  bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  z-index: 10;

  @media screen and (max-width: 768px) {
    right: 10px;
    bottom: 60px;
    gap: 15px;
  }
`;

const InteractionButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: ${(props) => (props.$active ? "#fff" : "rgba(0, 0, 0, 0.6)")};
  backdrop-filter: blur(10px);
  color: ${(props) => (props.$active ? "#000" : "#fff")};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  position: relative;
  transform: scale(1);

  &:hover {
    background: ${(props) =>
      props.$active ? "#f0f0f0" : "rgba(0, 0, 0, 0.8)"};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  @media screen and (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
`;

const ItemInfoLink = styled.a`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: ${(props) => (props.$active ? "#fff" : "rgba(0, 0, 0, 0.6)")};
  backdrop-filter: blur(10px);
  color: ${(props) => (props.$active ? "#000" : "#fff")};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  position: relative;
  text-decoration: none;
  transform: scale(1);

  &:hover {
    background: ${(props) =>
      props.$active ? "#f0f0f0" : "rgba(0, 0, 0, 0.8)"};
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  @media screen and (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
`;

const InteractionCount = styled.span`
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  color: #fff;
  white-space: nowrap;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.8);
  padding: 2px 8px;
  border-radius: 12px;
  min-width: 24px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);

  @media screen and (max-width: 768px) {
    font-size: 9px;
    padding: 1px 6px;
    bottom: -6px;
  }
`;

const LiteVideoContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  .yt-lite {
    width: 100% !important;
    height: 100% !important;
    border-radius: 10px;
  }

  .yt-lite > iframe {
    border-radius: 10px;
  }
`;

// 🚀 VideoCard 컴포넌트
const VideoCard = React.memo(
  ({
    video,
    index,
    activeIndex,
    useLiteEmbed,
    shouldLoadVideo,
    youtubeOpts,
    videoInteractions,
    handleVideoReady,
    handlePlayVideo,
    handleVideoInteraction,
    handleItemInfoClick,
    handleCommentClick,
    handleShareClick,
  }) => {
    // 🎯 메모이제이션된 핸들러들
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

    const onPlayClick = useCallback(() => {
      handlePlayVideo(video.id);
    }, [handlePlayVideo, video.id]);

    const onVideoReady = useCallback(
      (event) => {
        handleVideoReady(event, video.id);
      },
      [handleVideoReady, video.id]
    );

    return (
      <VideoCardContainer className={activeIndex === index ? "active" : ""}>
        {useLiteEmbed ? (
          <LiteVideoContainer>
            <LiteYouTubeEmbed
              id={video.videoId}
              title={video.title}
              poster="hqdefault"
              noCookie={true}
              activatedClass="activated"
              iframeClass="yt-lite-iframe"
              playerClass="yt-lite-player"
            />
          </LiteVideoContainer>
        ) : (
          <VideoThumbnail>
            <img
              src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
              alt={video.title}
            />
            {shouldLoadVideo(index, video.id) && (
              <YouTube
                videoId={video.videoId}
                opts={youtubeOpts}
                onReady={onVideoReady}
              />
            )}
            <PlayButton onClick={onPlayClick} />
          </VideoThumbnail>
        )}

        <VideoOverlay>
          <VideoInfo>
            <VideoMeta>
              <ChannelInfo>
                <ChannelAvatar src={video.itemInfo} alt={video.channel} />
                <span>{video.keyword?.join(", ")}</span>
              </ChannelInfo>
            </VideoMeta>
          </VideoInfo>
        </VideoOverlay>

        {/* 🎛️ 인터랙션 버튼들 */}
        <VideoInteractions>
          {/* ❤️ 좋아요 버튼 */}
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

          {/* 💬 댓글 버튼 */}
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

          {/* 🛍️ 아이템 정보 버튼 */}
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

          {/* 📤 공유하기 버튼 */}
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
