import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import CardItem from "../home/CardItem";
import RollingBanner from "../home/RollingBanner";
import YouTube from "react-youtube";
/*--- 스와이퍼 ---*/
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const Container = styled.div`
  width: 100%;
  height: 100%;
  letter-spacing: -0.1rem;
  color: var(--light-color);
  text-transform: uppercase;
`;
const TitleSection = styled.section`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  .mainTitle {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    p {
      font-size: 2.6rem;
      font-weight: 300;
    }
    h4 {
      font-size: 6.8rem;
      font-weight: 600;
    }
  }
  .subTitle {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 4%;
    width: 100%;
    padding: 0 3%;
    p {
      font-size: 2.2rem;
      font-weight: 400;
      line-height: 1.4;
      font-weight: 300;
    }
    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      li {
        padding: 12px 24px;
        border-radius: 50px;
        border: 1px solid var(--light-color);
        font-weight: 400;
      }
    }
  }
`;
const ImgSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 0;
  }
`;
const CharaterSection = styled.section`
  width: 100%;
  height: 100%;
  padding: 100px 3%;
  aside {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    & > h4 {
      /* width: 50%; */
      font-size: 6rem;
      letter-spacing: -2px;
      font-family: "EHNormalTrial";
    }
    & > div {
      width: 60%;
      display: flex;
      flex-direction: column;
      padding-top: 8px;
      & > h5 {
        font-size: 3rem;
        font-weight: 500;
        margin-bottom: 30px;
      }
      & > p {
        font-size: 2rem;
        font-weight: 300;
        line-height: 1.8;
        margin-bottom: 20px;
      }
      & > ul {
        display: flex;
        gap: 12px;
        li {
          padding: 12px 24px;
          border-radius: 50px;
          border: 1px solid var(--light-color);
          font-weight: 400;
        }
      }
    }
    &.item-zip {
      margin-top: 120px;
    }
  }
`;
const CardList = styled.div`
  width: 1100px;
  height: 600px;
  overflow: hidden;
`;
const RealStarSection = styled.div`
  width: 100%;
  height: 100%;
  padding: 140px 3%;
  & > .real-title {
    font-size: 6rem;
    font-weight: 600;
    letter-spacing: -1px;
  }
  & > .contents-container {
    display: flex;
    justify-content: space-between;
    margin: 120px 0;
    & > h4 {
      font-size: 6rem;
      letter-spacing: -2px;
      font-family: "EHNormalTrial";
    }
    & > .video-container {
      width: 60%;
      aspect-ratio: 16 / 9;
      .VideoImg {
        width: 100%;
        height: 100%;
        background: #323240;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
`;
const ShortSection = styled.div`
  width: 100%;
  height: 100%;
  & > h4 {
    width: 50%;
    font-size: 6rem;
    letter-spacing: -2px;
    font-family: "EHNormalTrial";
    margin-bottom: 50px;
  }
  & > .shorts-container {
    width: 100%;
    height: 100%;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      gap: 60px;
      li {
        height: 50%;
        flex: 1;
        .thumbnail-info {
          width: 100%;
          height: 100%;
          aspect-ratio: 9 / 16;
          overflow: hidden;
          border-radius: 8px;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border: none;
            background: #868686;
          }
        }
        .short-info {
          margin-top: 20px;
          p {
            width: 100%;
            font-size: 2.8rem;
            font-weight: 500;
            /* margin-bottom: 14px; */
            cursor: pointer;
          }
          div {
            width: 100%;
            height: 1px;
            background: #393939;
            margin: 24px 0 12px;
          }
          span {
            font-size: 1.6rem;
            color: #888888;
            letter-spacing: 0;
          }
        }
      }
    }
  }
`;

const DetailItem = ({
  mainTitle,
  subTitle,
  starName,
  detailImg,
  episode,
  description,
  keyword,
  characterKeyword,
  characterName,
  bagThumbnail,
  shorts,
}) => {
  const navigate = useNavigate();

  const [sildeData, setSlideData] = useState([]);

  useEffect(() => {
    fetch("/API/homeData.json")
      .then((response) => response.json())
      .then((data) => setSlideData(data.slideData));
  }, []);

  console.log("shorts data:", shorts);

  return (
    <Container>
      <TitleSection>
        <div className="mainTitle">
          <p>EP. {episode}</p>
          <h4>{mainTitle}</h4>
        </div>
        <div className="subTitle">
          <p>
            {subTitle} <br />
            {starName}의 가방을 열다
          </p>
          <ul>
            {keyword.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </TitleSection>
      <ImgSection>
        <img src={detailImg} alt={`${starName} 이미지`} />
        <div className="overlay"></div>
      </ImgSection>
      <CharaterSection>
        <aside>
          <h4 className="">ZIP scene</h4>
          <div>
            <h5>{episode}</h5>
            <p>{description}</p>
            <ul>
              {characterKeyword.map((item, index) => (
                <li key={index}># {item}</li>
              ))}
            </ul>
          </div>
        </aside>
        <aside className="item-zip">
          <h4>item ZIP</h4>
          <div>
            <h5>당신도 궁금했던, {characterName}의 리얼템</h5>
            <CardList>
              <Swiper
                slidesPerView={3}
                spaceBetween={200}
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
            </CardList>
          </div>
        </aside>
      </CharaterSection>
      <RollingBanner />
      <RealStarSection>
        <p className="real-title">
          {characterName}이 아닌, 본체 {starName}의 취향은?
        </p>
        <div className="contents-container">
          <h4>bag ZIP</h4>
          <div className="video-container">
            <div className="VideoImg">
              <img src={bagThumbnail} alt={starName} />
            </div>
          </div>
        </div>
        <ShortSection>
          <h4>short ZIP</h4>
          <div className="shorts-container">
            <ul>
              {shorts?.map((item, index) => (
                <li key={index}>
                  <div className="thumbnail-info">
                    <img src={item.shortThumbnail} alt={starName} />
                  </div>
                  <div className="short-info">
                    <p>{item.shortTitle}</p>
                    <div></div>
                    <span>조회수 {item.viewRated.toLocaleString()}회</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </ShortSection>
      </RealStarSection>
    </Container>
  );
};

export default DetailItem;
