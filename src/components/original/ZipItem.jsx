import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import YouTube from "react-youtube";
import styled from "styled-components";

const ZipItems = styled.li`
  width: 49%;
  margin-bottom: 50px;
  overflow: hidden;
  position: relative;
  .line {
    width: 100%;
    height: 1px;
    background: #313131;
    margin: 20px 12px 0;
  }
  .img_container {
    width: 100%;
    height: 480px;
    overflow: hidden;
    /* aspect-ratio: 16 / 9; */
    img {
      cursor: pointer;
      position: relative;
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
    color: #a9a9a9;
  }
`;
const OverlayTop = styled.div`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  display: flex;
  gap: 50px;
  text-transform: uppercase;
  padding: 2% 0;
  font-family: "EHNormalTrial";
  transition: all 0.3s;
  color: var(--light-color);
  font-size: 2.4rem;
  font-weight: 700;
  z-index: 1;
  width: 100%;
  height: 100%;
  transform: translate3d(0px, -3vw, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  opacity: 0;
  &:hover {
    opacity: 1;
    transform: scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
    transform-style: preserve-3d;
    will-change: transform;
    /* overflow: hidden; */
  }
  div {
    width: 100%;
    height: 100%;
  }
`;
const KeywordList = styled.ul`
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
`;

const ZipItem = ({ id, thumbnail, mainTitle, subTitle, starName, keyword }) => {
  const navigate = useNavigate();

  const [sildeData, setSlideData] = useState([]);

  useEffect(() => {
    fetch("/API/homeData.json")
      .then((response) => response.json())
      .then((data) => setSlideData(data.sildeData));
  }, []);

  const onClickItem = () => {
    navigate(`/ott/originalDetail/${id}`);
  };

  //
  const VideoRef = useRef(null);

  // const handleReady = (event) => {
  //   // event.target은 YT.Player 인스턴스
  //   VideoRef.current = event.target;
  // };
  // const VideoPlay = (e) => {
  //   if (VideoRef.current) {
  //     e.target.style.opacity = 0;
  //     VideoRef.current.stopVideo();
  //     VideoRef.current.playVideo();
  //   }
  // };
  // const VideoStop = (e) => {
  //   if (VideoRef.current) {
  //     e.target.style.opacity = 1;
  //     VideoRef.current.stopVideo();
  //   }
  // };
  // const [mouseEnter, SetMouseEnter] = useState(false);
  // const opts = {
  //   width: "100%",
  //   height: "100%",
  //   playerVars: {
  //     mute: 1,
  //     loop: 1,
  //     controls: 0, // 컨트롤 바 숨기기
  //     modestbranding: 1, // 유튜브 로고 최소화
  //     rel: 0, // 관련 영상 숨기기
  //     fs: 0, // 전체화면 버튼 숨기기
  //     disablekb: 1, // 키보드 제어 비활성화
  //     showinfo: 0, // 제목 숨기기 시도 (현재는 거의 안 먹힘)
  //     autoplay: 1, // 자동재생
  //     enablejsapi: 1, // JS API 활성화
  //   },
  // };
  // onMouseEnter={gifPlay} onMouseLeave={gifStop}
  return (
    <ZipItems onClick={onClickItem}>
      <OverlayTop>
        <div>view</div>
        <div>view</div>
        <div>view</div>
        <div>view</div>
        <div>view</div>
        <div>view</div>
        <div>view</div>
        <div>view</div>
        <div>view</div>
        <div>view</div>
        <div>view</div>
        <div>view</div>
      </OverlayTop>
      <div className="img_container">
        <img src={thumbnail} alt={starName} />
      </div>
      <p>{mainTitle}</p>
      <span>{subTitle}</span>
      <div className="line"></div>
      <KeywordList>
        {keyword?.map((item, index) => (
          <li key={index}>#{item}</li>
        ))}
      </KeywordList>
      {/* <VideoCon onMouseEnter={VideoPlay} onMouseLeave={VideoStop}>
        <img src="https://i.pinimg.com/736x/f3/f7/5a/f3f75a650e00c2f5f7bdc424563bb617.jpg" alt="" />
        <YouTube videoId="5BRaRTjCPT0" opts={opts} onReady={handleReady} />
      </VideoCon> */}
    </ZipItems>
  );
};

export default ZipItem;
