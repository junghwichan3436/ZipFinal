import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StarData, workingDataWithViews } from "../../StarData";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--ott-bg-color);
  color: var(--light-color);
`;

const Title = styled.div`
  width: 100%;
  display: flex;
  align-items: end;
  gap: 40px;
  padding-top: 120px;
  padding-bottom: 30px;
  /* border-bottom: 1px solid #3c3c3c; */
  h4 {
    font-size: 7rem;
    font-family: "EHNormalTrial";
  }
  p {
    line-height: 1.2;
    b {
      font-family: "EHNormalTrial";
    }
  }
  @media (max-width: 1024px) {
    gap: 20px;
    h4 {
      font-size: 5rem;
    }
    p {
      font-size: 1.4rem;
    }
  }
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: start;
    gap: 20px;
    /* h4 {
      font-size: 3rem;
    } */
    p {
      display: flex;
      /* letter-spacing: 0.1rem; */
    }
  }
`;

const FilterGroup = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  border: 1px solid var(--border-bottom);
  select {
    border: none;
    padding: 0 30px 0 10px;
    border-left: 1px solid var(--border-bottom);
    background: var(--ott-bg-color);
    color: var(--light-color);
    outline: none;
    cursor: pointer;
  }
  @media (max-width: 767px) {
    select {
      padding: 0 14px 0 8px;
    }
  }
`;

const Category = styled.ul`
  width: 100%;
  display: flex;
  li {
    font-family: "EHNormalTrial";
    padding: 14px 20px;
    /* border: 1px solid var(--light-color); */
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      background: var(--light-color);
      color: var(--dark-color);
    }
    &.active {
      background: var(--light-color);
      color: var(--dark-color);
    }
  }
  @media (max-width: 1024px) {
    li {
      font-size: 1.4rem;
    }
  }
  @media (max-width: 767px) {
    li {
      padding: 10px 14px;
      font-size: 1.4rem;
    }
  }
`;

const Contents = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  margin: 40px 0;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Video = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
  /* iframe {
    width: 100%;
    aspect-ratio: 16 / 9;
  } */
  img {
    width: 100%;
    object-fit: cover;
    cursor: pointer;
    transition: scale 0.3s;
    border-radius: 4px;
    &:hover {
      scale: 1.04;
      /* transform: translateY(-10%); */
    }
  }
`;

const VideoText = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  img {
    width: 44px;
    height: 44px;
    object-fit: cover;
    border-radius: 50%;
  }
  p {
    &:nth-child(1) {
      /* font-weight: bold; */
      line-height: 1.2;
      margin-bottom: 10px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &:nth-child(2) {
      font-size: 1.4rem;
      color: var(--subTitle);
    }
  }
  @media screen and (max-width: 767px) {
    p {
      &:nth-child(1) {
        font-size: 1.4rem;
      }
      &:nth-child(2) {
        font-size: 1.2rem;
      }
    }
  }
`;

const PaginationWrap = styled.div`
  width: 100%;
  margin-bottom: 40px;
  ul {
    display: flex;
    justify-content: center;
    li {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--border-color);
      &.active {
        color: var(--light-color);
      }
    }
  }
`;

const Work = () => {
  const [sortOrder, setSortOrder] = useState("latest");
  const { data, isLoading, error } = workingDataWithViews();
  const {
    data: starData,
    isLoading: starLoading,
    error: starError,
  } = StarData();
  const navigate = useNavigate();
  return (
    <Container>
      <Title>
        <h4>WORK ZIP</h4>
        <p>
          스타의 프로페셔널한 모습,
          <br />
          한눈에 <b>ZIP</b>
        </p>
      </Title>
      <FilterGroup>
        <Category>
          <li>ALL</li>
        </Category>
      </FilterGroup>
    </Container>
  );
};

export default Work;
