import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import styled from "styled-components";

const Container = styled.div`
  .swiper {
    .swiper-wrapper {
      width: 100% !important;
      .swiper-slide {
        height: calc(100vh - 60px) !important;
        &:nth-child(1) {
        }
        &:nth-child(2) {
        }
        &:nth-child(3) {
        }
        &:nth-child(4) {
        }
      }
    }
  }
  @media screen and (max-width: 1024px) {
    .swiper {
      .swiper-wrapper {
        .swiper-slide {
          width: 100% !important;
          height: 100% !important;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          &:nth-child(1) {
          }
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
  }
`;
const DisableSwiper = styled.div`
  width: 100%;
`;

const DisableContent = styled.div`
  width: 100%;
  height: calc(100vh - 60px) !important;
  img {
    width: 100%;
    object-fit: cover;
    height: 100%;
  }
  &:nth-child(1) {
  }
  &:nth-child(2) {
  }
`;

const DetailSwiper = ({ enabled, product }) => {
  console.log(product);
  return (
    <Container>
      {enabled ? (
        <Swiper slidesPerView={1}>
          <SwiperSlide>
            <img src={product.detailImg.img01} alt="img01" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={product.detailImg.img02} alt="img02" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={product.detailImg.img03} alt="img03" />
          </SwiperSlide>
        </Swiper>
      ) : (
        <DisableSwiper>
          <DisableContent>
            <img src={product.detailImg.img01} alt="img01" />
          </DisableContent>
          <DisableContent>
            <img src={product.detailImg.img02} alt="img02" />
          </DisableContent>
          <DisableContent>
            <img src={product.detailImg.img03} alt="img03" />
          </DisableContent>
        </DisableSwiper>
      )}
    </Container>
  );
};

export default DetailSwiper;
