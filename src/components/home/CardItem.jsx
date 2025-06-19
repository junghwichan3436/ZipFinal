import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

/* --- 스타일 --- */
const Container = styled.li`
  width: 300px;
  height: 400px;
  background: var(--light-color);
  color: var(--dark-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  @media screen and (max-width: 1200px) {
    width: 240px;
    height: 320px;
  }
`;
const CardItemInfo = styled.div`
  width: inherit;
  padding: 8%;
  text-transform: uppercase;
  position: relative;
  letter-spacing: -1px;
  span {
    letter-spacing: normal;
    font-size: 1.4rem;
    font-weight: 400;
    color: var(--subTitle);
  }
  p {
    max-width: 300px;
    font-size: 2.6rem;
    line-height: 1.2;
    margin: 14px 0 20px;
    font-weight: 600;
    cursor: pointer;
  }
  button {
    padding: 12px 13px;
    font-size: 1.6rem;
    border-radius: 50%;
    background: var(--dark-color);
    color: var(--light-color);
    border: none;
    outline: none;
    cursor: pointer;
  }

  @media screen and (max-width: 1200px) {
    span {
      font-size: 1.2rem;
    }
    p {
      max-width: 280px;
      font-size: 2.4rem;
      margin: 8px 0 12px;
    }
    button {
      padding: 7px 8px;
      font-size: 1.4rem;
    }
  }
`;
const CardImg = styled.div`
  width: 300px;
  height: 300px;
  bottom: -80px;
  position: absolute;
  z-index: 1;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
    cursor: pointer;
  }

  @media screen and (max-width: 1200px) {
    bottom: -30px;
    width: 210px;
    height: 210px;
  }
`;

/* --- 출력 --- */
const CardItem = ({ subtitle, title, img, detailURL }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <CardItemInfo>
        <span>{subtitle}</span>
        <p>
          {title?.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        <button onClick={() => navigate(`/detail/${detailURL}`)}>→</button>
      </CardItemInfo>
      <CardImg>
        <img onClick={() => navigate(`/detail/${detailURL}`)} src={img} alt={`${detailURL} 이미지`} />
      </CardImg>
    </Container>
  );
};

export default CardItem;
