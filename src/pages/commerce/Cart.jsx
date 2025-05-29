import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import GlobalStyles from "../../styles/GlobalStyles.styles";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ORDER_ITEMS_KEY, CART_ITEMS_KEY } from "../../constants/queryKeys";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";

const PageWrapper = styled.div`
  width: 100%;
  margin-top: 60px;
  min-height: calc(100vh - 250px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 40px;

  @media (max-width: 1024px) {
    padding: 30px 20px;
    gap: 25px;
  }

  @media (max-width: 402px) {
    padding: 20px 16px;
    gap: 20px;
    margin-top: 40px;
  }
`;

const Title = styled.h2`
  font-size: 3.6rem;
  font-weight: 700;
  margin: 0;
  font-family: "EHNormalTrial", sans-serif;

  @media (max-width: 1024px) {
    font-size: 2.8rem;
  }

  @media (max-width: 402px) {
    font-size: 2rem;
  }
`;

const EmptyMessage = styled.div`
  height: 200px;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  color: var(--dark-color);
  text-align: center;
  border: none;
  border-radius: 4px;

  @media (max-width: 1024px) {
    height: 180px;
  }

  @media (max-width: 402px) {
    height: 150px;
    font-size: 1.4rem;
  }
`;

const CartLayout = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
  gap: 60px;

  @media (max-width: 1024px) {
    flex-direction: column;
    width: 100%;
    gap: 40px;
  }

  @media (max-width: 402px) {
    gap: 30px;
  }
`;

const Left = styled.div`
  flex: 0.6;
  margin-top: 60px;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

const Right = styled.div`
  flex: 0.4;
  height: 100%;
  margin-top: 60px;

  @media (max-width: 1024px) {
    margin-top: 0;
    width: 100%;
  }

  @media (max-width: 402px) {
    margin-top: 0;
  }
`;

const OrderSummary = styled.div`
  margin: 10px 0px;
  padding: 30px;
  background-color: white;
  overflow: visible;

  @media (max-width: 1024px) {
    padding: 25px;
  }

  @media (max-width: 402px) {
    padding: 15px;
    margin: 5px 0;
  }
`;

// 상품 목록을 감싸는 스크롤 가능한 컨테이너 개선
const ItemListContainer = styled.div`
  overflow-y: auto !important;
  max-height: ${(props) => (props.itemCount > 3 ? "500px" : "auto")};
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;

  /* 스크롤 가능한 영역임을 알리는 커서 스타일 */
  cursor: ${(props) => (props.itemCount > 3 ? "default" : "auto")};

  /* 크롬, 사파리, 엣지용 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  /* 내부 간격 조정 */
  margin-top: 20px;
  padding-right: 10px;
  padding-bottom: 10px;

  @media (max-width: 1024px) {
    max-height: ${(props) => (props.itemCount > 3 ? "500px" : "auto")};
    margin-top: 15px;
  }

  @media (max-width: 402px) {
    max-height: ${(props) => (props.itemCount > 3 ? "400px" : "auto")};
    margin-top: 10px;
    padding-right: 5px;
  }
`;

const SelectAllBox = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  font-weight: bold;
  font-family: "Pretendard", sans-serif;
  padding: 10px 0;
  margin-bottom: 30px;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;

  @media (max-width: 1024px) {
    font-size: 1.6rem;
    margin-bottom: 20px;
  }

  @media (max-width: 402px) {
    font-size: 1.4rem;
    margin-bottom: 15px;
    padding: 5px 0;
  }
`;

const ItemBox = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
    padding-bottom: 0;
  }

  @media (max-width: 1024px) {
    margin-bottom: 25px;
    padding-bottom: 25px;
  }

  @media (max-width: 402px) {
    flex-direction: row;
    gap: 8px;
    margin-bottom: 20px;
    padding-bottom: 20px;
  }
`;

const Image = styled.img`
  width: 122px;
  height: 122px;
  object-fit: cover;
  margin: 0 8px;

  @media (max-width: 1024px) {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 402px) {
    width: 70px;
    height: 70px;
    margin: 0 5px;
  }
`;

const ItemInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: "EHNormalTrial", sans-serif;

  @media (max-width: 1024px) {
    gap: 6px;
  }

  @media (max-width: 402px) {
    margin-top: 0;
    margin-bottom: auto;
    gap: 4px;
  }
`;

const Brand = styled.div`
  font-size: 1.6rem;
  color: var(--subTitle);

  @media (max-width: 1024px) {
    font-size: 1.5rem;
  }

  @media (max-width: 402px) {
    font-size: 1.3rem;
  }
`;

const Name = styled.div`
  font-size: 1.8rem;
  font-weight: 700;

  @media (max-width: 1024px) {
    font-size: 1.6rem;
  }

  @media (max-width: 402px) {
    font-size: 1.4rem;
  }
`;

const Detail = styled.div`
  font-size: 1.6rem;
  color: var(--subTitle);

  @media (max-width: 1024px) {
    font-size: 1.4rem;
  }

  @media (max-width: 402px) {
    font-size: 1.2rem;
  }
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: auto;

  @media (max-width: 1024px) {
    margin-top: 15px;
  }

  @media (max-width: 402px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    margin-top: 10px;
  }
`;

const PriceBox = styled.div`
  font-size: 2.2rem;
  font-weight: bold;
  font-family: "Pretendard", sans-serif;
  color: var(--dark-color);

  @media (max-width: 1024px) {
    font-size: 2rem;
  }

  @media (max-width: 402px) {
    font-size: 1.6rem;
  }
`;

const ActionBox = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 1024px) {
    gap: 10px;
  }

  @media (max-width: 402px) {
    gap: 8px;
    width: 100%;
    justify-content: flex-end;
  }
`;

// 수정된 수량 조절 컴포넌트 (Order와 동일하게)
const QtyControl = styled.div`
  display: flex;
  border: 1px solid var(--border-color, #ddd);
  height: 36px;

  @media (max-width: 402px) {
    height: 32px;
  }
`;

// 수정된 수량 버튼 스타일
const QtyBtn = styled.button`
  width: 36px;
  height: 34px;
  background: #fff;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;

  &:hover {
    background: #eee;
  }

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 402px) {
    width: 32px;
    height: 30px;
    font-size: 1.2rem;
  }
`;

// 수정된 수량 표시 스타일
const Qty = styled.div`
  width: 40px;
  text-align: center;
  line-height: 36px;
  font-size: 1.4rem;
  font-family: "Pretendard", sans-serif;
  border-left: 1px solid var(--border-color, #ddd);
  border-right: 1px solid var(--border-color, #ddd);

  @media (max-width: 402px) {
    width: 30px;
    line-height: 32px;
    font-size: 1.2rem;
  }
`;

// 쓰레기통 아이콘 래퍼도 일관성을 위해 수정
const TrashWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
  cursor: pointer;
  margin-left: 8px;

  &:hover {
    color: #ff6b6b;
  }

  @media (max-width: 402px) {
    height: 32px;
    width: 32px;
    margin-left: 5px;
  }
`;

const Trash = styled(FaTrashAlt)`
  color: var(--dark-color);
  font-size: 1.8rem;

  @media (max-width: 402px) {
    font-size: 1.6rem;
  }
`;

const PaymentBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: auto;
  margin: 10px 0px;
  padding: 30px;
  background-color: #f8f8f8;
  font-family: "Pretendard", sans-serif;
  border: 1px solid var(--border-color);
  position: sticky;
  top: 20px; /* 상단에서 20px 떨어진 위치에 고정 */

  @media (max-width: 1024px) {
    padding: 25px;
    top: 15px;
  }

  @media (max-width: 402px) {
    padding: 20px;
    margin: 5px 0;
    top: 10px;
  }
`;

