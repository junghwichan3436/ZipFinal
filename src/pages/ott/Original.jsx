import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ZipItem from "../../components/original/ZipItem";
// import { Link } from "react-router-dom";

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
    z-index: -1;
  }
`;
const TitleSection = styled.section`
  text-transform: uppercase;
  padding: 0 3%;
  .allZips {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 20px 0 20px;
    .redDot {
      width: 8px;
      height: 8px;
      background: #f00;
      border-radius: 50%;
    }
    span {
      display: inline-block;
      font-size: 2rem;
      font-family: "EHNormalTrial";
      font-weight: 500;
      color: #505050;
      letter-spacing: -1px;
    }
  }
  @media screen and (max-width: 1024px) {
    .allZips {
      gap: 10px;
      margin: 20px 0 20px;
    }
  }
  @media screen and (max-width: 767px) {
    .allZips {
      /* gap: 10px; */
      /* margin: 10px 0 0; */
    }
  }
`;
const MainTitle = styled.div`
  display: flex;
  gap: 30px;
  align-items: end;
  padding-top: 160px;
  padding-bottom: 30px;
  border-bottom: 1px solid #3c3c3c;
  h4 {
    font-size: 7.6rem;
    font-family: "EHNormalTrial";
    font-weight: 500;
    letter-spacing: -6px;
  }
  p {
    font-size: 1.6rem;
    font-weight: 300;
    color: #ababab;
    font-weight: 400;
    line-height: 2rem;
    b {
      font-size: 1.8rem;
      font-weight: 400;
      font-family: "EHNormalTrial";
    }
  }

  @media screen and (max-width: 1094px) {
    padding-top: 140px;
    padding-bottom: 20px;
    gap: 20px;
    flex-direction: column-reverse;
    flex-direction: column;
    align-items: start;
    h4 {
      /* font-size: 7rem; */
      letter-spacing: -2px;
    }
    br {
      display: none;
    }
    p {
      font-size: 1.8rem;

      /* line-height: 1.4; */
      b {
        font-size: 1.7rem;
      }
    }
  }
  @media screen and (max-width: 978px) {
    gap: 20px;
    padding-top: 120px;
    padding-bottom: 20px;
    h4 {
      /* font-size: 7rem; */
      letter-spacing: -2px;
    }
    p {
      /* font-size: 1.3rem; */
      /* line-height: 1.4; */
      b {
        /* font-size: 1.4rem; */
      }
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
  @media screen and (max-width: 520px) {
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
  padding-bottom: 100px;
  /* gap: 40px; */
  @media screen and (max-width: 1024px) {
    flex-direction: column;
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
      <TitleSection>
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
              staticThumbnail={item.staticThumbnail}
              subTitle={item.subTitle}
              mainTitle={item.mainTitle}
              bagThumbnail={item.bagThumbnail}
              shorts={item.shorts}
            />
          ))}
        </ZipList>
      </section>
    </Container>
  );
};

export default Original;
