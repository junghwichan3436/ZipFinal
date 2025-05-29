import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";

const OrderSection = styled.div`
  flex: 4;
  position: sticky;
  top: 20px;
  align-self: flex-start;
  height: fit-content;
  order: 2;

  @media screen and (max-width: 1024px) {
    flex: none;
    width: 100%;
    position: relative;
    top: 0;
    order: 1;
    border-radius: 4px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: bold;
  margin: 15px 0;

  @media screen and (max-width: 1024px) {
    font-size: 1.5rem;
    margin: 5px 0 15px 0;
  }

  @media screen and (max-width: 402px) {
    font-size: 1.5rem;
    margin: 5px 0 10px 0;
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: #eee;
  margin: 20px 0;
`;

const OrderSummary = styled.div`
  margin-top: 15px;
`;

// 카트 페이지 스타일을 적용한 새 스타일 컴포넌트
const SummaryTable = styled.div`
  margin-bottom: 20px;
  background-color: #f8f8f8;
  padding: 30px;
  border: 1px solid var(--border-color, #ddd);
  border-radius: 4px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 1.4rem;
`;

const SummaryLabel = styled.span`
  font-size: 1.5rem;

  @media screen and (max-width: 402px) {
    font-size: 1.3rem;
  }
`;

const SummaryValue = styled.span`
  font-size: 1.4rem;
  font-weight: ${(props) => (props.bold ? "bold" : "normal")};

  @media screen and (max-width: 402px) {
    font-size: 1.3rem;
  }
`;

// 제품 리스트 영역도 스타일 업데이트
const ProductList = styled.div`
  margin-top: 20px;
  max-height: 500px;
  overflow-y: auto;
  background-color: #fff;
  padding: 30px;
  border: 1px solid var(--border-color, #ddd);
  border-radius: 4px;

  @media screen and (max-width: 1024px) {
    max-height: 300px;
    padding: 20px;
  }

  @media screen and (max-width: 402px) {
    max-height: 250px;
    padding: 15px;
  }
`;

const ProductItem = styled.div`
  display: flex;
  margin-bottom: 30px;
  align-items: center;

  @media screen and (max-width: 402px) {
    margin-bottom: 20px;
  }
`;

const ProductImage = styled.div`
  width: 80px;
  height: 80px;
  margin-right: 15px;

  @media screen and (max-width: 402px) {
    width: 70px;
    height: 70px;
    margin-right: 10px;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProductBrand = styled.p`
  font-size: 1.2rem;
  font-weight: normal;
  margin-bottom: 3px;
`;

const ProductName = styled.p`
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 5px;

  @media screen and (max-width: 402px) {
    font-size: 1.3rem;
  }
`;

const ProductOption = styled.p`
  font-size: 1.2rem;
  color: #999;
  margin-bottom: 10px;

  @media screen and (max-width: 402px) {
    font-size: 1.1rem;
    margin-bottom: 8px;
  }
`;

const ProductPrice = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  margin-right: 10px;

  @media screen and (max-width: 402px) {
    font-size: 1.2rem;
  }
`;

const PriceQuantityRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5px;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  width: 24px;
  height: 24px;
  border: 1px solid #ddd;
  background: #fff;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media screen and (max-width: 402px) {
    width: 22px;
    height: 22px;
    font-size: 1.2rem;
  }
`;

const QuantityInput = styled.input`
  width: 30px;
  height: 24px;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  border-left: none;
  border-right: none;
  text-align: center;
  font-size: 1.2rem;

  @media screen and (max-width: 402px) {
    width: 25px;
    height: 22px;
    font-size: 1.1rem;
  }
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--dark-color, #333);

  &:hover {
    color: #000;
  }

  @media screen and (max-width: 402px) {
    margin-left: 5px;
  }
