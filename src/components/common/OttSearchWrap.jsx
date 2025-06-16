import React, { useState } from "react";
import OttSearch from "./OttSearch";
import OttSearchComp from "./OttSearchComp";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  opacity: 0;
  justify-content: space-between;
  transition: all 0.3s ease-in-out;
  position: fixed;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  z-index: -1;
  background: var(--ott-bg-color);
  &.active {
    z-index: 3;
    opacity: 1;
  }
  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;
const CloseBtn = styled.button`
  transition: all 0.3s;
  width: 26px;
  height: 18px;
  position: absolute;
  background: transparent;
  border: none;
  cursor: pointer;
  top: 20px;
  right: 3%;
  z-index: 2;
  span {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    border-bottom: 1px solid var(--light-color);
    width: 100%;
    height: 2px;
    transition: all 0.3s;
    &:first-child {
      top: 50%;
      transform: rotate(45deg);
    }
    &:last-child {
      top: 50%;
      transform: rotate(-45deg);
    }
  }
`;
const OttSearchWrap = ({
  ottSearchClick,
  setOttSearchClick,
  setSearchClick,
}) => {
  const [inputValue, setInputValue] = useState("");
  const closeBtnClick = (e) => {
    e.preventDefault();
    setOttSearchClick(false);
    setSearchClick(false);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <Container className={ottSearchClick ? "active" : ""}>
      <OttSearch value={inputValue} onChange={handleInputChange} />
      <OttSearchComp inputValue={inputValue} />
      <CloseBtn onClick={closeBtnClick}>
        <span></span>
        <span></span>
      </CloseBtn>
    </Container>
  );
};

export default OttSearchWrap;
