import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  background: var(--ott-bg-color);
  color: var(--light-color);
`;
const OttSearch = ({ searechClick, setSearchClick }) => {
  console.log(searechClick, setSearchClick);
  return <Container>OttSearch</Container>;
};

export default OttSearch;
