import React, { useState, useRef, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faStar,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart as faHeartRegular,
  faStar as faStarRegular,
} from "@fortawesome/free-regular-svg-icons";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  color: #fff;
  background: var(--ott-bg-color, #000);
  font-family: "Pretendard", sans-serif;
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
`;

const CarouselContainer = styled.div`
  position: relative;
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;

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

const VideoCard = styled.div`
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
    transform: scale(1.05);
  }

  .swiper-slide-active & {
    box-shadow: 0 0 40px rgba(172, 224, 255, 0.4),
      0 0 80px rgba(172, 224, 255, 0.2), 0 0 120px rgba(172, 224, 255, 0.1);
    border: 2px solid rgba(172, 224, 255, 0.3);
  }

  @media screen and (max-width: 768px) {
    width: 280px;
    height: 498px;

    .swiper-slide-active & {
      box-shadow: 0 0 30px rgba(172, 224, 255, 0.4),
        0 0 60px rgba(172, 224, 255, 0.2);
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
  padding: 30px 20px 20px;
  color: white;
  z-index: 2;
`;

const VideoInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  gap: 10px;
  width: 60%;
  background-color: rgba(217, 217, 217, 0.3);
  border-radius: 40px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const VideoMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  font-size: 1.2rem;
  color: #ccc;
`;

const ChannelInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ChannelAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  background: #eee;
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

// VideoInteractions 스타일 수정
const VideoInteractions = styled.div`
  position: absolute;
  right: 15px;
  bottom: 80px;
  display: flex;
  flex-direction: column;
  gap: 20px; // 간격 약간 증가
  z-index: 10;

  @media screen and (max-width: 768px) {
    right: 10px;
    bottom: 60px;
    gap: 15px;
  }
`;

// InteractionButton 스타일 수정
const InteractionButton = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(10px);
  color: ${(props) => {
    if (props.active && props.type === "like") return "#ff3040";
    if (props.active && props.type === "bookmark") return "#ffd700";
    if (props.active && props.type === "share") return "#00d4ff";
    return "#fff";
  }};
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  position: relative;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }

  @media screen and (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
`;

// InteractionCount 스타일을 버튼 안으로 수정
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

const Short = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [loadingVideo, setLoadingVideo] = useState(null);
  const [loadedVideos, setLoadedVideos] = useState(new Set());
  const [shortVideos, setShortVideos] = useState({ originalData: [] });
  // 각 비디오별 인터랙션 상태 관리
  const [videoInteractions, setVideoInteractions] = useState({});
  const [useLiteEmbed, setUseLiteEmbed] = useState(true);
  const swiperRef = useRef(null);
  const playerRefs = useRef({});

  // API 데이터 로드
  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/API/short.json");
        const data = await response.json();
        setShortVideos(data);

        // 각 비디오의 초기 인터랙션 상태 설정
        const initialInteractions = {};
        data.originalData.forEach((video) => {
          initialInteractions[video.id] = {
            liked: false,
            commented: false,
            bookmarked: false,
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

  // YouTube URL에서 video ID 추출하는 함수
  const extractVideoId = (url) => {
    if (!url) return "";

    if (url.length === 11 && !url.includes("/")) {
      return url;
    }

    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : url;
  };

  // API 데이터를 사용하여 YouTube 쇼츠 데이터 생성
  const shortsVideos = shortVideos.originalData.map((video) => ({
    id: video.id,
    videoId: extractVideoId(video.shortUrl),
    title: video.mainTitle,
    keyword: video.keyword,
    itemInfo:
      video.item[0]?.itemImg ||
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
    likes: video.shorts[0]?.like
      ? `${(video.shorts[0].like / 1000).toFixed(1)}만`
      : "2.5만",
    views: `${Math.floor(Math.random() * 500 + 100)}만`,
    description: video.description,
  }));

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

  const handleVideoReady = useCallback((event, videoId) => {
    playerRefs.current[videoId] = event.target;
    setLoadedVideos((prev) => new Set([...prev, videoId]));
    setLoadingVideo(null);
    console.log(`Video ${videoId} is ready to play`);
  }, []);

  const handlePlayVideo = useCallback(
    (videoId) => {
      console.log(`Attempting to play video: ${videoId}`);
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
    },
    [loadingVideo]
  );

  // 비디오별 인터랙션 처리
  const handleVideoInteraction = useCallback((videoId, type) => {
    setVideoInteractions((prev) => ({
      ...prev,
      [videoId]: {
        ...prev[videoId],
        [type]: !prev[videoId]?.[type],
      },
    }));
  }, []);

  const shouldLoadVideo = useCallback(
    (index, videoId) => {
      if (useLiteEmbed) return true;
      const range = 2;
      return Math.abs(index - activeIndex) <= range;
    },
    [activeIndex, useLiteEmbed]
  );

  const youtubeOpts = {
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
  };

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

        <ContentSection>
          <CarouselContainer>
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
                  <VideoCard className={activeIndex === index ? "active" : ""}>
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
                            onReady={(event) =>
                              handleVideoReady(event, video.id)
                            }
                          />
                        )}
                        <PlayButton onClick={() => handlePlayVideo(video.id)} />
                      </VideoThumbnail>
                    )}

                    <VideoOverlay>
                      <VideoInfo>
                        <VideoMeta>
                          <ChannelInfo>
                            <ChannelAvatar
                              src={video.itemInfo}
                              alt={video.channel}
                            />
                            <span>{video.keyword.join(", ")}</span>
                          </ChannelInfo>
                        </VideoMeta>
                      </VideoInfo>
                    </VideoOverlay>

                    {/* 각 비디오의 인터랙션 버튼들 */}
                    <VideoInteractions>
                      <InteractionButton
                        type="like"
                        active={videoInteractions[video.id]?.liked}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVideoInteraction(video.id, "liked");
                        }}
                      >
                        <FontAwesomeIcon
                          icon={
                            videoInteractions[video.id]?.liked
                              ? faHeart
                              : faHeartRegular
                          }
                        />
                        {videoInteractions[video.id]?.liked && (
                          <InteractionCount>2.5만</InteractionCount>
                        )}
                      </InteractionButton>

                      <InteractionButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVideoInteraction(video.id, "commented");
                        }}
                      >
                        <FontAwesomeIcon icon={faComment} />
                        {videoInteractions[video.id]?.commented && (
                          <InteractionCount>174</InteractionCount>
                        )}
                      </InteractionButton>

                      <InteractionButton
                        type="bookmark"
                        active={videoInteractions[video.id]?.bookmarked}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVideoInteraction(video.id, "bookmarked");
                        }}
                      >
                        <FontAwesomeIcon
                          icon={
                            videoInteractions[video.id]?.bookmarked
                              ? faStar
                              : faStarRegular
                          }
                        />
                        {videoInteractions[video.id]?.bookmarked && (
                          <InteractionCount>저장</InteractionCount>
                        )}
                      </InteractionButton>

                      <InteractionButton
                        type="share"
                        active={videoInteractions[video.id]?.shared}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVideoInteraction(video.id, "shared");
                        }}
                      >
                        <FontAwesomeIcon icon={faShare} />
                        {videoInteractions[video.id]?.shared && (
                          <InteractionCount>공유</InteractionCount>
                        )}
                      </InteractionButton>
                    </VideoInteractions>
                  </VideoCard>
                </SwiperSlide>
              ))}
            </Swiper>
          </CarouselContainer>
        </ContentSection>
      </Wrapper>
    </Container>
  );
};

export default Short;