const PaymentTitle = styled.h4`
  font-size: 2.2rem;
  font-weight: bold;

  @media (max-width: 1024px) {
    font-size: 2rem;
  }

  @media (max-width: 402px) {
    font-size: 1.8rem;
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.6rem;
  font-weight: 500;
  margin-top: 30px;

  @media (max-width: 1024px) {
    font-size: 1.5rem;
    margin-top: 25px;
  }

  @media (max-width: 402px) {
    font-size: 1.4rem;
    margin-top: 20px;
  }
`;

const Line = styled.hr`
  border: 1px solid var(--border-color);
  margin: 30px 0;

  @media (max-width: 1024px) {
    margin: 25px 0;
  }

  @media (max-width: 402px) {
    margin: 20px 0;
    border-width: 0.5px;
  }
`;

const Total = styled(Row)`
  font-size: 1.6rem;
  font-weight: 700;
  margin-top: auto;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    font-size: 1.5rem;
    margin-bottom: 25px;
  }

  @media (max-width: 402px) {
    font-size: 1.4rem;
    margin-bottom: 20px;
  }
`;

const OrderBtn = styled.button`
  width: 100%;
  padding: 14px 0;
  background: black;
  color: white;
  font-size: 1.8rem;
  font-weight: bold;
  border: none;
  cursor: pointer;
  margin: 0px auto;

  &:disabled {
    background: var(--lightGray, #ccc);
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background: #222;
  }

  @media (max-width: 1024px) {
    font-size: 1.6rem;
    padding: 12px 0;
  }

  @media (max-width: 402px) {
    font-size: 1.4rem;
    padding: 10px 0;
  }
`;

// 로컬 스토리지 헬퍼 함수들
const getCartFromStorage = () => {
  try {
    const cart = localStorage.getItem(CART_ITEMS_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Error getting cart from storage:", error);
    return [];
  }
};

const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to storage:", error);
  }
};

