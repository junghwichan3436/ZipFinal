import React from "react";
import styled from "styled-components";
import { StarData } from "../../StarData";
import OttSearchResult from "./OttSearchResult";

const Container = styled.div`
  color: var(--light-color);
  min-width: 80%;
  height: 100%;
  padding: 3% 3%;
`;
const OttSearchComp = ({ inputValue }) => {
  const { isLoading, data } = StarData();
  console.log(data);
  return (
    <Container>
      {inputValue === "" ? (
        <OttSearchResult />
      ) : (
        <div>{inputValue}에 대한 검색결과입니다.</div>
      )}
    </Container>
  );
};

export default OttSearchComp;
