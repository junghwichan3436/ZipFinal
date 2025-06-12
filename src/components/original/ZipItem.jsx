import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ZipItems = styled.li`
  width: 49%;
  grid-column-gap: 1.042vw;
  /* grid-row-gap: 6.25vw; */
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  overflow: hidden;
  position: relative;
  .line {
    width: 100%;
    height: 1px;
    background: #313131;
    /* margin: 20px 12px 0; */
  }
  .img_container {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }
  .img_container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 0.3s ease;
  }
  .img_container img.static {
    z-index: 1;
    opacity: 1;
  }
  .img_container img.hover {
    z-index: 2;
    opacity: 0;
  }
  .img_container:hover img.hover {
    opacity: 1;
  }
  .img_container:hover img.static {
    opacity: 0;
  }
  p {
    font-size: 3rem;
    font-weight: 600;
    margin-top: 24px;
  }
  span {
    display: inline-block;
    font-size: 1.6rem;
    font-weight: 300;
    margin: 14px 0 22px;
    color: #a9a9a9;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    padding: 0 3%;
    /* align-items: center; */
    /* background: #d00; */
    .img_container {
      /* width: 80%; */
      /* height: 360px; */
    }
    p {
      font-size: 2.8rem;
      margin-top: 20px;
    }
    span {
      display: inline-block;
      font-size: 1.6rem;
      margin: 14px 0 20px;
    }
  }
  @media screen and (max-width: 767px) {
    p {
      font-size: 2rem;
      margin-top: 14px;
    }
    span {
      font-size: 1.4rem;
      margin: 8px 0 20px;
    }
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
  font-size: 2rem;
  font-weight: 700;
  z-index: 3;
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
  @media screen and (max-width: 1024px) {
    font-size: 2rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.4rem;
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

const ZipItem = ({ id, thumbnail, staticThumbnail, mainTitle, subTitle, starName, keyword }) => {
  const navigate = useNavigate();

  const [sildeData, setSlideData] = useState([]);

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetch("/API/homeData.json")
      .then((response) => response.json())
      .then((data) => setSlideData(data.sildeData));
  }, []);

  const onClickItem = () => {
    navigate(`/ott/originalDetail/${id}`);
  };

  return (
    <ZipItems onClick={onClickItem}>
      <div className="img_container" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
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
        <img className="static" src={staticThumbnail} alt="static" />
        <img className="hover" src={thumbnail} alt="hover" />
      </div>

      {/* <div className="img_container">
        <img className="before-img" src={staticThumbnail} alt={starName} />
        <img src={thumbnail} alt={starName} />
      </div> */}
      <p>{mainTitle}</p>
      <span>{subTitle}</span>
      <div className="line"></div>
      <KeywordList>
        {keyword?.map((item, index) => (
          <li key={index}>#{item}</li>
        ))}
      </KeywordList>
    </ZipItems>
  );
};

export default ZipItem;
