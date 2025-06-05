import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  color: #fff;
  background: var(--ott-bg-color);
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
  h4 {
    font-size: 11rem;
    font-family: "EHNormalTrial";
    font-weight: 500;
    letter-spacing: -5px;
  }
  p {
    font-size: 2rem;
    font-weight: 300;
    line-height: 1.4;
    b {
      font-weight: 300;
      font-family: "EHNormalTrial";
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
  padding: 40px 3% 0;
  padding-bottom: 60px;
`;

const CarouselContainer = styled.div`
  position: relative;
  padding: 40px 0 40px;
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
`;

const VideoThumbnail = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Short = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  // 더미 비디오 데이터
  const videos = [
    {
      id: 1,
      title: "줄 이어폰 VS 무선 이어폰 이어폰 논쟁?",
      thumbnail:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=600&fit=crop",
      channel: "TechReview",
      likes: "2.5만",
      views: "174만",
      tags: ["#이어폰", "#리뷰", "#기술"],
    },
    {
      id: 2,
      title: "근데 왜? X5 영화처럼 돌아보는",
      thumbnail:
        "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
      channel: "MovieClips",
      likes: "1.8만",
      views: "89만",
      tags: ["#영화", "#액션", "#리뷰"],
    },
    {
      id: 3,
      title: "컴링&컨퍼 케이팝 인기 추측하는 컨퍼",
      thumbnail:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=600&fit=crop",
      channel: "KpopNews",
      likes: "3.2만",
      views: "256만",
      tags: ["#케이팝", "#아이돌", "#음악"],
    },
    {
      id: 4,
      title: "소중한 아이템!",
      thumbnail:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=600&fit=crop",
      channel: "LifeStyle",
      likes: "892",
      views: "45만",
      tags: ["#라이프스타일", "#아이템", "#추천"],
    },
    {
      id: 5,
      title: "VOGUE 화보 촬영 비하인드",
      thumbnail:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400&h=600&fit=crop",
      channel: "FashionTV",
      likes: "5.7만",
      views: "892만",
      tags: ["#패션", "#보그", "#화보"],
    },
  ];

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <Container>
      <Wrapper>
        <TitleSection>
          <MainTitle>
            <Title>zip originals</Title>
            <p>
              "스타들의 It템, 지금 클로즈업!"
              <br />
              <b>zip. Short</b>에서
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
            >
              {videos.map((video, index) => (
                <SwiperSlide key={video.id}>
                  <VideoCard className={activeIndex === index ? "active" : ""}>
                    <VideoThumbnail>
                      <img src={video.thumbnail} alt={video.title} />
                    </VideoThumbnail>
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
