import React from "react";
import styled, { keyframes } from "styled-components";

const roll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  background: var(--dark-color);
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${roll} 40s linear infinite;
`;

const LogoWrapper = styled.ul`
  display: flex;
  align-items: center;
  padding: 8px 0;
  margin: 0;
  list-style: none;
`;

const BrandLogo = styled.li`
  width: 50px;
  margin-right: 80px;
  flex-shrink: 0;
  display: flex;
  align-items: center;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

const logos = [
  { url: "https://www.doosanmagazine.com/images/brand/vogue/vogue-logo11.png" },
  { url: "https://www.pngall.com/wp-content/uploads/15/Gq-Logo-PNG-Photo.png" },
  { url: "https://www.pikpng.com/pngl/b/526-5261756_allure-magazine-logo-white-clipart.png" },
  { url: "/img/Logo.png" },
  { url: "https://www.doosanmagazine.com/images/brand/vogue/vogue-logo11.png" },
  { url: "https://www.pngall.com/wp-content/uploads/15/Gq-Logo-PNG-Photo.png" },
  { url: "https://www.pikpng.com/pngl/b/526-5261756_allure-magazine-logo-white-clipart.png" },
];

const RollingBanner = () => {
  const copyLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <Container>
      <Track>
        <LogoWrapper>
          {copyLogos.map((logo, index) => (
            <BrandLogo key={index}>
              <img src={logo.url} alt="브랜드 로고" />
            </BrandLogo>
          ))}
        </LogoWrapper>
      </Track>
    </Container>
  );
};

export default RollingBanner;
