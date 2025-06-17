import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import CardItem from "../home/CardItem";
import RollingBanner from "../home/RollingBanner";
import YouTube from "react-youtube";
/*--- 스와이퍼 ---*/
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/effect-fade";
// import "swiper/css/navigation";

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
    gap: 20px;
    p {
      font-size: 2.2rem;
      font-weight: 300;
    }
    h4 {
      font-size: 5rem;
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
      font-size: 2rem;
      font-weight: 400;
      line-height: 1.4;
      font-weight: 400;
    }
    ul {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;

      li {
        padding: 10px 20px;
        border-radius: 50px;
        border: 1px solid var(--light-color);
        font-weight: 400;
      }
    }
  }

  @media screen and (max-width: 1024px) {
    height: 50vh;
    .mainTitle {
      gap: 14px;
      p {
        font-size: 2rem;
      }
      h4 {
        font-size: 4rem;
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
          font-size: 1.2rem;
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
        font-size: 3rem;
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
    background: rgba(0, 0, 0, 0.6);
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
  padding: 80px 3% 0;
  aside {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    & > h4 {
      /* width: 50%; */
      font-size: 4rem;
      letter-spacing: -2px;
      font-family: "EHNormalTrial";
    }
    & > div {
      & > h5 {
        font-size: 2.4rem;
        font-weight: 500;
      }
      width: 70%;
      display: flex;
      flex-direction: column;
      padding-top: 8px;

      & > p {
        font-size: 1.6rem;
        font-weight: 300;
        line-height: 1.8;
        margin: 20px 0;
      }
      & > ul {
        display: flex;
        gap: 12px;
        li {
          padding: 10px 20px;
          border-radius: 50px;
          border: 1px solid var(--light-color);
          font-weight: 400;
          font-size: 1.2rem;
        }
      }
    }
    &.item-zip {
      margin-top: 80px;
    }
  }

  @media screen and (max-width: 1024px) {
    padding-top: 60px;
    padding: 60px 3%;
    aside {
      & > h4 {
        font-size: 3.2rem;
      }
      & > div {
        width: 70%;
        padding-top: 4px;
        & > h5 {
          font-size: 2.2rem;
        }
        & > p {
          font-size: 1.2rem;
        }
        & > ul {
          /* gap: 8px; */
          li {
            padding: 8px 14px;
            font-size: 1rem;
          }
        }
      }
      &.item-zip {
        margin-top: 60px;
      }
    }
    @media screen and (max-width: 767px) {
      padding: 40px 3%;
      width: 100%;
      aside {
        width: 100%;
        flex-direction: column;
        & > h4 {
          width: 100%;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid #424242;
          font-size: 3rem;
        }
        & > div {
          width: 100%;
          & > h5 {
            font-size: 2rem;
          }
          & > p {
            font-size: 1.2rem;
            margin: 18px 0;
          }
        }
      }
    }
  }
`;
const CardList = styled.div`
  width: 100%;
  height: 580px;
  margin-top: 30px;
  overflow: hidden;
  .swiper {
    width: 100%;
    .swiper-wrapper {
      width: 100%;
      height: 100%;
      margin-right: 0;
      display: flex;
      .swiper-slide {
        margin-right: 0;
      }
    }
    @media screen and (max-width: 1024px) {
      /* margin: 80px 0 100px 0; */
    }
    @media screen and (max-width: 767px) {
      /* margin: 50px 0 80px 0; */
    }
  }

  @media screen and (max-width: 1200px) {
    height: 450px;
  }
  @media screen and (max-width: 767px) {
    height: 340px;
  }
`;
const RealStarSection = styled.div`
  width: 100%;
  height: 100%;
  padding: 80px 3%;
  & > .real-title {
    font-size: 4.6rem;
    font-weight: 600;
    letter-spacing: -1px;
  }
  & > .contents-container {
    display: flex;
    justify-content: space-between;
    margin: 60px 0;
    & > h4 {
      /* width: 36%; */
      font-size: 4rem;
      letter-spacing: -2px;
      font-family: "EHNormalTrial";
    }
    & > .video-container {
      /* width: 600px; */
      width: 70%;
      /* aspect-ratio: 16 / 9; */
      cursor: pointer;
      overflow: hidden;
      /* position: relative; */
      border-radius: 6px;
      .videoImg {
        width: 100%;
        height: 100%;
        aspect-ratio: 16 / 9;
        overflow: hidden;
        position: relative;
        img {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: opacity 0.3s ease;
          z-index: 2;
        }
        iframe {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  @media screen and (max-width: 1024px) {
    padding: 60px 3%;
    & > .real-title {
      font-size: 3.6rem;
    }
    & > .contents-container {
      margin: 50px 0;
      & > h4 {
        font-size: 3.2rem;
        width: 40%;
      }
      & > .video-container {
        /* background: #00f; */
        /* width: 65%; */
      }
    }
  }
  @media screen and (max-width: 767px) {
    padding: 60px 3%;
    & > .real-title {
      font-size: 3rem;
    }
    & > .contents-container {
      flex-direction: column;
      margin: 40px 0;
      & > h4 {
        width: 100%;
        font-size: 3rem;
        margin-bottom: 30px;
        padding-bottom: 18px;
        border-bottom: 1px solid #424242;
      }
      & > .video-container {
        width: 100%;
      }
    }
  }
`;
const ShortSection = styled.div`
  width: 100%;
  height: 100%;
  & > h4 {
    /* width: 50%; */
    width: 100%;
    font-size: 4rem;
    letter-spacing: -2px;
    font-family: "EHNormalTrial";
    margin-bottom: 30px;
  }
  & > .shorts-container {
    width: 100%;
    height: 100%;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      gap: 20px;
      li {
        width: 50%;
        /* flex: 1; */
        .thumbnail-info {
          width: 100%;
          height: 100%;
          aspect-ratio: 4/ 6;
          aspect-ratio: 9/ 16;
          overflow: hidden;
          border-radius: 8px;
          cursor: pointer;
          position: relative;
          /* img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border: none;
            pointer-events: none;
            } */
          iframe {
            position: absolute;
            top: 0;
            left: 0;
            /* z-index: 1; */
            width: 100%;
            height: 100%;

            /* pointer-events: none; */
          }
        }
        .short-info {
          margin-top: 20px;
          p {
            width: 100%;
            height: 24px;
            font-size: 2rem;
            font-weight: 500;
            line-height: 1.2;
            /* margin-bottom: 14px; */
            cursor: pointer;
          }
          div {
            width: 100%;
            height: 1px;
            background: #393939;
            margin: 12px 0;
          }
          span {
            font-size: 1.4rem;
            color: #888888;
            letter-spacing: 0;
          }
        }
      }
    }
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    & > h4 {
      width: 100%;
      /* width: 50%; */
      font-size: 3.2rem;
      margin-bottom: 30px;
    }
    & > .shorts-container {
      ul {
        /* gap: 14px; */
        /* display: flex; */
        /* flex-direction: column; */
        flex-wrap: wrap;
        justify-content: center;
        justify-content: space-around;
        li {
          width: 30%;
          /* height: 100%; */

          &:last-child {
            display: none;
          }
          .short-info {
            margin-top: 14px;
            p {
              font-size: 2rem;
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
      width: 100%;
      font-size: 3rem;
      margin-bottom: 20px;
      padding-bottom: 18px;
      border-bottom: 1px solid #424242;
    }
    & > .shorts-container {
      ul {
        /* flex-direction: column; */
        li {
          width: 47%;
          &:last-child {
            display: block;
          }
          .short-info {
            width: 100%;
            margin-top: 10px;
            p {
              font-size: 1.6rem;
              /* line-height: 1.4; */
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
  shorts,
  items,
  videoUrl,
}) => {
  const navigate = useNavigate();

  const [sildeData, setSlideData] = useState([]);

  useEffect(() => {
    fetch("/API/originalData.json")
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
      autoplay: 0, // 자동재생
      enablejsapi: 1, // JS API 활성화
    },
  };

  const VideoRef = useRef([]);

  const handleReady = (event) => {
    VideoRef.current = event.target;
  };
  const VideoPlay = (e) => {
    if (VideoRef.current) {
      e.target.style.opacity = 1;
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

  const handleVideoReady = (event, index) => {
    VideoRef.current[index] = event.target;
  };
  const handleMouseEnter = (index) => {
    const player = VideoRef.current[index];
    if (player) {
      player.playVideo();
    }
  };
  const handleMouseLeave = (index) => {
    const player = VideoRef.current[index];
    if (player) {
      player.pauseVideo(); // stopVideo()보다 자연스럽습니다.
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
                <li className="hashtag" key={index}>
                  # {item}
                </li>
              ))}
            </ul>
          </div>
        </aside>
        <aside className="item-zip">
          <h4>item ZIP</h4>
          <div>
            <h5>당신도 궁금했던, {episode}의 리얼템</h5>
          </div>
        </aside>
        <CardList>
          <Swiper
            className="swiper"
            // slidesPerView={4}
            // spaceBetween={400}
            loop={true}
            // loopedSlides={8}
            // modules={[]}
            style={{ overflow: "visible" }}
            breakpoints={{
              1920: {
                slidesPerView: 4,
              },
              // 1500: {
              //   slidesPerView: 4,
              // },
              960: {
                slidesPerView: 3, // ✅ 모바일용 설정 추가 (예: 1개 보여줌)
                // spaceBetween: 20,
              },
              0: {
                slidesPerView: 2, // ✅ 모바일용 설정 추가 (예: 1개 보여줌)
                // spaceBetween: 20,
              },
            }}
          >
            {items?.map((item, index) => (
              <SwiperSlide key={index}>
                <CardItem subtitle={item.subtitle} title={item.title} img={item.img} detailURL={item.detailURL} />
              </SwiperSlide>
            ))}
          </Swiper>
        </CardList>
      </CharaterSection>
      <RollingBanner />
      <RealStarSection>
        <p className="real-title">캐릭터가 아닌, 진짜 {starName}의 취향은?</p>
        <div className="contents-container">
          <h4>bag ZIP</h4>
          <div className="video-container" onMouseEnter={VideoPlay} onMouseLeave={VideoStop}>
            <div className="videoImg">
              <YouTube videoId={videoUrl} opts={opts} onReady={handleReady} />
            </div>
          </div>
        </div>
        <ShortSection>
          <h4>short ZIP</h4>
          <div className="shorts-container">
            <ul>
              {shorts?.map((item, index) => (
                <li key={index}>
                  <div
                    className="thumbnail-info"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave(index)}
                  >
                    <YouTube videoId={item.shortVideo} opts={opts} onReady={(e) => handleVideoReady(e, index)} />
                  </div>
                  {/* <div className="short-info">
                    <p>{item.shortTitle}</p>
                    <div></div>
                    <span>조회수 {item.viewRated.toLocaleString()}회</span>
                  </div> */}
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
