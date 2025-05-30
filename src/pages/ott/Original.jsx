import React from "react";
import styled from "styled-components";

// 스타일 정의
const Container = styled.div`
  width: 100%;
  height: 100%;
  color: #fff;
  /* letter-spacing: -0.3px; */
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
const ZipList = styled.ul`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0 3%;
  /* gap: 40px; */
`;
const ZipItem = styled.li`
  /* box-shadow: 10px 10px 5px white inset; */
  padding-bottom: 40px;
  border-bottom: 1px solid #3c3c3c;
  width: 47%;
  margin-bottom: 100px;
  .img_container {
    height: 480px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  p {
    font-size: 4rem;
    font-weight: 600;
    margin-top: 30px;
  }
  span {
    display: inline-block;
    font-size: 2rem;
    font-weight: 300;
    margin: 20px 0 40px;
  }
  .keword {
    display: flex;
    gap: 10px;
    /* color: #a0a0a0; */
    li {
      /* font-weight: 300; */
      font-size: 1.4rem;
      padding: 12px 24px;
      border: 1px solid #585858;
      border-radius: 30px;
    }
  }
`;
const Overlay = styled.div`
  position: relative;
  top: 0;
  left: 0;
`;
const mockData = {};

const Original = () => {
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
          <ZipItem>
            <Overlay></Overlay>
            <div className="img_container">
              <img
                src="https://i.namu.wiki/i/zHUM_5GhB_UKBcTEdwOIDexh5u9vGUNwYcm0O_hnedk2sX94et5ECiKYj7UTEzdmxt7LYr1hcaEExmsPP2Ya6w.gif"
                alt="강새벽"
              />
            </div>
            <p>강새벽의 생존 가방</p>
            <span>말은 없어도, 필요한 건 다 챙기는 사람</span>
            <ul className="keword">
              <li>#오징어게임</li>
              <li>#강새벽</li>
              <li>#정호연</li>
            </ul>
          </ZipItem>
          <ZipItem>
            <div className="img_container">
              <img src="https://blog.kakaocdn.net/dn/bJFizW/btrsQrcaFoy/2uW9icruTumlPzLSpoGv2K/img.gif" alt="강새벽" />
            </div>
            <p>강새벽의 생존 가방</p>
            <span>말은 없어도, 필요한 건 다 챙기는 사람</span>
            <ul className="keword">
              <li>#오징어게임</li>
              <li>#강새벽</li>
              <li>#정호연</li>
            </ul>
          </ZipItem>
          <ZipItem>
            <div className="img_container">
              <img
                src="https://i.namu.wiki/i/zHUM_5GhB_UKBcTEdwOIDexh5u9vGUNwYcm0O_hnedk2sX94et5ECiKYj7UTEzdmxt7LYr1hcaEExmsPP2Ya6w.gif"
                alt="강새벽"
              />
            </div>
            <p>강새벽의 생존 가방</p>
            <span>말은 없어도, 필요한 건 다 챙기는 사람</span>
            <ul className="keword">
              <li>#오징어게임</li>
              <li>#강새벽</li>
              <li>#정호연</li>
            </ul>
          </ZipItem>
          <ZipItem>
            <div className="img_container">
              <img
                src="https://i.namu.wiki/i/zHUM_5GhB_UKBcTEdwOIDexh5u9vGUNwYcm0O_hnedk2sX94et5ECiKYj7UTEzdmxt7LYr1hcaEExmsPP2Ya6w.gif"
                alt="강새벽"
              />
            </div>
            <p>강새벽의 생존 가방</p>
            <span>말은 없어도, 필요한 건 다 챙기는 사람</span>
            <ul className="keword">
              <li>#오징어게임</li>
              <li>#강새벽</li>
              <li>#정호연</li>
            </ul>
          </ZipItem>
          <ZipItem>
            <div className="img_container">
              <img
                src="https://i.namu.wiki/i/zHUM_5GhB_UKBcTEdwOIDexh5u9vGUNwYcm0O_hnedk2sX94et5ECiKYj7UTEzdmxt7LYr1hcaEExmsPP2Ya6w.gif"
                alt="강새벽"
              />
            </div>
            <p>강새벽의 생존 가방</p>
            <span>말은 없어도, 필요한 건 다 챙기는 사람</span>
            <ul className="keword">
              <li>#오징어게임</li>
              <li>#강새벽</li>
              <li>#정호연</li>
            </ul>
          </ZipItem>
          <ZipItem>
            <div className="img_container">
              <img
                src="https://i.namu.wiki/i/zHUM_5GhB_UKBcTEdwOIDexh5u9vGUNwYcm0O_hnedk2sX94et5ECiKYj7UTEzdmxt7LYr1hcaEExmsPP2Ya6w.gif"
                alt="강새벽"
              />
            </div>
            <p>강새벽의 생존 가방</p>
            <span>말은 없어도, 필요한 건 다 챙기는 사람</span>
            <ul className="keword">
              <li>#오징어게임</li>
              <li>#강새벽</li>
              <li>#정호연</li>
            </ul>
          </ZipItem>
        </ZipList>
      </section>
    </Container>
  );
};

export default Original;
