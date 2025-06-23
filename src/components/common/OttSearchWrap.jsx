import React, { useState, useEffect, useRef, useCallback } from "react";
import OttSearch from "./OttSearch";
import OttSearchComp from "./OttSearchComp";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const Container = styled.div`
  pointer-events: auto !important;
  display: flex;
  opacity: 0;
  justify-content: space-between;
  transition: all 0.3s ease-in-out;
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: -1;
  background: var(--ott-bg-color);
  flex: 1;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  -webkit-overflow-scrolling: touch;
  &.active {
    z-index: 10;
    opacity: 1;
  }
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    padding-top: 60px;
    height: 100%;
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
  const scrollAreaRef = useRef(null);
  const params = useParams();

  const closeBtnClick = (e) => {
    e.preventDefault();
    setOttSearchClick(false);
    setSearchClick(false);
    setInputValue("");
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (ottSearchClick) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [ottSearchClick]);

  useEffect(() => {
    setOttSearchClick(false);
    setInputValue("");
  }, [params]);
  // 억지 휠 이벤트 처리

  const handleWheel = useCallback((e) => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop += e.deltaY;
    }
  }, []);

  return (
    <div>
      {ottSearchClick ? (
        <Container
          ref={scrollAreaRef}
          className={ottSearchClick ? "active" : ""}
          onWheel={handleWheel}
        >
          <OttSearch
            value={inputValue}
            onChange={handleInputChange}
            setInputValue={setInputValue}
          />
          <OttSearchComp
            inputValue={inputValue}
            scrollAreaRef={scrollAreaRef}
          />
          <CloseBtn onClick={closeBtnClick}>
            <span></span>
            <span></span>
          </CloseBtn>
        </Container>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default OttSearchWrap;
