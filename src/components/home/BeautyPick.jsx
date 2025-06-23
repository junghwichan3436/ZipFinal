import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductItem from "./ProductItem";
import styled from "styled-components";

/*--- 스타일 ---*/
const Container = styled.div`
  background: var(--light-color);
  color: var(--dark-color);
  padding: 100px 3% 0px;
  @media screen and (max-width: 1024px) {
    padding: 50px 3% 0px;
  }
  @media screen and (max-width: 768px) {
    padding: 50px 3% 0px;
  }
`;
const MainTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h2`
  color: var(--dark-color);
  font-size: 8rem;
  letter-spacing: -4px;
  font-family: "EHNormalTrial";
  font-weight: 500;
  @media screen and (max-width: 1024px) {
    font-size: 6rem;
    letter-spacing: -3px;
  }
  @media screen and (max-width: 768px) {
    font-size: 5rem;
    letter-spacing: -2px;
  }
`;
const Button = styled.button`
  font-size: 2rem;
  padding: 22px 40px;
  color: var(--light-color);
  background: var(--dark-color);
  font-family: "EHNormalTrial";
  text-transform: uppercase;
  border: none;
  outline: none;
  cursor: pointer;

  @media screen and (max-width: 1024px) {
    font-size: 1.6rem;
    padding: 16px 28px;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.2rem;
    padding: 16px 24px;
  }
`;
const ProductList = styled.ul`
  padding: 70px 0;
  text-transform: uppercase;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-gap: 12px;
  padding-bottom: 1px;
  @media screen and (max-width: 1024px) {
    padding: 40px 0;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-gap: 8px;
  }
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-gap: 6px;
  }
`;

/*--- 출력 ---*/
const BeautyPick = () => {
  const navigate = useNavigate();

  const [productData, setProductData] = useState([]);

  useEffect(() => {
    fetch("/API/homeData.json")
      .then((response) => response.json())
      .then((data) => setProductData(data.productData));
  }, []);
  console.log(productData);
  return (
    <Container>
      <MainTitle>
        <Title>Beauty ZIP</Title>
        <Button
          onClick={() => {
            navigate("/filtercategory/beauty");
          }}
        >
          More Zip
        </Button>
      </MainTitle>
      <ProductList>
        {productData?.map((item, index) => (
          <ProductItem
            onClick={() => {
              navigate(`/detail/${item.detailURL}`);
            }}
            key={index}
            img={item.img}
            name={item.name}
            price={item.price}
            subtitle={item.subtitle}
            artistName={item.artistName}
            detailURL={item.detailURL}
          />
        ))}
      </ProductList>
    </Container>
  );
};

export default BeautyPick;
