import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useOrderHistory } from "../../../hooks/useOrderHistory";
import OrderCancelModal from "../../../components/mypage/OrderCancelModal";
import OrderDetailModal from "../../../components/mypage/OrderDetailModal";

const Container = styled.div`
  padding: 0 3%;
  margin: 0 auto;
  max-width: 1200px;
  box-sizing: border-box;

  @media screen and (max-width: 1024px) {
    padding: 0 10%;
  }

  @media screen and (max-width: 402px) {
    padding: 0 3%;
  }
`;

const PageTitle = styled.h1`
  font-size: 3.6rem;
  text-align: center;
  font-weight: bold;
  margin-top: 60px;
  margin-bottom: 120px;
  font-family: "EHNormalTrial", sans-serif;

  @media screen and (max-width: 1024px) {
    margin-bottom: 80px;
  }

  @media screen and (max-width: 402px) {
    font-size: 2.2rem;
    margin-top: 40px;
    margin-bottom: 60px;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 50px;
`;

const FilterControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;

  @media screen and (max-width: 1024px) {
    margin-bottom: 25px;
    padding-bottom: 15px;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }

  @media screen and (max-width: 402px) {
    margin-bottom: 20px;
    padding-bottom: 10px;
    gap: 15px;
  }
`;

const FilterLabelGroup = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 1024px) {
    width: 100%;
  }

  @media screen and (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
  }

  @media screen and (max-width: 402px) {
    gap: 8px;
  }
`;

const FilterLabel = styled.label`
  font-size: 1.6rem;
  font-weight: bold;
  color: #666;
  margin-right: 16px;
  font-family: "Pretendard", sans-serif;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 8px;

  @media screen and (max-width: 1024px) {
    gap: 6px;
  }

  @media screen and (max-width: 576px) {
    overflow-x: auto;
    width: 100%;
    padding-bottom: 5px;
  }

  @media screen and (max-width: 402px) {
    gap: 4px;
  }
`;

const FilterButton = styled.button`
  padding: 8px 20px;
  border: none;
  background: ${(props) => (props.active ? "#000" : "#f0f0f0")};
  color: ${(props) => (props.active ? "#fff" : "#999")};
  font-size: 1.5rem;
  cursor: pointer;
  font-family: "EHNormalTrial", sans-serif;
  border-radius: 20px;
  white-space: nowrap;
  &:hover {
    background: ${(props) => (props.active ? "#000" : "#e0e0e0")};
  }
  @media screen and (max-width: 1024px) {
    padding: 8px 15px;
    font-size: 1.4rem;
  }
  @media screen and (max-width: 402px) {
    padding: 6px 12px;
    font-size: 1.3rem;
  }
`;

const StatusSelect = styled.select`
  padding: 10px 16px;
  font-size: 1.4rem;
  border: 1px solid #e0e0e0;
  background: #fff;
  font-family: "Pretendard", sans-serif;
  width: 250px;
  height: 45px;

  @media screen and (max-width: 1024px) {
    height: 42px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media screen and (max-width: 402px) {
    height: 40px;
    font-size: 1.2rem;
    padding: 10px 14px;
  }
`;

// 닫기 버튼 스타일 추가
const CloseButton = styled.button`
  position: absolute;
  right: 15px;
  top: 15px;
  background: none;
  border: none;
  font-size: 1.8rem;
  font-weight: 700;
  color: #999;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
    color: #333;
  }

  @media screen and (max-width: 402px) {
    right: 10px;
    top: 10px;
    font-size: 1.6rem;
    width: 24px;
    height: 24px;
  }
`;

const OrderItem = styled.div`
  margin-bottom: 40px;
  background: #fff;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  position: relative; /* 닫기 버튼 위치 지정을 위해 추가 */

  @media screen and (max-width: 402px) {
    margin-bottom: 30px;
  }
`;

const OrderContent = styled.div`
  display: flex;
  padding: 35px 30px;
  gap: 40px;
  align-items: center;

  @media screen and (max-width: 1024px) {
    padding: 25px 20px;
    gap: 30px;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
    padding: 20px;
  }

  @media screen and (max-width: 402px) {
    padding: 15px;
    gap: 15px;
  }
`;

const ProductImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 4px;

  @media screen and (max-width: 1024px) {
    width: 100px;
    height: 100px;
  }

  @media screen and (max-width: 402px) {
    width: 80px;
    height: 80px;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const OrderInfo = styled.div`
  font-size: 1.4rem;
  line-height: 1.8;
  color: #666;
  font-family: "Pretendard", sans-serif;
  margin-bottom: 8px;

  @media screen and (max-width: 402px) {
    font-size: 1.3rem;
    line-height: 1.6;
  }
`;

const OrderStatus = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${(props) =>
    props.status === "교환 요청"
      ? "#1a73e8"
      : props.status === "반품 요청"
      ? "#e94235"
      : "#333"};
  margin-top: 10px;
  font-family: "Pretendard", sans-serif;

  @media screen and (max-width: 402px) {
    font-size: 1.3rem;
    margin-top: 8px;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 12px;

  @media screen and (max-width: 1024px) {
    gap: 10px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const ActionButtonSmall = styled.button`
  padding: 12px 30px;
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  color: #333;
  font-size: 1.5rem;
  cursor: pointer;
  font-family: "Pretendard", sans-serif;
  transition: all 0.3s;
  border-radius: 2px;
  height: 45px;

  &:hover {
    background: #333;
    color: #fff;
  }

  @media screen and (max-width: 1024px) {
    padding: 10px 25px;
    font-size: 1.4rem;
    height: 40px;
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }

  @media screen and (max-width: 402px) {
    padding: 8px 20px;
    font-size: 1.3rem;
    height: 38px;
  }
`;

const NoOrders = styled.p`
  text-align: center;
  color: #999;
  font-size: 1.6rem;
  margin: 80px 0;
  font-family: "Pretendard", sans-serif;

  @media screen and (max-width: 1024px) {
    font-size: 1.5rem;
    margin: 60px 0;
  }

  @media screen and (max-width: 402px) {
    font-size: 1.4rem;
    margin: 40px 0;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-top: 70px;
  margin-bottom: 80px;

  @media screen and (max-width: 1024px) {
    gap: 20px;
    margin-top: 60px;
    margin-bottom: 70px;
  }

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 12px;
  }

  @media screen and (max-width: 402px) {
    margin-top: 40px;
    margin-bottom: 60px;
    gap: 10px;
  }
`;

const ActionButton = styled.button`
  padding: 16px 60px;
  border: 1px solid #e0e0e0;
  text-decoration: none;
  color: #333;
  font-size: 1.4rem;
  background: #fff;
  font-family: "EHNormalTrial", sans-serif;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 4px;

  &:hover {
    background: #f8f8f8;
  }

  @media screen and (max-width: 1024px) {
    padding: 14px 50px;
  }

  @media (max-width: 576px) {
    width: 100%;
  }

  @media screen and (max-width: 402px) {
    padding: 12px 0;
    font-size: 1.3rem;
  }
`;

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("Today");
  const [selectedCategory, setSelectedCategory] =
    useState("전체 주문처리 상태");
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);

  // 주문 내역 훅 사용
  const { orderHistory, updateOrderStatus, removeOrder } = useOrderHistory(); // removeOrder 추가

  // 필터링된 주문 내역 상태
  const [filteredOrders, setFilteredOrders] = useState([]);

  // 필터 옵션
  const filterOptions = ["Today", "1 week", "1 month", "3 month"];
  const categoryOptions = [
    "전체 주문처리 상태",
    "주문 취소",
    "교환 요청",
    "반품 요청",
  ];

  // 주문 내역 삭제 핸들러 추가
  const handleRemoveOrder = (orderId, e) => {
    e.stopPropagation(); // 클릭 이벤트 전파 방지

    if (window.confirm("정말 이 주문을 목록에서 삭제하시겠습니까?")) {
      removeOrder(orderId);
    }
  };

  // 주문 내역이 변경되거나 필터가 변경될 때 필터링 적용
  useEffect(() => {
    if (!orderHistory || orderHistory.length === 0) {
      setFilteredOrders([]);
      return;
    }

    // 날짜 필터링
    let filtered = [...orderHistory];
    const now = new Date().getTime();

    if (selectedFilter === "Today") {
      // 오늘 날짜만 필터링 (24시간 이내)
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.date).getTime();
        return now - orderDate < 24 * 60 * 60 * 1000;
      });
    } else if (selectedFilter === "1 week") {
      // 1주일 이내
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.date).getTime();
        return now - orderDate < 7 * 24 * 60 * 60 * 1000;
      });
    } else if (selectedFilter === "1 month") {
      // 1개월 이내
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.date).getTime();
        return now - orderDate < 30 * 24 * 60 * 60 * 1000;
      });
    } else if (selectedFilter === "3 month") {
      // 3개월 이내
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.date).getTime();
        return now - orderDate < 90 * 24 * 60 * 60 * 1000;
      });
    }

    // 카테고리 필터링
    if (selectedCategory !== "전체 주문처리 상태") {
      filtered = filtered.filter((order) => order.status === selectedCategory);
    }

    // 최신 주문부터 표시
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));

    setFilteredOrders(filtered);
  }, [orderHistory, selectedFilter, selectedCategory]);

  // 주문 취소 모달 열기
  const handleOpenOrderModal = (orderId) => {
    setCurrentOrderId(orderId);
    setIsOrderModalOpen(true);
  };

  // 상세보기 모달 열기
  const handleOpenDetailModal = (orderId) => {
    setCurrentOrderId(orderId);
    setIsDetailModalOpen(true);
  };

  // 교환 요청 처리
  const handleExchangeRequest = () => {
    updateOrderStatus({
      orderId: currentOrderId,
      newStatus: "교환 요청",
    });
    setIsOrderModalOpen(false);
  };

  // 반품 요청 처리
  const handleReturnRequest = () => {
    updateOrderStatus({
      orderId: currentOrderId,
      newStatus: "반품 요청",
    });
    setIsOrderModalOpen(false);
  };

  // 교환/반품 취소 처리
  const handleCancelRequest = () => {
    updateOrderStatus({
      orderId: currentOrderId,
      newStatus: "결제 완료",
    });
    setIsDetailModalOpen(false);
  };

  // 현재 선택된 주문 찾기
  const getCurrentOrder = () => {
    return orderHistory.find((order) => order.id === currentOrderId) || {};
  };

  // 주문 상품의 첫 번째 아이템 정보 가져오기
  const getFirstItemInfo = (order) => {
    console.log("getFirstItemInfo - order:", order);

    if (
      !order.items ||
      !order.items.orderItems ||
      order.items.orderItems.length === 0
    ) {
      return { name: "상품 정보 없음", image: null, totalItems: 0 };
    }

    const items = order.items.orderItems;
    return {
      name: items[0].name,
      image: items[0].image,
      totalItems: items.length,
    };
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];

    return `${year}-${month}-${day} ${hours}:${minutes} ${dayOfWeek}`;
  };

  const hasOrders = filteredOrders.length > 0;

  return (
    <Container>
      <PageTitle>Order Confirmation</PageTitle>
      <FilterSection>
        <FilterControls>
          <FilterLabelGroup>
            <FilterLabel>조회 기간</FilterLabel>
            <FilterButtons>
              {filterOptions.map((filter) => (
                <FilterButton
                  key={filter}
                  active={selectedFilter === filter}
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter}
                </FilterButton>
              ))}
            </FilterButtons>
          </FilterLabelGroup>
          <StatusSelect
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </StatusSelect>
        </FilterControls>
      </FilterSection>

      {hasOrders ? (
        filteredOrders.map((order) => {
          try {
            const { name, image, totalItems } = getFirstItemInfo(order);
            const additionalItemsText =
              totalItems > 1 ? ` 외 ${totalItems - 1}개` : "";

            return (
              <OrderItem key={order.id}>
                {/* X 닫기 버튼 추가 */}
                <CloseButton onClick={(e) => handleRemoveOrder(order.id, e)}>
                  ×
                </CloseButton>
                <OrderContent>
                  <ProductImage
                    src={image}
                    alt={name}
                    onError={(e) => {
                      console.log("이미지 로드 에러:", image);
                      e.target.src = "/imgs/default_product.png"; // 에러 시 기본 이미지
                    }}
                  />
                  <ProductInfo>
                    <OrderInfo>
                      주문상품: {name}
                      {additionalItemsText}
                      <br />
                      주문일: {formatDate(order.date)}
                    </OrderInfo>
                    <OrderStatus status={order.status}>
                      상태: {order.status}
                    </OrderStatus>
                  </ProductInfo>
                  <ButtonsContainer>
                    <ActionButtonSmall
                      onClick={() => handleOpenOrderModal(order.id)}
                    >
                      주문 취소
                    </ActionButtonSmall>
                    <ActionButtonSmall
                      onClick={() => handleOpenDetailModal(order.id)}
                    >
                      상세보기
                    </ActionButtonSmall>
                  </ButtonsContainer>
                </OrderContent>
              </OrderItem>
            );
          } catch (error) {
            console.error("주문 항목 렌더링 오류:", error, order);
            return null;
          }
        })
      ) : (
        <>
          <NoOrders>주문 내역이 없습니다.</NoOrders>
          <ActionButtons>
            <ActionButton onClick={() => navigate("/")}>
              SHOP NEW ITEMS
            </ActionButton>
            <ActionButton onClick={() => navigate("/event")}>
              GO TO EVENT PAGE
            </ActionButton>
          </ActionButtons>
        </>
      )}

      {/* 모달 컴포넌트 */}
      <OrderCancelModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        order={getCurrentOrder()}
        onExchangeRequest={handleExchangeRequest}
        onReturnRequest={handleReturnRequest}
      />

      <OrderDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        order={getCurrentOrder()}
        onCancelRequest={handleCancelRequest}
      />
    </Container>
  );
};

export default OrderConfirmation;
