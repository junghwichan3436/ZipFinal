import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import DetailSwiper from "../../components/detail/DetailSwiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams, useNavigate } from "react-router-dom";
import { StarData } from "../../StarData";

// 페이지 연동시 필요한 부분 (재기추가)
import { useCart } from "../../hooks/useCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ORDER_ITEMS_KEY } from "../../constants/queryKeys";
import useAuth from "../../hooks/useAuth";

const Container = styled.div``;
const Wrapper = styled.div`
  display: flex;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`;
const SwiperBox = styled.div`
  width: 50%;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;
const TextBox = styled.div`
  width: 50%;
  height: 100vh;
  position: sticky;
  align-self: flex-start;
  top: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 5%;
  gap: 40px;
  @media screen and (max-width: 1024px) {
    max-height: 500px;
    width: 100%;
    position: relative;
    padding: 0 3%;
    margin-top: 50px;
  }
`;

const ItemName = styled.h3`
  font-size: 3.6rem;
  font-weight: bold;
  @media screen and (max-width: 1024px) {
    font-size: 3rem;
  }
`;
const ItemPrice = styled.div`
  font-size: 1.6rem;
  @media screen and (max-width: 1024px) {
    font-size: 1.4rem;
  }
`;
const ItemButton = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  button {
    font-family: "Prentendard" !important;
    width: 50%;
    border: none;
    padding: 16px;
    font-size: 1.6rem;
    cursor: pointer;
    &:nth-child(1) {
      background: var(--light-color);
      border: 1px solid var(--border-color);
    }
    &:nth-child(2) {
      background: var(--dark-color);
      color: var(--light-color);
    }
  }
`;
const TotalPrice = styled.div`
  font-size: 1.4rem;
`;
const ItemCount = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  button {
    font-size: 1.4rem;
    border: none;
    background: none;
    border: 1px solid var(--border-color);
    cursor: pointer;
    font-family: "Pretendard";
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    padding: 0;
    align-items: center;
    &:first-of-type {
      border-right: none;
    }
  }
  p {
    border: 1px solid var(--border-color);
    border-right: none;
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const ItemDesc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  line-height: 20px;
  p {
    font-size: 1.4rem;
    cursor: pointer;
  }
  span {
    font-size: 1.2rem;
    height: 0;
  }
`;

const RelateProducts = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 80px 3%;
  margin-bottom: 80px;
  @media screen and (max-width: 1024px) {
    margin-top: 80px;
  }
  .RelateItemWrap {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .RelateItem {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }
  .swiper {
    .swiper-wrapper {
      .swiper-slide {
        cursor: pointer;
      }
      .swiper-slide:last-child {
        div {
          border-right: none;
        }
      }
    }
  }
`;
const RelateProductsTitle = styled.h3`
  font-size: 3.2rem;
  @media screen and (max-width: 1024px) {
    font-size: 2.4rem;
  }
`;
const FilterItem = styled.div`
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--border-color);
  padding-right: 20px;
  /* &:last-child {
    border-right: none;
  } */
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
  padding: 10px 10px;
  min-height: 120px;
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
const DescWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  @media screen and (max-width: 1024px) {
    gap: 60px;
  }
  @media screen and (max-width: 767px) {
    gap: 80px;
  }
`;
const Loading = styled.div`
  width: 100%;
  height: 100vh;
  background: var(--light-color);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Detail = () => {
  const [quantity, setQuantity] = useState(1);
  const [swiperActive, setSwipierActive] = useState(false);
  const { itemName } = useParams();
  const { isLoading, data } = StarData();
  const navigate = useNavigate();

  //재기 추가(페이지 연동)
  const [count, setCount] = useState(1);
  const { addToCart } = useCart();
  const queryClient = useQueryClient();

  // 인증 관련 - 로그인 상태만 확인
  const { currentUser } = useAuth();

  // 수량 증가 함수
  const increaseCount = () => {
    setCount((prev) => prev + 1);
  };

  // 수량 감소 함수
  const decreaseCount = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  // 바로 주문하기 mutation
  const orderNowMutation = useMutation({
    mutationFn: (orderItem) => {
      return Promise.resolve([orderItem]);
    },
    onSuccess: (orderItems) => {
      // 주문 정보를 리액트 쿼리 캐시에 저장
      queryClient.setQueryData([ORDER_ITEMS_KEY], orderItems);
      // 결제 페이지로 이동
      navigate("/payment");
    },
  });

  // 장바구니 추가 핸들러
  const handleAddToCart = (product, artist) => {
    // 로그인 확인 필요 없음 - 비로그인 상태도 장바구니 사용 가능
    let imagePath = "";
    if (product.detailImg) {
      imagePath = Object.values(product.detailImg)[0] || "";
    }

    const cartItem = {
      id: product.productId || Date.now(),
      brand: product.brand || "BRAND",
      name: product.itemName,
      detail: product.description?.substring(0, 30) + "..." || "",
      price: product.price,
      image: imagePath, // 이미지 경로
      quantity: count,
      selected: true,
    };

    addToCart.mutate(cartItem, {
      onSuccess: () => {
        // 성공 시 알림
        alert("상품이 장바구니에 추가되었습니다.");
        window.dispatchEvent(new CustomEvent("cart-updated"));
      },
    });
  };

  // 바로 주문하기 핸들러
  const handleOrderNow = (product, artist) => {
    // 로그인 여부 확인
    if (!currentUser) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }

    let imagePath = "";
    if (product.detailImg) {
      imagePath = Object.values(product.detailImg)[0] || "";
    }

    const orderItem = {
      id: product.productId || Date.now(),
      brand: product.brand || "BRAND",
      name: product.itemName,
      detail: product.description?.substring(0, 30) + "..." || "",
      price: product.price,
      image: imagePath,
      quantity: count,
      selected: true,
      option: product.keyword || "",
    };

    orderNowMutation.mutate(orderItem);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSwipierActive(true);
      } else {
        setSwipierActive(false);
      }
    };
    handleResize();
    window.addEventListener("resize", () => {
      handleResize();
    });

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const detailData = data?.artists?.map((artist) => artist).flat() || [];
  const allProducts =
    data?.artists?.map((artist) => artist.products).flat() || [];
  const product = allProducts.find((product) => product.itemName === itemName);
  const relatedProducts = allProducts.filter(
    (item) => item.keyword === product.keyword
  );
  const relatedItems = relatedProducts.slice(0, 8);

  const descOpen = (e) => {
    const next = e.target.nextElementSibling;
    next.classList.toggle("active");
  };

  return (
    <>
      {isLoading ? (
        <Loading>Loading...</Loading>
      ) : (
        <Container>
          {data?.artists?.map((artist) => {
            const product = artist.products.find(
              (product) => product.itemName === itemName
            );
            if (product === undefined) {
              return null;
            }
            return (
              <Wrapper key={product.itemName}>
                <SwiperBox>
                  <DetailSwiper enabled={swiperActive} product={product} />
                </SwiperBox>
                <TextBox>
                  <p>{artist.artistName} PICK</p>
                  <ItemName>{product.itemName}</ItemName>
                  <ItemPrice>
                    KRW {product.price.toLocaleString("ko-KR")}
                  </ItemPrice>
                  <ItemCount>
                    <button onClick={decreaseCount}>-</button>
                    <p>{count}</p>
                    <button onClick={increaseCount}>+</button>
                  </ItemCount>
                  <TotalPrice>
                    TOTAL: KRW{" "}
                    <span>
                      {(product.price * count).toLocaleString("ko-KR")}
                    </span>
                    (<span>{count}</span>)개
                  </TotalPrice>
                  <ItemButton>
                    <button onClick={() => handleAddToCart(product, artist)}>
                      ADD TO CART
                    </button>
                    <button onClick={() => handleOrderNow(product, artist)}>
                      ORDER NOW
                    </button>
                  </ItemButton>
                  <DescWrap>
                    <ItemDesc>
                      <p>DESCRIPTION</p>
                      <span>{product.description}</span>
                    </ItemDesc>
                    <ItemDesc>
                      <p>EXCHANGE</p>
                      <span>
                        해당 상품은 수령일로부터 7일 이내에 미사용/미훼손 상태일
                        경우 교환이 가능하며, 왕복 배송비는 고객 부담입니다.
                        보다 정확한 안내를 원하신다면 고객센터(☎️0000-0000)로
                        연락 부탁드립니다.
                      </span>
                    </ItemDesc>
                  </DescWrap>
                </TextBox>
              </Wrapper>
            );
          })}
          <RelateProducts>
            <RelateProductsTitle>Related Products</RelateProductsTitle>
            <Swiper
              className="RelateItemWrap"
              breakpoints={{
                1920: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                540: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                0: {
                  slidesPerView: 2, // ✅ 모바일용 설정 추가 (예: 1개 보여줌)
                  spaceBetween: 20,
                },
              }}
            >
              {relatedItems.map((item, i) => (
                <SwiperSlide
                  key={i}
                  className="RelateItem"
                  onClick={() => {
                    navigate(`/detail/${item.itemName}`);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    setQuantity(1);
                  }}
                >
                  <FilterItem className={i}>
                    <FilterItemImgWrap>
                      <FilterItemImg src={item.detailImg.img01} />
                    </FilterItemImgWrap>
                    <FilterItemText>
                      <FilterItemBrand>{item.brand}</FilterItemBrand>
                      <FilterItemName>{item.itemName}</FilterItemName>
                      <FilterItemPrice>
                        KRW {item.price.toLocaleString()}
                      </FilterItemPrice>
                    </FilterItemText>
                  </FilterItem>
                </SwiperSlide>
              ))}
            </Swiper>
          </RelateProducts>
        </Container>
      )}
    </>
  );
};

export default Detail;
