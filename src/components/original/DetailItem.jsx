import styled from "styled-components";
import CardItem from "../home/CardItem";
import StylePick from "../home/StylePick";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
      width: 50%;
      font-size: 6rem;
      letter-spacing: -2px;
      font-family: "EHNormalTrial";
    }
    & > div {
      width: 50%;
      display: flex;
      flex-direction: column;
      padding-top: 8px;
      & > h5 {
        font-size: 3rem;
        font-weight: 500;
      }
      & > p {
        font-size: 2rem;
        font-weight: 300;
        line-height: 1.8;
        margin: 20px 0 40px;
      }
      & > ul {
        display: flex;
        gap: 10px;
        li {
          padding: 12px 24px;
          border-radius: 50px;
          border: 1px solid var(--light-color);
          font-weight: 400;
        }
      }
    }
    &.item-zip {
      margin-top: 80px;
    }
  }
`;
const CardList = styled.div`
  width: 1100px;
  height: 600px;
  border: 1px solid #f00;
  overflow: hidden;
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
}) => {
  const navigate = useNavigate();

  const [sildeData, setSlideData] = useState([]);

  useEffect(() => {
    fetch("/API/homeData.json")
      .then((response) => response.json())
      .then((data) => setSlideData(data.slideData));
  }, []);
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
          <h4>ZIP scene</h4>
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
            <h5>{characterName}이 사용했을 아이템은?</h5>
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
    </Container>
  );
};

export default DetailItem;
