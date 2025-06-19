import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import ZipItem from "../../components/original/ZipItem";

const rec = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
`;
// 스타일 정의
const Container = styled.div`
  width: 100%;
  height: 100%;
  color: #fff;
  &::before {
    content: "";
    padding: 0;
    background: #0e100f
      url("https://cdn.prod.website-files.com/66830a26921cfac79c4c2c9c/668fa5303a4db2a0e1253a6f_bg.png") center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    filter: brightness(0.2) contrast(1.1);
    z-index: -2;
  }
`;
const TitleSection = styled.section`
  text-transform: uppercase;
  padding: 3%;
  .allZips {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 20px 0 0px;
    .redDot {
      width: 10px;
      height: 10px;
      background: #f00;
      border-radius: 50%;
      animation: ${rec} 2s infinite;
    }
    span {
      display: inline-block;
      display: flex;
      font-size: 2rem;
      font-family: "EHNormalTrial";
      font-weight: 500;
      color: #505050;
      letter-spacing: -1px;
    }
  }
  @media screen and (max-width: 1024px) {
    padding: 0 3%;
    .allZips {
      .redDot {
        width: 8px;
        height: 8px;
      }
      gap: 10px;
      margin: 12px 0 30px;
      span {
        font-size: 1.4rem;
      }
    }
  }
  @media screen and (max-width: 767px) {
  }
`;
const MainTitle = styled.div`
  display: flex;
  gap: 30px;
  align-items: end;
  padding-top: 100px;
  padding-bottom: 20px;
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
    padding-bottom: 20px;
    gap: 20px;
    flex-direction: column-reverse;
    flex-direction: column;
    align-items: start;
    h4 {
      font-size: 5rem;
      letter-spacing: -2px;
    }
    br {
      display: none;
    }
    p {
      font-size: 1.6rem;
      b {
        font-size: 1.6rem;
      }
    }
  }
  @media screen and (max-width: 767px) {
    gap: 20px;
    padding-top: 80px;
    padding-bottom: 20px;
    h4 {
      letter-spacing: -2px;
    }
  }
  @media screen and (max-width: 767px) {
    gap: 18px;
    h4 {
      font-size: 5rem;
    }
    p {
      font-weight: 400;
      font-size: 1.6rem;
      b {
        font-size: 1.6rem;
        font-weight: 400;
      }
    }
  }
  @media screen and (max-width: 767px) {
    h4 {
      font-size: 4rem;
    }
    p {
      font-size: 1.4rem;
      b {
        font-size: 1.4rem;
      }
    }
  }
`;

const ZipList = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 3%;
  letter-spacing: -0.2px;
  padding-bottom: 30px;
  li {
    width: 49%;
  }
  @media screen and (max-width: 767px) {
    flex-direction: column;
    padding: 0 6%;
    li {
      width: 100%;
      margin-bottom: 40px;
    }
  }
`;

/*--- 출력 ---*/
const Original = () => {
  const [originalData, setOriginaldata] = useState([]);

  useEffect(() => {
    fetch("/API/originalData.json")
      .then((response) => response.json())
      .then((data) => setOriginaldata(data.originalData));
  }, []);

  return (
    <Container>
      <TitleSection animate={true}>
        <MainTitle>
          <h4>zip originals</h4>
          <p>
            당신이 사랑한 캐릭터, 그들이 고를 법한 아이템
            <br />
            <b> zip original</b>에서
          </p>
        </MainTitle>
        <div className="allZips">
          <div className="redDot"></div>
          <span>all zips [6]</span>
        </div>
      </TitleSection>
      <section>
        <ZipList>
          {originalData?.map((item, index) => (
            <ZipItem
              id={item.id}
              key={index}
              onClick={() => navigate(`/ott/originalDetail/${item.id}`)}
              thumbnail={item.thumbnail}
              staticThumbnail={item?.staticThumbnail}
              subTitle={item.subTitle}
              mainTitle={item.mainTitle}
              bagThumbnail={item.bagThumbnail}
              shorts={item.shorts}
              starName={item.starName}
            />
          ))}
        </ZipList>
      </section>
    </Container>
  );
};

export default Original;
