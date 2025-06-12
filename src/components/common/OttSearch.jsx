import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
`;
const Form = styled.form`
  width: 100%;
  height: 100vh;
  padding: 100px 20px 0 20px;
`;
const Search = styled.div`
  position: relative;
  input {
    width: 100%;
    background: none;
    border: none;
    border-bottom: 1px solid var(--light-color);
    padding-bottom: 16px;
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
  button {
    background: none;
    border: none;
    position: absolute;
    cursor: pointer;
    right: 0px;
    font-size: 1.6rem;
    img {
      filter: invert(1);
    }
  }
`;

const Keyword = styled.div`
  ul {
    margin-top: 20px;
    display: flex;
    gap: 20px;
    flex-direction: column;
    li {
      color: var(--light-color);
      &:first-child {
        font-weight: bold;
        font-size: 2rem;
      }
    }
  }
`;

const OttSearch = ({ ottSearchClick, setOttSearchClick }) => {
  console.log(ottSearchClick, setOttSearchClick);

  const navigate = useNavigate();
  const inputRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current.value !== "") {
      navigate(`/search/${inputRef.current.value}`);
      setOttSearchClick(false);
      inputRef.current.value = "";
    }
  };
  return (
    <Container>
      <Form
        name="shopping-form"
        action="./search.html"
        method="get"
        onSubmit={onSubmit}
      >
        <Search>
          <input
            className="searchBar"
            type="text"
            name="search"
            placeholder="검색"
            ref={inputRef}
          />
          <button type="submit">
            <img
              src="https://ecimg.cafe24img.com/pg326b45779995089/oiad/web/oiad_renewal/img/oiad-icon-search-mo.svg"
              alt="search"
            />
          </button>
        </Search>
        <Keyword>
          <ul>
            <li>POPULAR KEYWORDS</li>
            <li>
              <Link to="/search/하니" onClick={() => setSearchClick(false)}>
                하니
              </Link>
            </li>
            <li>
              <Link to="/search/신시아" onClick={() => setSearchClick(false)}>
                신시아
              </Link>
            </li>
            <li>
              <Link to="/search/선미" onClick={() => setSearchClick(false)}>
                선미
              </Link>
            </li>
            <li>
              <Link to="/search/고준희" onClick={() => setSearchClick(false)}>
                고준희
              </Link>
            </li>
            <li>
              <Link to="/search/슈화" onClick={() => setSearchClick(false)}>
                슈화
              </Link>
            </li>
          </ul>
        </Keyword>
      </Form>
    </Container>
  );
};

export default OttSearch;
