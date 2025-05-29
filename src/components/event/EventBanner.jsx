import styled from "styled-components";
import { useEffect, useState } from "react";

const ImgWrapper = styled.div`
  width: 100%;
  height: 100%;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 402px) {
  }
`;

const EventBanner = () => {
  const [imgUrl, setImgUrl] = useState("/img/tattoo-PC.png");
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 767) {
        setImgUrl("/img/tattoo-MO.png");
      } else {
        setImgUrl("/img/tattoo-PC.png");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);
  return (
    <ImgWrapper>
      <img src={imgUrl} alt="eventbanner" />
    </ImgWrapper>
  );
};

export default EventBanner;
