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

const OttSearch = ({ setInputValue, value, onChange }) => {
  return (
    <Container>
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
