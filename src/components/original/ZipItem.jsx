import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ZipItems = styled.li`
  width: 49%;
  margin-bottom: 50px;
  overflow: hidden;
  position: relative;
  .img_container {
    width: 100%;
    height: 480px;
    overflow: hidden;
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
  /* overflow: hidden; */
  /* box-shadow: 10px 10px 5px white inset; */
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
      .then((data) => setSlideData(data.slideData));
  }, []);

  const onClickItem = () => {
    navigate(`/ott/originalDetail/${id}`);
  };

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
      <KeywordList>
        {keyword?.map((item, index) => (
          <li key={index}>#{item}</li>
        ))}
      </KeywordList>
    </ZipItems>
  );
};

export default ZipItem;
