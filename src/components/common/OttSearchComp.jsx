import React from "react";
import styled from "styled-components";
import OttSearchResult from "./OttSearchResult";
import OttSearchUpdate from "./OttSearchUpdate";

const Container = styled.div`
  color: var(--light-color);
  min-width: 80%;
  padding: 30px 3%;
  flex: 1;
  @media screen and (max-width: 1400px) {
    min-width: 75%;
  }
  @media screen and (max-width: 1024px) {
  }
`;
const OttSearchComp = ({
  setOttSearchClick,
  inputValue,
  scrollAreaRef
}) => {
  return (
    <Container>
      {inputValue === "" ? (
        <OttSearchResult />
      ) : (
        <OttSearchUpdate
          setOttSearchClick={setOttSearchClick}
          inputValue={inputValue}
          scrollAreaRef={scrollAreaRef}
        />
      )}
    </Container>
  );
};

export default OttSearchComp;
