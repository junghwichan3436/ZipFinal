import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.form`
  min-width: 20%;
  height: 100vh;
  padding: 3% 20px 0 20px;
  position: sticky;
  top: 0;
  align-content: flex-start;
  @media screen and (max-width: 1400px) {
    min-width: 25%;
  }
  @media screen and (max-width: 1024px) {
    position: relative;
    height: auto;
  }
`;

const Search = styled.div`
  position: relative;
  input {
    width: 100%;
    background: none;
    border: none;
    border-bottom: 1px solid var(--light-color);
    padding-bottom: 16px;
    color: var(--light-color);
    &::placeholder {
      opacity: 1;
      transition: all 0.3s;
      color: var(--light-color);
    }
    &:focus {
      outline: none;
      &::placeholder {
        opacity: 0;
      }
    }
  }

  img {
    position: absolute;
    right: 0px;
    cursor: pointer;
    filter: invert(1);
  }
`;

const Keyword = styled.div`
  padding-top: 20px;
  p {
    font-weight: bold;
    font-size: 2rem;
    color: var(--light-color);
  }
  ul {
    margin-top: 20px;
    display: flex;
    gap: 20px;
    flex-direction: column;
    li {
      color: var(--light-color);
      cursor: pointer;
    }
  }
  @media screen and (max-width: 1024px) {
    display: none;
    position: absolute;
  }
`;

const CloseBtn = styled.button`
  transition: all 0.3s;
  position: absolute;
  background: transparent;
  border: none;
  cursor: pointer;
  top: 5%;
  right: 12%;
  z-index: 2;
  background: var(--light-color);
  width: 14px;
  height: 14px;
  z-index: 1;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
  transition: all 0.3s;
  span {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    border-bottom: 1px solid var(--dark-color);
    width: 50%;
    height: 1px;
    transition: all 0.3s;
    &:first-child {
      transform: translate(-50%, -50%) rotate(45deg);
    }
    &:last-child {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
  @media screen and (max-width: 1024px) {
    right: 4%;
  }
  @media screen and (max-width: 600px) {
    right: 6%;
  }
  &.active {
    opacity: 1;
    pointer-events: fill;
    visibility: visible;
  }
`;
const OttSearch = ({ setInputValue, value, onChange }) => {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <Container onSubmit={onSubmit}>
      <Search>
        <input
          className="searchBar"
          type="text"
          name="search"
          placeholder="검색"
          value={value}
          onChange={onChange}
        />
        <img
          src="https://ecimg.cafe24img.com/pg326b45779995089/oiad/web/oiad_renewal/img/oiad-icon-search-mo.svg"
          alt="search"
        />
        <CloseBtn
          type="button"
          onClick={() => setInputValue("")}
          className={value ? "active" : ""}
        >
          <span></span>
          <span></span>
        </CloseBtn>
      </Search>
      <Keyword>
        <p>POPULAR KEYWORDS</p>
        <ul>
          <li onClick={() => setInputValue("하니")}>하니</li>
          <li onClick={() => setInputValue("신시아")}>신시아</li>
          <li onClick={() => setInputValue("선미")}>선미</li>
          <li onClick={() => setInputValue("고준희")}>고준희</li>
          <li onClick={() => setInputValue("슈화")}>슈화</li>
        </ul>
      </Keyword>
    </Container>
  );
};

export default OttSearch;
