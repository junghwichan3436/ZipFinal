import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
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

  @media screen and (max-width: 1024px) {
    height: 50vh;
    .mainTitle {
      gap: 20px;
      p {
        font-size: 2rem;
      }
      h4 {
        font-size: 5rem;
      }
    }
    .subTitle {
      p {
        font-size: 1.6rem;
        line-height: 1.6;
      }
      ul {
        li {
          padding: 10px 20px;
          font-size: 1.4rem;
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    height: 40vh;
    .mainTitle {
      gap: 10px;
      p {
        font-size: 1.6rem;
      }
      h4 {
        font-size: 4rem;
      }
    }
    .subTitle {
      p {
        font-size: 1.2rem;
        line-height: 1.4;
      }
      ul {
        gap: 6px;
        li {
          padding: 8px 14px;
          font-size: 1rem;
        }
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
  @media screen and (max-width: 1024px) {
    height: 50vh;
  }
  @media screen and (max-width: 767px) {
    height: 40vh;
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

  @media screen and (max-width: 1024px) {
    padding-top: 60px;
    padding: 60px 3%;
    aside {
      & > h4 {
        font-size: 4rem;
      }
      & > div {
        width: 65%;
        padding-top: 4px;
        & > h5 {
          font-size: 3rem;
          margin-bottom: 20px;
        }
        & > p {
          font-size: 1.6rem;
          margin-bottom: 14px;
        }
        & > ul {
          gap: 8px;
          li {
            padding: 10px 20px;
            font-size: 1.2rem;
          }
        }
      }
      &.item-zip {
        margin-top: 80px;
      }
    }
    @media screen and (max-width: 767px) {
      padding: 40px 3%;
      aside {
        & > h4 {
          font-size: 3rem;
        }
        & > div {
          width: 60%;
          padding-top: 2px;
          & > h5 {
            font-size: 2rem;
            margin-bottom: 14px;
          }
          & > p {
            font-size: 1.2rem;
            margin-bottom: 10px;
          }
          & > ul {
            gap: 4px;
            li {
              padding: 8px 12px;
              font-size: 1rem;
            }
          }
        }
        &.item-zip {
          margin-top: 40px;
        }
      }
    }
  }
`;
const CardList = styled.div`
  width: 1100px;
  height: 600px;
  overflow: hidden;
  @media screen and (max-width: 1024px) {
    height: 500px;
  }
  @media screen and (max-width: 767px) {
    height: 400px;
  }
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
        /* background: #323240; */
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
  @media screen and (max-width: 1024px) {
    padding: 60px 3%;
    & > .real-title {
      font-size: 4rem;
    }
    & > .contents-container {
      margin: 60px 0;
      & > h4 {
        font-size: 4rem;
      }
      & > .video-container {
        width: 65%;
      }
    }
  }
  @media screen and (max-width: 767px) {
    padding: 60px 3%;
    & > .real-title {
      font-size: 3rem;
    }
    & > .contents-container {
      margin: 40px 0;
      & > h4 {
        font-size: 3rem;
      }
      & > .video-container {
        width: 60%;
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
            /* background: #868686; */
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
            /* background: #393939; */
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
  @media screen and (max-width: 1024px) {
    & > h4 {
      width: 50%;
      font-size: 4rem;
      margin-bottom: 30px;
    }
    & > .shorts-container {
      ul {
        gap: 20px;
        display: flex;
        /* flex-direction: column; */
        flex-wrap: wrap;
        li {
          height: 100%;
          .short-info {
            margin-top: 14px;
            p {
              font-size: 1.8rem;
              line-height: 1.5;
            }
            div {
              width: 100%;
              margin: 10px 0 6px;
            }
            span {
              font-size: 1.2rem;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 767px) {
    & > h4 {
      font-size: 3rem;
      margin-bottom: 20px;
    }
    & > .shorts-container {
      ul {
        gap: 10px;
        li {
          .short-info {
            margin-top: 10px;
            p {
              font-size: 1.6rem;
              line-height: 1.4;
            }
            div {
              width: 100%;
              margin: 10px 0 6px;
            }
            span {
              font-size: 1rem;
            }
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

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      mute: 1,
      loop: 1,
      controls: 0, // 컨트롤 바 숨기기
      modestbranding: 1, // 유튜브 로고 최소화
      rel: 0, // 관련 영상 숨기기
      fs: 0, // 전체화면 버튼 숨기기
      disablekb: 1, // 키보드 제어 비활성화
      showinfo: 0, // 제목 숨기기 시도 (현재는 거의 안 먹힘)
      autoplay: 1, // 자동재생
      enablejsapi: 1, // JS API 활성화
    },
  };

  const VideoRef = useRef(null);

  const handleReady = (event) => {
    // event.target은 YT.Player 인스턴스
    VideoRef.current = event.target;
  };
  const VideoPlay = (e) => {
    if (VideoRef.current) {
      e.target.style.opacity = 0;
      VideoRef.current.stopVideo();
      VideoRef.current.playVideo();
    }
  };
  const VideoStop = (e) => {
    if (VideoRef.current) {
      e.target.style.opacity = 1;
      VideoRef.current.stopVideo();
    }
  };

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
            {/* <div className="VideoImg" onMouseEnter={VideoPlay} onMouseLeave={VideoStop}> */}
            <div className="VideoImg">
              <img src={bagThumbnail} alt={starName} />
              <YouTube videoId="5BRaRTjCPT0" opts={opts} onReady={handleReady} />
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
