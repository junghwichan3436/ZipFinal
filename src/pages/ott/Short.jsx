import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import YouTube from "react-youtube";
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
  }
`;

const VideoCard = styled.div`
  background: #111;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 458px;
  height: 814px;
  position: relative;
  border: 2px solid transparent;
  margin: 0 auto;

  &:hover {
    transform: scale(1.05);
  }

  &.active {
    border: 2px solid #00ff88;
    box-shadow: 0 0 30px rgba(0, 255, 136, 0.3);
  }

  @media screen and (max-width: 768px) {
    width: 280px;
    height: 498px;
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
  flex-direction: column;
  gap: 10px;
`;

const VideoTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.3;
  margin: 0;

  @media screen and (max-width: 768px) {
    font-size: 1.2rem;
  }
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
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const VideoStats = styled.div`
  display: flex;
  gap: 15px;
  font-size: 1.1rem;
  color: #999;
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
`;

const Short = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [playingVideo, setPlayingVideo] = useState(null);
  const swiperRef = useRef(null);
  const playerRefs = useRef({});

  // YouTube Shorts 스타일 비디오 데이터 (실제 YouTube 영상 ID 사용)
  const shortsVideos = [
    {
      id: 1,
      videoId: "zXY34suZHjI", //
      title: "모기 퇴치 아이템",
      channel: "vogue",
      channelAvatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      likes: "2.5만",
      views: "174만",
      description: "모기 잘물리는 차주영의 꿀 tip",
    },
    {
      id: 2,
      videoId: "xj0qCdS4kO8", //
      title: "구취에 강력한 가글 정보",
      channel: "MovieClips",
      channelAvatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      likes: "1.8만",
      views: "89만",
      description: "대성 it's item",
    },
    {
      id: 3,
      videoId: "T8sU80IMGfU", // PSY - GANGNAM STYLE (예시)
      title: "정은채가 꾸준히 물에 타 먹는 이것!!",
      channel: "KpopNews",
      channelAvatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b784?w=50&h=50&fit=crop&crop=face",
      likes: "3.2만",
      views: "256만",
      description: "정은채가 3개월째 물에 타먹는 영양제",
    },
    {
      id: 4,
      videoId: "BUre6sJUICE",
      title: "비염인들 참고하세요요!",
      channel: "LifeStyle",
      channelAvatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      likes: "892",
      views: "45만",
      description: "로제, 산다라박, 송은이가 평소에 쓰는 비염아이템",
    },
    {
      id: 5,
      videoId: "t5yU0l255c4",
      title: "류진이 3개째 쓰는 막걸리 팩",
      channel: "FashionTV",
      channelAvatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&h=50&fit=crop&crop=face",
      likes: "5.7만",
      views: "892만",
      description: "류진이 일본갈때 돈키호테에서 꼭 사오는 막걸리 팩",
    },
  ];

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
    // 슬라이드 변경 시 모든 비디오 정지
    Object.values(playerRefs.current).forEach((player) => {
      if (player && player.stopVideo) {
        player.stopVideo();
      }
    });
    setPlayingVideo(null);
  };

  const handleVideoReady = (event, videoId) => {
    playerRefs.current[videoId] = event.target;
  };

  const handlePlayVideo = (videoId) => {
    // 다른 비디오들 정지
    Object.entries(playerRefs.current).forEach(([id, player]) => {
      if (id !== videoId.toString() && player && player.stopVideo) {
        player.stopVideo();
      }
    });

    // 선택된 비디오 재생
    const player = playerRefs.current[videoId];
    if (player && player.playVideo) {
      player.playVideo();
      setPlayingVideo(videoId);
    }
  };

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
                    <VideoThumbnail
                      className={playingVideo === video.id ? "playing" : ""}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                        alt={video.title}
                        onError={(e) => {
                          e.target.src = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
                        }}
                      />
                      <YouTube
                        videoId={video.videoId}
                        opts={youtubeOpts}
                        onReady={(event) => handleVideoReady(event, video.id)}
                      />
                      <PlayButton
                        className={playingVideo === video.id ? "playing" : ""}
                        onClick={() => handlePlayVideo(video.id)}
                      />
                    </VideoThumbnail>

                    <VideoOverlay>
                      <VideoInfo>
                        <VideoTitle>{video.title}</VideoTitle>
                        <VideoMeta>
                          <ChannelInfo>
                            <ChannelAvatar
                              src={video.channelAvatar}
                              alt={video.channel}
                            />
                            <span>{video.channel}</span>
                          </ChannelInfo>
                        </VideoMeta>
                        <VideoStats>
                          <span>❤️ {video.likes}</span>
                          <span>👁️ {video.views}</span>
                        </VideoStats>
                      </VideoInfo>
                    </VideoOverlay>
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
