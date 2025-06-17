import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

/* --- 스타일 --- */
const Container = styled.li`
  width: 340px;
  height: 420px;
  background: var(--light-color);
  color: var(--dark-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  @media screen and (max-width: 1200px) {
    width: 300px;
    height: 370px;
  }
  @media screen and (max-width: 767px) {
    width: 260px;
    height: 320px;
  }
  @media screen and (max-width: 600px) {
    width: 220px;
    height: 280px;
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
    font-size: 3.2rem;
    line-height: 1.24;
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
      font-size: 2.6rem;
      margin: 8px 0 14px;
    }
    button {
      padding: 8px 9px;
    }
  }
  @media screen and (max-width: 767px) {
    span {
      font-size: 1.2rem;
    }
    p {
      max-width: 200px;
      font-size: 2.4rem;
    }
    button {
      padding: 6px 7px;
      font-size: 1.4rem;
    }
  }
  @media screen and (max-width: 600px) {
    span {
      font-size: 1rem;
    }
    p {
      /* max-width: 200px; */
      font-size: 2rem;
      margin: 8px 0 10px;
    }
    button {
      padding: 4px 5px;
      font-size: 1.2rem;
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
    bottom: -40px;
    width: 240px;
    height: 240px;
  }
  @media screen and (max-width: 767px) {
    bottom: -30px;
    width: 200px;
    height: 200px;
  }
  @media screen and (max-width: 600px) {
    bottom: -30px;
    width: 180px;
    height: 180px;
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
        <img
          onClick={() => navigate(`/detail/${detailURL}`)}
          src={img}
          alt={`${detailURL} 이미지`}
        />
      </CardImg>
    </Container>
  );
};

export default CardItem;