const Cart = () => {
  const itemListRef = useRef(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { currentUser } = useAuth();
  const { cartItems, updateCartItem, removeFromCart, isLoggedIn } = useCart();

  // 로컬 상태로 아이템 관리
  const [items, setItems] = useState([]);

  // 장바구니 데이터 로드
  useEffect(() => {
    setItems(cartItems);
  }, [cartItems]);

  // 스크롤 이벤트 핸들러 설정
  useEffect(() => {
    const handleScroll = (e) => {
      // 기본 스크롤 동작 유지
    };

    // 컴포넌트 마운트 시 스크롤 이벤트 리스너 등록
    const listContainer = itemListRef.current;
    if (listContainer && items.length > 3) {
      listContainer.addEventListener("wheel", handleScroll, { passive: true });
    }

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      if (listContainer && items.length > 3) {
        listContainer.removeEventListener("wheel", handleScroll);
      }
    };
  }, [items.length]);

  // 장바구니 업데이트 mutation
  const updateCartMutation = useMutation({
    mutationFn: (updatedItems) => {
      const promises = updatedItems.map((item) => {
        if (item._isDeleted) {
          return removeFromCart.mutate(item.id);
        } else {
          return updateCartItem.mutate({
            itemId: item.id,
            quantity: item.quantity,
            selected: item.selected,
          });
        }
      });

      return Promise.all(promises).then(() =>
        updatedItems.filter((item) => !item._isDeleted)
      );
    },
    onSuccess: () => {
      // 업데이트 완료 후 추가 작업이 필요하면 여기에 작성
    },
  });

  // 주문하기 mutation
  const orderMutation = useMutation({
    mutationFn: (selectedItems) => {
      return Promise.resolve(selectedItems);
    },
    onSuccess: (selectedItems) => {
      // 주문 아이템 정보를 React Query 캐시에 저장
      queryClient.setQueryData([ORDER_ITEMS_KEY], selectedItems);
      // Payment 페이지로 이동
      navigate("/payment");
    },
  });

  // 전체 선택 토글
  const toggleSelectAll = () => {
    const allSelected = items.every((item) => item.selected);
    const updatedItems = items.map((item) => ({
      ...item,
      selected: !allSelected,
    }));
    setItems(updatedItems);
    updateCartMutation.mutate(updatedItems);
  };

  // 개별 아이템 선택 토글
  const toggleSelectItem = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setItems(updatedItems);
    updateCartMutation.mutate(updatedItems);
  };

  // 수량 변경 핸들러
  const changeQty = (id, diff) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + diff) }
        : item
    );
    setItems(updatedItems);
    updateCartMutation.mutate(updatedItems);
  };

  // 아이템 제거 핸들러
  const removeItem = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, _isDeleted: true } : item
    );
    setItems(items.filter((item) => item.id !== id));
    updateCartMutation.mutate(updatedItems);
  };

  const selectedItems = items.filter((item) => item.selected);
  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 주문하기 버튼 클릭 핸들러 - 여기서만 로그인 확인
  const handleOrderClick = () => {
    if (selectedItems.length === 0) {
      alert("주문할 상품을 선택해주세요.");
      return;
    }

    // 로그인 상태 확인 - 비로그인이면 로그인 페이지로 이동
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/login");
      return;
    }

    // 선택된 아이템 정보 가공
    const orderData = selectedItems.map((item) => ({
      id: item.id,
      brand: item.brand,
      name: item.name,
      detail: item.detail,
      price: item.price,
      image: item.image,
      quantity: item.quantity,
    }));

    // mutation 실행
    orderMutation.mutate(orderData);
  };

  return (
    <PageWrapper>
      <GlobalStyles />
      <Title>SHOPPING CART</Title>
      <CartLayout>
        <Left>
          {items.length === 0 ? (
            <EmptyMessage>현재 장바구니에 담긴 상품이 없습니다.</EmptyMessage>
          ) : (
            <OrderSummary>
              <SelectAllBox>
                <input
                  type="checkbox"
                  checked={
                    items.length > 0 && items.every((item) => item.selected)
                  }
                  onChange={toggleSelectAll}
                />
                <span style={{ marginLeft: "8px" }}>
                  전체 선택 ({selectedItems.length}/{items.length})
                </span>
              </SelectAllBox>

              <ItemListContainer
                ref={itemListRef}
                itemCount={items.length}
                className="scrollable-container"
              >
                {items.map((item) => (
                  <ItemBox key={item.id}>
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => toggleSelectItem(item.id)}
                    />
                    <Image src={item.image} alt={item.name} />
                    <ItemInfo>
                      <Brand>{item.brand}</Brand>
                      <Name>{item.name}</Name>
                      <Detail>{item.detail}</Detail>
                      <BottomRow>
                        <PriceBox>KRW {item.price.toLocaleString()}</PriceBox>
                        <ActionBox>
                          <QtyControl>
                            <QtyBtn
                              onClick={() => changeQty(item.id, -1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </QtyBtn>
                            <Qty>{item.quantity}</Qty>
                            <QtyBtn onClick={() => changeQty(item.id, 1)}>
                              +
                            </QtyBtn>
                          </QtyControl>
                          <TrashWrapper onClick={() => removeItem(item.id)}>
                            <Trash />
                          </TrashWrapper>
                        </ActionBox>
                      </BottomRow>
                    </ItemInfo>
                  </ItemBox>
                ))}
              </ItemListContainer>
            </OrderSummary>
          )}
        </Left>

        <Right>
          <PaymentBox>
            <PaymentTitle>결제 정보</PaymentTitle>
            <Row>
              <div>상품 총합 금액</div>
              <div>KRW {totalPrice.toLocaleString()}</div>
            </Row>
            <Row>
              <div>할인 적용 금액</div>
              <div>KRW 0</div>
            </Row>
            <Row>
              <div>배송비</div>
              <div>KRW 0</div>
            </Row>
            <Line />
            <Total>
              <div>상품 금액 합계</div>
              <div>KRW {totalPrice.toLocaleString()}</div>
            </Total>
            <OrderBtn
              disabled={selectedItems.length === 0}
              onClick={handleOrderClick}
            >
              주문하기
            </OrderBtn>
          </PaymentBox>
        </Right>
      </CartLayout>
    </PageWrapper>
  );
};

export default Cart;
