import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardItem from "./CardItem";
/*--- 스와이퍼 ---*/
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/pagination";

/*--- 스타일 ---*/
const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #000;
  color: #fff;
  margin-top: 120px;
  position: relative;
  .swiper {
    width: 100%;
    margin: 120px 0 180px 0;
    .swiper-wrapper {
      width: 100%;
      height: 100%;
      margin-right: 0;
      .swiper-slide {
        margin-right: 0;
        flex-shrink: 1;
      }
    }
    @media screen and (max-width: 1024px) {
      margin: 80px 0 100px 0;
    }
    @media screen and (max-width: 767px) {
      margin: 50px 0 80px 0;
    }
  }

  @media screen and (max-width: 1024px) {
    margin-top: 0px;
  }
`;
const MainTitle = styled.div`
  display: flex;
  padding: 100px 3% 0px;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 767px) {
    padding: 50px 3% 0;
  }
`;
const Title = styled.h2`
  color: var(--light-color);
  font-size: 10rem;
  font-family: "EHNormalTrial";
  font-weight: 500;
  @media screen and (max-width: 1024px) {
    font-size: 7rem;
    font-weight: 500;
  }
  @media screen and (max-width: 768px) {
    padding: 0;
    font-size: 5rem;
    letter-spacing: -2px;
  }
`;
const Button = styled.button`
  font-size: 2rem;
  padding: 22px 50px;
  color: var(--dark-color);
  background: var(--light-color);
  font-family: "EHNormalTrial";
  font-weight: 700;
  text-transform: uppercase;
  border: none;
  outline: none;
  cursor: pointer;

  @media screen and (max-width: 1024px) {
    font-size: 1.6rem;
    padding: 20px 40px;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.2rem;
    padding: 16px 24px;
  }
`;

/*--- 출력 ---*/
export default function StylePick() {
  const navigate = useNavigate();

  const [sildeData, setSlideData] = useState([]);

  useEffect(() => {
    fetch("/API/homeData.json")
      .then((response) => response.json())
      .then((data) => setSlideData(data.slideData));
  }, []);

  return (
    <Container>
      <MainTitle>
        <Title>Style ZIP</Title>
        <Button onClick={() => navigate("/filtercategory/style")}>More Zip</Button>
      </MainTitle>
      <Swiper
        slidesPerView={4}
        spaceBetween={400}
        loop={true}
        loopedSlides={8}
        modules={[]}
        style={{ overflow: "visible" }}
        className="swiper"
      >
        {sildeData?.map((item, index) => (
          <SwiperSlide key={index}>
            <CardItem subtitle={item.subtitle} title={item.title} img={item.img} detailURL={item.detailURL} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