`;

// 빈 장바구니 메시지 스타일
const EmptyMessage = styled.div`
  height: 100px;
  margin: 10px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  color: var(--dark-color, #555);
  text-align: center;

  @media (max-width: 767px) {
    height: 80px;
    font-size: 1.4rem;
  }
`;

const DiscountRow = styled(SummaryRow)`
  color: #e84118;
`;

const DiscountValue = styled(SummaryValue)`
  color: #e84118;
`;

const DiscountLabel = styled(SummaryLabel)`
  display: flex;
  align-items: center;
`;

const CouponName = styled.span`
  font-size: 1.2rem;
  color: #666;
  margin-left: 10px;

  @media screen and (max-width: 402px) {
    font-size: 1.1rem;
  }
`;

const Order = ({
  orderItems: propOrderItems = [],
  quantities,
  setQuantities,
  discount,
  couponName,
}) => {
  // props의 orderItems가 있으면 사용, 없으면 기본 데이터 사용
  const [items, setItems] = useState(
    propOrderItems.length > 0 ? propOrderItems : []
  );

  // props로 받은 주문 아이템이 변경되면 상태 업데이트
  useEffect(() => {
    if (propOrderItems.length > 0) {
      setItems(propOrderItems);
    } else {
      // 주문 아이템이 없으면 빈 배열로 초기화
      setItems([]);
    }
  }, [propOrderItems]);

  // 가격 계산
  const calculateTotalPrice = () => {
    return items.reduce(
      (sum, item) => sum + item.price * (quantities[item.id] || 1),
      0
    );
  };

  const totalPrice = calculateTotalPrice();

  // 할인 금액 계산
  const calculateDiscountAmount = () => {
    if (!discount?.applied) return 0;

    if (discount.type === "percentage") {
      return Math.floor((totalPrice * discount.rate) / 100);
    }

    return discount.amount;
  };

  const discountAmount = calculateDiscountAmount();
  const finalPrice = totalPrice - discountAmount;

  const handleQuantityChange = (id, change) => {
    setQuantities((prev) => {
      const newQuantity = Math.max(1, (prev[id] || 1) + change);
      return { ...prev, [id]: newQuantity };
    });
  };

  // 아이템 삭제 함수 추가
  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));

    // quantities에서도 해당 아이템 제거
    setQuantities((prev) => {
      const newQuantities = { ...prev };
      delete newQuantities[id];
      return newQuantities;
    });
  };

  // 쿠폰 이름에서 부분 텍스트 추출
  const getShortCouponName = () => {
    if (!couponName || couponName === "선택 없음" || !discount?.applied)
      return "";

    if (couponName.includes("MID SEASON")) {
      return "시즌 할인";
    } else if (couponName.includes("BIRTH DAY")) {
      return "생일 할인";
    } else if (couponName.includes("WELCOME")) {
      return "웰컴 할인";
    }

    return "할인 쿠폰";
  };

  return (
    <OrderSection>
      <SectionTitle>결제 정보 요약</SectionTitle>
      <SummaryTable>
        {items.length === 0 ? (
          <EmptyMessage>상품이 비었습니다.</EmptyMessage>
        ) : (
          <>
            <SummaryRow>
              <SummaryLabel>상품 총합 금액</SummaryLabel>
              <SummaryValue>KRW {totalPrice.toLocaleString()}</SummaryValue>
            </SummaryRow>

            {discount?.applied && (
              <DiscountRow>
                <DiscountLabel>
                  할인 적용 금액
                  <CouponName>
                    ({getShortCouponName()} {discount.rate}%)
                  </CouponName>
                </DiscountLabel>
                <DiscountValue>
                  - KRW {discountAmount.toLocaleString()}
                </DiscountValue>
              </DiscountRow>
            )}

            {!discount?.applied && (
              <SummaryRow>
                <SummaryLabel>할인 적용 금액</SummaryLabel>
                <SummaryValue>KRW 0</SummaryValue>
              </SummaryRow>
            )}

            <SummaryRow>
              <SummaryLabel>배송비</SummaryLabel>
              <SummaryValue>KRW 0</SummaryValue>
            </SummaryRow>
            <Divider />
            <SummaryRow>
              <SummaryLabel large>상품 금액 합계</SummaryLabel>
              <SummaryValue large bold>
                KRW {finalPrice.toLocaleString()}
              </SummaryValue>
            </SummaryRow>
          </>
        )}
      </SummaryTable>

      <SectionTitle>주문 상품</SectionTitle>
      <ProductList>
        {items.length === 0 ? (
          <EmptyMessage>상품이 비었습니다.</EmptyMessage>
        ) : (
          items.map((item) => (
            <ProductItem key={item.id}>
              <ProductImage>
                <img
                  src={item.image}
                  alt={item.name}
                  width="80"
                  height="90"
                  onError={(e) => {
                    console.error("Image load error:", item.image);
                    e.target.src = "/imgs/default_product.png"; // 이미지 로드 실패 시 대체 이미지 표시
                  }}
                />
              </ProductImage>
              <ProductInfo>
                <ProductBrand>{item.brand}</ProductBrand>
                <ProductName>{item.name}</ProductName>
                <ProductOption>{item.option || item.detail}</ProductOption>
                <PriceQuantityRow>
                  <ProductPrice>KRW {item.price.toLocaleString()}</ProductPrice>
                  <QuantityControls>
                    <QuantityButton
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={(quantities[item.id] || 1) <= 1}
                    >
                      -
                    </QuantityButton>
                    <QuantityInput value={quantities[item.id] || 1} readOnly />
                    <QuantityButton
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      +
                    </QuantityButton>
                    <DeleteButton onClick={() => removeItem(item.id)}>
                      <FaTrashAlt size="1.8rem" />
                    </DeleteButton>
                  </QuantityControls>
                </PriceQuantityRow>
              </ProductInfo>
            </ProductItem>
          ))
        )}
      </ProductList>
    </OrderSection>
  );
};

export default Order;
