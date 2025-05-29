import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css";
import { StarData } from "../../StarData";
import Pagination from "react-js-pagination";

const Container = styled.div`
  padding: 160px 3%;
  background: var(--dark-color);
  color: var(--light-color);
  display: flex;
  flex-direction: column;
  gap: 40px;
`;
const Title = styled.h3`
  font-size: 7rem;
  letter-spacing: -4px;
  font-family: "EHNormalTrial";
  @media screen and (max-width: 1024px) {
    font-size: 4rem;
    letter-spacing: -2px;
  }
`;

const FilterWrap = styled.div`
  display: flex;
  justify-content: space-between;
  /* padding-left: 10px; */
  border: 1px solid var(--border-color);
`;
const Filter = styled.ul`
  display: flex;
  font-family: "EHNormalTrial";
  align-items: center;
  font-size: 1.6rem;
  transition: all 0.5s;
  li {
    background: var(--dark-color);
    color: var(--light-color);
    padding: 14px 20px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      color: var(--light-color);
      background: var(--dark-color);
      font-weight: 500;
    }
    &.active {
      background: var(--light-color);
      color: var(--dark-color);
      font-weight: 500;
    }
  }
  @media (max-width: 1024px) {
    li {
      padding: 10px 14px;
      font-size: 1.4rem;
    }
  }
`;

const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
  :hover {
    img {
      transform: scale(0.9);
    }
  }
  &.g01 {
    grid-area: g01;
  }
  &.g02 {
    grid-area: g02;
  }
  &.g03 {
    grid-area: g03;
  }
  &.g04 {
    grid-area: g04;
  }
  &.g05 {
    grid-area: g05;
  }
  &.g06 {
    grid-area: g06;
  }
  &.g07 {
    grid-area: g07;
  }
  &.g08 {
    grid-area: g08;
  }
  &.g09 {
    grid-area: g09;
  }
  &.g10 {
    grid-area: g10;
  }
  /* &.g11 {
    grid-area: g11;
  } */
`;
const FilterItemImgWrap = styled.div`
  width: 100%;
`;
const FilterItemImg = styled.img`
  width: 100%;
  transition: all 0.3s ease-in-out;
`;
const FilterItemText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const FilterItemName = styled.p`
  font-size: 1.8rem;
  padding-bottom: 20px;
`;

const PaginationWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ul {
    display: flex;
    li {
      width: 30px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid var(--border-color);
      border-right: none;
      font-family: "Pretendard";
      &:last-child {
        border-right: 1px solid var(--border-color);
      }
      &.active {
        color: var(--dark-color);
        background: var(--light-color);
      }
      a {
      }
    }
  }
`;

const Loading = styled.div`
  width: 100%;
  height: 100vh;
  background: var(--dark-color);
  color: var(--light-color);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Star = () => {
  const [selectedFilter, setSelectedFilter] = useState("ALL");
  const navigate = useNavigate();
  const [page, setPage] = useState(1); //페이지 설정
  const [items, setItems] = useState(25); //한페이지에 보여줄 데이터 갯수

  // useEffect(() => setPage(1));

  const itemClick = (e) => {
    const itemValue = e.currentTarget.getAttribute("value");
    navigate(`${itemValue}`);
  };
  const breakpointColumnsObj = {
    default: 5,
    1100: 3,
    700: 2,
  };
  const { isLoading, data } = StarData();

  const filterArrs = ["ALL", "ACTOR", "MUSICIAN", "SPORTS"];

  const allProducts = data?.artists?.map((artist) => artist).flat() || [];
  console.log(allProducts);
  const filteredData =
    selectedFilter === "ALL"
      ? allProducts
      : allProducts.filter(
          (artist) =>
            artist.jobCategory.toLowerCase() === selectedFilter.toLowerCase()
        );

  const handlePageChange = (page) => {
    //페이지 바뀔때 함수
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(page);
  };
  const length = filteredData.length; //전체 데이터 갯수

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 767) {
        setItems(16);
      } else if (window.innerWidth < 1024) {
        setItems(18);
      } else {
        setItems(25);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <Container>
          <Title>Star ZIP</Title>
          <FilterWrap>
            <Filter>
              {filterArrs.map((arr) => (
                <li
                  className={selectedFilter === arr ? "active" : ""}
                  onClick={() => {
                    setSelectedFilter(arr);
                    setPage(1);
                  }}
                  key={arr}
                >
                  {arr}
                </li>
              ))}
            </Filter>
          </FilterWrap>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {filteredData
              .slice((page - 1) * items, page * items)
              .map((artist, i) => (
                <FilterItem
                  className="g01"
                  onClick={itemClick}
                  value={artist.artistName}
                  key={i}
                >
                  <FilterItemImgWrap
                    style={{
                      backgroundImage: `url('${artist.artistImg}')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <FilterItemImg src={artist.artistImg} />
                  </FilterItemImgWrap>
                  <FilterItemText>
                    <FilterItemName>{artist.artistName}</FilterItemName>
                  </FilterItemText>
                </FilterItem>
              ))}
          </Masonry>
          <PaginationWrap>
            <Pagination
              activePage={page} //현재 페이지
              itemsCountPerPage={items} //페이지당 아이템 갯수
              totalItemsCount={length} //전체 아이템 갯수
              pageRangeDisplayed={5} //한번에 보여지는 페이지 range
              onChange={handlePageChange} //페이지 바뀔때 핸들링하는 함수
              // hideNavigation={true} //navigation 버튼 숨기기(prev page, next page)
              hideFirstLastPages={true} //첫페이지, 끝페이지 버튼 숨기기
            />
          </PaginationWrap>
        </Container>
      )}
    </>
  );
};

export default Star;
