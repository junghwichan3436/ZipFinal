import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StarData } from "../../StarData";
import Pagination from "react-js-pagination";

const Container = styled.div`
  margin-top: 100px;
  background: var(--light-color);
  padding: 60px 3% 100px 3%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
`;
const FilterTitle = styled.h3`
  font-size: 7rem;
  letter-spacing: -4px;
  font-family: "EHNormalTrial";
  @media screen and (max-width: 1024px) {
    font-size: 4rem;
    letter-spacing: -2px;
  }
`;
const SearchResult = styled.div`
  font-size: 2.4rem;
  span {
    font-weight: bold;
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
  padding: 14px 20px;
  li {
    color: var(--dark-color);
    background: var(--light-color);
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      color: var(--light-color);
      background: var(--dark-color);
      font-weight: 500;
    }
    &.active {
      color: var(--light-color);
      background: var(--dark-color);
      font-weight: 500;
    }
  }
`;
const FilterSelect = styled.select`
  border: none;
  border-left: 1px solid var(--border-color);
  padding-right: 30px;
  padding-left: 10px;
`;
const FilterContent = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
  position: relative;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-color);
  padding-right: 20px;
  cursor: pointer;
  &:nth-child(5n) {
    border-right: none;
    @media (max-width: 1024px) {
      border-right: 1px solid var(--border-color);
    }
  }
  &:last-child {
    border-right: none;
  }
  @media (max-width: 1024px) {
    &:nth-child(3n) {
      border-right: none;
      @media (max-width: 767px) {
        border-right: 1px solid var(--border-color);
      }
    }
  }
  @media (max-width: 767px) {
    &:nth-child(2n) {
      border-right: none;
    }
  }
`;
const FilterItemImgWrap = styled.div`
  width: 100%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
`;
const FilterItemImg = styled.img`
  padding: 30px;
  width: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  background: var(--light-color);
  transition: all 0.5s ease;
  /* filter: brightness(0.95); */
  &:hover {
    transform: scale(1.1);
  }
`;
const FilterItemText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  min-height: 120px;
  padding: 10px 10px;
`;
const FilterItemPick = styled.span`
  display: inline-block;
  color: var(--light-color);
  background: var(--dark-color);
  font-weight: 400;
  z-index: 1;
  font-size: 1.2rem;
  line-height: 1.6rem;
  text-align: center;
  padding: 8px;
  position: absolute;
  right: 0;
  top: 0;
`;
const FilterItemName = styled.p`
  font-size: 1.8rem;
  line-height: 2.4rem;
  margin: 10px 0;
  font-weight: 600;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 1024px) {
    font-size: 1.6rem;
  }
`;
const FilterItemBrand = styled.li`
  color: var(--subTitle);
  font-size: 1.4rem;
  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }
`;
const FilterItemPrice = styled.li`
  letter-spacing: 0.2px;
  color: var(--subTitle);
  font-size: 1.4rem;
  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
  }
`;
const NotFound = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30.3vh;
  grid-column: 1 / -1;
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
        background: var(--dark-color);
        color: var(--light-color);
      }
      a {
      }
    }
  }
`;

const Search = () => {
  const [sortOption, setSortOption] = useState("신상품순");
  const { isLoading, data } = StarData();
  const { name } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(1); //페이지 설정
  const [items, setItems] = useState(25); //한페이지에 보여줄 데이터 갯수

  const onSelectChange = (e) => {
    setSortOption(e.target.value);
  };

  useEffect(() => {
    setSortOption("신상품순");
    setPage(1);
  }, [name]);

  const allProducts =
    data?.artists?.flatMap((artist) => {
      return artist.products
        .filter(
          (product) =>
            product.itemName.toLowerCase().includes(name.toLowerCase()) ||
            product.brandEng.toLowerCase().includes(name.toLowerCase()) ||
            product.brand.toLowerCase().includes(name.toLowerCase()) ||
            artist.artistName.includes(name)
        )
        .map((product) => ({
          ...product,
          artistName: artist.artistName,
        }));
    }) || [];
  const sortedProducts = [...allProducts].sort((a, b) => {
    if (sortOption === "신상품순") {
      return b.releasedDate - a.releasedDate;
    } else if (sortOption === "가격높은순") {
      return b.price - a.price;
    } else if (sortOption === "가격낮은순") {
      return a.price - b.price;
    } else if (sortOption === "판매낮은순") {
      return a.sellNum - b.sellNum;
    }
  });

  const handlePageChange = (page) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(page);
  };
  const length = sortedProducts.length; //전체 데이터 갯수

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
    <Container>
      <FilterTitle>Search ZIP</FilterTitle>
      <SearchResult>
        <span>"{name}"</span>에 대한 검색결과입니다.
      </SearchResult>
      <FilterWrap>
        <Filter>
          <p>
            검색결과 <spaan>{sortedProducts.length}</spaan>건
          </p>
        </Filter>
        <FilterSelect onChange={onSelectChange} value={sortOption}>
          <option value="가격순">신상품순</option>
          <option value="판매많은순">판매많은순</option>
          <option value="가격높은순">가격높은순</option>
          <option value="가격낮은순">가격낮은순</option>
        </FilterSelect>
      </FilterWrap>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <FilterContent>
          {sortedProducts.length > 0 ? (
            sortedProducts
              .slice((page - 1) * items, page * items)
              .map((product, j) => (
                <FilterItem
                  key={j}
                  onClick={() => navigate(`/detail/${product.itemName}`)}
                >
                  <FilterItemImgWrap>
                    <FilterItemPick>
                      {product.artistName}
                      <br />
                      PICK
                    </FilterItemPick>
                    <FilterItemImg src={product.detailImg.img01} />
                  </FilterItemImgWrap>
                  <FilterItemText>
                    <FilterItemBrand>{product.brand}</FilterItemBrand>
                    <FilterItemName>{product.itemName}</FilterItemName>
                    <FilterItemPrice>
                      KRW {product.price.toLocaleString()}
                    </FilterItemPrice>
                  </FilterItemText>
                </FilterItem>
              ))
          ) : (
            <NotFound>검색결과가 없습니다.</NotFound>
          )}
        </FilterContent>
      )}
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
  );
};

export default Search;
