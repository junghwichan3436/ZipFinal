import { useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  transition: all 0.3s ease-in-out;
  z-index: -1;
  &.active {
    z-index: 3;
    .searchBg {
      opacity: 1;
    }
    form {
      right: 0;
    }
  }
  @media screen and (max-width: 1024px) {
    form {
      width: 100%;
    }
  }
`;
const SearchBg = styled.div`
  width: 100%;
  height: 100vh;
  opacity: 0;
  left: 0;
  top: 0;
  transition: all 0.3s ease-in-out;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
`;
const Form = styled.form`
  width: 400px;
  height: 100vh;
  position: absolute;
  right: -100%;
  top: 0;
  padding: 100px 20px 0 20px;
  background: var(--light-color);
  transition: all 0.3s ease-in-out;
`;
const Search = styled.div`
  input {
    width: 100%;
    background: none;
    border: none;
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 20px;
    &::placeholder {
      opacity: 1;
      transition: all 0.3s;
      /* border-bottom: 1px solid var(--border-color); */
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
    right: 20px;
    font-size: 1.6rem;
    /* border-bottom: 1px solid var(--border-color); */
  }
`;

const Keyword = styled.div`
  ul {
    margin-top: 20px;
    display: flex;
    gap: 20px;
    flex-direction: column;
    li {
      color: var(--dark-color);
      &:first-child {
        font-weight: bold;
        font-size: 2rem;
      }
    }
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
  right: 20px;
  span {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    border-bottom: 1px solid var(--dark-color);
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
const SearchComp = ({ searchClick, setSearchClick }) => {
  // const [inputVal, setInputVal] = useState("");
  const navigate = useNavigate();
  const inputRef = useRef();
  const closeBtnClick = (e) => {
    e.preventDefault();
    setSearchClick(false);
  };
  const bgClick = () => {
    setSearchClick(false);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current.value !== "") {
      navigate(`search/${inputRef.current.value}`);
      setSearchClick(false);
      inputRef.current.value = "";
    }
  };
  return (
    <Container className={searchClick ? "active" : null}>
      <SearchBg className="searchBg" onClick={bgClick}></SearchBg>
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
        <CloseBtn onClick={closeBtnClick}>
          <span></span>
          <span></span>
        </CloseBtn>
      </Form>
    </Container>
  );
};

export default SearchComp;
