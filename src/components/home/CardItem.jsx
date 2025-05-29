import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

/* --- 스타일 --- */
const Container = styled.li`
  width: 380px;
  height: 500px;
  background: var(--light-color);
  color: var(--dark-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  @media screen and (max-width: 1024px) {
    width: 330px;
    height: 400px;
  }
  @media screen and (max-width: 767px) {
    width: 290px;
    height: 350px;
  }
`;
const CardItemInfo = styled.div`
  width: inherit;
  padding: 40px;
  text-transform: uppercase;
  position: relative;
  letter-spacing: -1px;
  span {
    letter-spacing: normal;
    font-size: 1.8rem;
    font-weight: 400;
    color: var(--subTitle);
  }
  p {
    max-width: 300px;
    font-size: 3.6rem;
    line-height: 4.5rem;
    margin: 18px 0 30px;

    font-weight: 600;
    cursor: pointer;
  }
  button {
    padding: 15px 16px;
    font-size: 2rem;
    border-radius: 50%;
    background: var(--dark-color);
    color: var(--light-color);
    border: none;
    outline: none;
    cursor: pointer;
  }

  @media screen and (max-width: 1024px) {
    span {
      font-size: 1.6rem;
    }
    p {
      max-width: 280px;
      font-size: 3rem;
      line-height: 3.6rem;
      margin: 8px 0 20px;
    }
    button {
      padding: 10px 11px;
      font-size: 1.6rem;
    }
  }
  @media screen and (max-width: 767px) {
    span {
      font-size: 1.4rem;
    }
    p {
      max-width: 250px;
      font-size: 2.4rem;
      line-height: 2.8rem;
      margin: 8px 0 12px;
    }
    button {
      padding: 8px 9px;
    }
  }
`;
const CardImg = styled.div`
  width: 320px;
  height: 320px;
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

  @media screen and (max-width: 1024px) {
    bottom: -70px;
    width: 260px;
    height: 260px;
  }
  @media screen and (max-width: 767px) {
    bottom: -30px;
    width: 220px;
    height: 220px;
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
          {title.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>
        <button onClick={() => navigate(`/detail/${detailURL}`)}>→</button>
      </CardItemInfo>
      <CardImg>
        <img onClick={() => navigate(`/detail/${detailURL}`)} src={img} alt={`${title} 이미지`} />
      </CardImg>
    </Container>
  );
};

export default CardItem;
