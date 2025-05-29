import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { useLocation } from "react-router-dom";

/*--- 스타일 ---*/
const Container = styled.div`
  width: 100%;
  background: #fff;
  color: #000;
  padding: 30px 0% 0px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  font-family: "EHNormalTrial";
  font-weight: 500;
  letter-spacing: 0.2px;

  @media screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
  }
  @media screen and (max-width: 767px) {
    padding: 0px;
  }
`;

const CategotyImg = styled.ul`
  border-top: 1px solid #ccc;
  border-right: 1px solid #ccc;
  height: 900px;
  overflow: hidden;
  li {
    width: 100%;
    height: 100%;
    transition: all 0.7s;
    img {
      cursor: pointer;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 1;
    }
  }

  @media screen and (max-width: 1024px) {
    height: 400px;
  }
  @media screen and (max-width: 767px) {
    height: 200px;
  }
`;

const Info = styled.section`
  border-top: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MainTitle = styled.div`
  display: flex;
  padding: 60px;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 1024px) {
    padding: 50px 5%;
  }
  @media screen and (max-width: 767px) {
    padding: 30px 5%;
  }
`;

const Title = styled.h2`
  color: var(--dark-color);
  font-size: 10rem;
  letter-spacing: -4px;

  @media screen and (max-width: 1024px) {
    font-size: 7rem;
  }
  @media screen and (max-width: 767px) {
    letter-spacing: -2px;
    font-size: 5rem;
  }
`;

const CategoryItem = styled.ul`
  li {
    font-size: 5rem;
    letter-spacing: -1px;
    padding: 50px 60px;
    border-top: 1px solid var(--border-color);
    transition: all 0.7s;
    cursor: pointer;
    &:hover {
      background: var(--dark-color);
      color: var(--light-color);
    }
  }

  @media screen and (max-width: 1024px) {
    li {
      font-size: 4rem;
      padding: 40px 5%;
    }
  }
  @media screen and (max-width: 767px) {
    li {
      font-size: 3.2rem;
      padding: 30px 5%;
    }
  }
`;

/*--- 출력 ---*/
const Category = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const [selectedImg, setSelectedImg] = useState(
    "https://imagedelivery.net/djfufN1Ft6CV8Emdrip5jA/7b92c9b5-8641-48f2-e332-78536e252f00/w=1024,h=1425"
  );

  const onMouseEnter = (category) => {
    switch (category) {
      case "style":
        setSelectedImg(
          "https://imagedelivery.net/djfufN1Ft6CV8Emdrip5jA/7b92c9b5-8641-48f2-e332-78536e252f00/w=1024,h=1425"
        );
        break;
      case "beauty":
        setSelectedImg(
          "https://imagedelivery.net/djfufN1Ft6CV8Emdrip5jA/f5b28ac6-5552-4ecb-d83e-3df2dad65300/w=1024,h=1280"
        );
        break;
      case "artist":
        setSelectedImg(
          "https://imagedelivery.net/djfufN1Ft6CV8Emdrip5jA/7b3d2a1c-6f84-4122-5599-434742ce6200/w=1856,h=2464"
        );
        break;
      case "promotion":
        setSelectedImg("https://i.ibb.co/0Rgf1GMM/category.jpg");
        break;
      default:
        setSelectedImage(
          "https://imagedelivery.net/djfufN1Ft6CV8Emdrip5jA/7b92c9b5-8641-48f2-e332-78536e252f00/w=1024,h=1425"
        );
        break;
    }
  };

  return (
    <Container>
      <CategotyImg>
        <li>
          <img src={selectedImg} alt="카테고리 이미지" />
        </li>
      </CategotyImg>
      <Info>
        <MainTitle>
          <Title>Category</Title>
        </MainTitle>
        <CategoryItem>
          <li
            onClick={() => {
              setTimeout(() => scrollTop(), 0);
              navigate("/filtercategory/style");
            }}
            onMouseEnter={() => onMouseEnter("style")}
          >
            Style
          </li>
          <li
            onClick={() => {
              setTimeout(() => scrollTop(), 0);
              navigate("/filtercategory/beauty");
            }}
            onMouseEnter={() => onMouseEnter("beauty")}
          >
            Beauty
          </li>
          <li
            onClick={() => {
              navigate("/star");
            }}
            onMouseEnter={() => onMouseEnter("artist")}
          >
            Star
          </li>
          <li
            onClick={() => {
              navigate("/event");
            }}
            onMouseEnter={() => onMouseEnter("promotion")}
          >
            Promotion
          </li>
        </CategoryItem>
      </Info>
    </Container>
  );
};

export default Category;
