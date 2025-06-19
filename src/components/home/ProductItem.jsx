import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

/*--- 스타일 ---*/
const Container = styled.li`
  border-right: 1px solid var(--border-color);
  padding-right: 12px;
  &:nth-child(5),
  &:last-child {
    border: 0px solid;
  }

  @media screen and (max-width: 1024px) {
    padding-right: 8px;
    &:nth-child(3),
    &:nth-child(6),
    &:nth-child(9) {
      border: 0px solid;
    }

    &:nth-child(5),
    &:last-child {
      border-right: 1px solid var(--border-color);
    }
    &:last-child {
      display: none;
    }
  }
  @media screen and (max-width: 767px) {
    &:nth-child(2),
    &:nth-child(4),
    &:nth-child(6) {
      border: 0px solid;
    }

    &:nth-child(3),
    &:last-child {
      border-right: 1px solid var(--border-color);
    }
    &:nth-child(7),
    &:nth-child(8),
    &:nth-child(9) {
      display: none;
    }
  }
`;
const ProductImg = styled.div`
  cursor: pointer;
  overflow: hidden;
  position: relative;
  img {
    padding: 30px;
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: all 0.5s ease;
    &:hover {
      transform: scale(1.1);
    }
  }
`;
const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 90px;
  padding: 10px 8px;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  transition: all 0.5s;
  cursor: pointer;
  &:hover {
    color: var(--light-color);
    background: var(--dark-color);
  }

  @media screen and (max-width: 1024px) {
    padding: 16px;
  }
  @media screen and (max-width: 767px) {
    min-height: 110px;
  }
`;
const Prod_sub = styled.span`
  font-size: 1rem;
  color: var(--subTitle);

  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }
`;
const Prod_name = styled.span`
  font-size: 1.6rem;
  margin: 8px 0 10px;
  /* background: #890; */

  font-weight: 600;

  @media screen and (max-width: 1400px) {
    font-size: 1.8rem;
    line-height: 2.2rem;
    margin: 10px 0 6px;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.6rem;
    margin: 8px 0 6px;
  }
`;
const Prod_price = styled.span`
  letter-spacing: 0.2px;
  color: var(--subTitle);
  font-size: 1.4rem;

  @media screen and (max-width: 1024px) {
    margin-top: 2px;
    font-size: 1.2rem;
  }
`;
const FilterItemPick = styled.span`
  display: inline-block;
  color: var(--light-color);
  background: var(--dark-color);
  font-weight: 400;
  z-index: 1;
  font-size: 1.2rem;
  line-height: 1.2;
  text-align: center;
  padding: 8px;
  position: absolute;
  right: 0;
  top: 0;
`;

/*--- 출력 ---*/
const ProductItem = ({ img, thumbnail, subtitle, name, price, artistName, detailURL }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <ProductImg>
        <FilterItemPick>
          {artistName} <br />
          PICK
        </FilterItemPick>
        <img src={img} alt="{img} 제품" onClick={() => navigate(`/detail/${detailURL}`)} />
      </ProductImg>
      <ProductInfo onClick={() => navigate(`/detail/${detailURL}`)}>
        <Prod_sub>{subtitle}</Prod_sub>
        <Prod_name>{name}</Prod_name>
        <Prod_price>KRW {Number(price).toLocaleString("ko-KR")}</Prod_price>
      </ProductInfo>
    </Container>
  );
};

export default React.memo(ProductItem);
