import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

/*--- 스타일 ---*/
const Container = styled.section`
  text-transform: uppercase;
  width: 100%;
  height: 400px;
  background: var(--dark-color);
  color: var(--light-color);
  display: grid;
  grid-template-columns: repeat(12, 1fr);

  @media screen and (max-width: 1024px) {
    height: 100%;
    height: 500px;
    display: flex;
    flex-direction: column;
  }
  @media screen and (max-width: 768px) {
    height: 400px;
  }
`;
const Title = styled.article`
  padding: 6%;
  font-size: 6rem;
  line-height: 7rem;
  grid-column: 1 / span 5;
  display: flex;
  flex-direction: column;
  h2 {
    font-family: "EHNormalTrial";
  }
  p {
    font-size: 2rem;
    color: var(--subTitle);
  }

  @media screen and (max-width: 1024px) {
    padding: 6% 3% 0;
    margin-top: 0%;
    font-size: 5rem;
    line-height: 6rem;
    br {
      display: none;
    }
  }
  @media screen and (max-width: 767px) {
    font-size: 3.6rem;
    line-height: 6rem;
    p {
      font-size: 1.6rem;
      color: var(--subTitle);
    }
  }
`;
const CardWrapper = styled.ul`
  padding: 6% 3%;
  grid-column: 6 / span 7;
  gap: 14px;
  overflow: hidden;
  display: flex;
`;
const CardItem = styled.li`
  position: relative;
  flex: 1;
  overflow: hidden;
  background: var(--light-color);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  &:hover img {
    transform: scale(1.1);
    filter: blur(2px);
  }

  .text-overlay {
    position: absolute;
    bottom: -100%;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 30px;
    background: rgba(0, 0, 0, 0.6);
    color: var(--light-color);
    transition: all 0.5s ease;
    h3 {
      color: var(--lightGray);
    }
    p {
      font-size: 2rem;
      font-weight: 600;
      line-height: 2.6rem;
      margin: 8px 0 20px;
    }
    span {
      color: var(--lightGray);
      font-weight: 300;
      display: block;
    }
  }

  &:hover .text-overlay {
    bottom: 0;
  }

  @media screen and (max-width: 1024px) {
    .text-overlay {
      p {
        font-size: 2rem;
        line-height: 2.6rem;
        margin: 12px 0 30px;
      }
    }
  }
  @media screen and (max-width: 767px) {
    .text-overlay {
      padding: 20px;
      h3 {
        font-size: 1.2rem;
      }
      p {
        font-size: 1.8rem;
        line-height: 2.4rem;
        margin: 12px 0 12px;
      }
      span {
        margin-bottom: 16px;
        font-size: 1.4rem;
      }
    }
  }
`;
const Button = styled.button`
  font-size: 1.2rem;
  padding: 12px 20px;
  background: var(--light-color);
  color: var(--dark-color);
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  font-family: "EHNormalTrial";
  font-weight: 700;
  margin-top: 90px;

  @media screen and (max-width: 1024px) {
    margin-top: 30px;
    font-size: 1rem;
    padding: 10px 20px;
  }
  @media screen and (max-width: 767px) {
    margin-top: 10px;
    font-size: 1rem;
    padding: 6px 10px;
  }
`;

/*--- 출력 ---*/
const SlideBanner = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Title>
        <h2>
          Weekly <br />
          New Product
        </h2>
        <p>새로나온 NEW ZIP 컨텐츠를 만나보세요</p>
      </Title>
      <CardWrapper>
        <CardItem>
          <img
            src="https://lelabokorea-java.s3.amazonaws.com/images/skus/P015075100__PRODUCT_01--IMG_1200--HANDPOMADE-2103394370.jpg"
            alt=""
          />
          <div className="text-overlay">
            <h3>lelabo</h3>
            <p>핸드 포마드 히노키 55ml</p>
            <span>KRW {Number(39000).toLocaleString("ko-KR")}</span>
            <Button onClick={() => navigate("/detail/핸드 포마드 히노키 55ml")}>view more</Button>
          </div>
        </CardItem>
        <CardItem>
          <img
            src="https://img.ssfshop.com/cmd/LB_750x1000/src/https://img.ssfshop.com/goods/ECBR/25/03/11/GM0025031104710_1_THNAIL_ORGINL_20250314184248405.jpg"
            alt=""
          />
          <div className="text-overlay">
            <h3>AMI</h3>
            <p>아미 볼 캡</p>
            <span>KRW {Number(39000).toLocaleString("ko-KR")}</span>
            <Button onClick={() => navigate("/detail/아미 볼 캡")}>view more</Button>
          </div>
        </CardItem>
        <CardItem>
          <img
            src="https://www.elle.co.kr/resources_old/online/org_online_image/el/b56beedb-798b-4e66-ba98-3674bdebacfb.jpg"
            alt=""
          />
          <div className="text-overlay">
            <h3>chanel</h3>
            <p>르 리프트 라 크렘 망 핸드크림</p>
            <span>KRW {Number(39000).toLocaleString("ko-KR")}</span>
            <Button onClick={() => navigate("/detail/르 리프트 라 크렘 망 핸드 크림")}>view more</Button>
          </div>
        </CardItem>
      </CardWrapper>
    </Container>
  );
};

export default SlideBanner;
