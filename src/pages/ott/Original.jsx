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
  span {
    display: inline-block;
    font-size: 2.6rem;
    font-family: "EHNormalTrial";
    font-weight: 500;
    margin: 20px 0 40px;
  }
`;
const MainTitle = styled.div`
  display: flex;
  gap: 40px;
  align-items: end;
  padding-top: 180px;
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
const ZipList = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 3%;
  letter-spacing: -0.2px;
  padding-bottom: 100px;
  /* gap: 40px; */
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
            <b>zip original</b>에서
          </p>
        </MainTitle>
        <span>all zips(6)</span>
      </TitleSection>
      <section>
        <ZipList>
          {originalData?.map((item, index) => (
            <ZipItem
              id={item.id}
              key={index}
              onClick={() => navigate(`/ott/originalDetail/${item.id}`)}
              thumbnail={item.thumbnail}
              subTitle={item.subTitle}
              mainTitle={item.mainTitle}
            />
          ))}
        </ZipList>
      </section>
    </Container>
  );
};

export default Original;
