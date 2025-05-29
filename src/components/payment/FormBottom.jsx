import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query"; // React Query 추가
import { ORDER_ITEMS_KEY } from "../../constants/queryKeys";
import { useOrderHistory } from "../../hooks/useOrderHistory";
import naver_pay from "../../imgs/payment/naver_pay.png";
import kakao_pay from "../../imgs/payment/kakao_pay.png";
import toss_pay from "../../imgs/payment/toss_pay.png";
import payco from "../../imgs/payment/payco.png";
import samsung_pay from "../../imgs/payment/samsung_pay.png";
import apple_pay from "../../imgs/payment/apple_pay.png";

const FormBottomSection = styled.div`
  width: 100%;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: bold;
  margin: 30px 0 15px;

  @media screen and (max-width: 402px) {
    font-size: 1.5rem;
    margin: 20px 0 10px;
  }
`;

const PaymentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 20px;

  @media screen and (max-width: 402px) {
    gap: 8px;
  }
`;

const PaymentOption = styled.div`
  border: 1px solid ${(props) => (props.selected ? "#000" : "#ddd")};
  background-color: ${(props) => (props.selected ? "#f5f5f5" : "white")};
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background: #f5f5f5;
  }

  @media screen and (max-width: 402px) {
    height: 50px;
    font-size: 1.3rem;
  }
`;

const PayLogo = styled.img`
  width: 110px;
  height: 40px;
  object-fit: contain;

  @media screen and (max-width: 402px) {
    width: 90px;
    height: 30px;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  margin: 10px 0;
  cursor: pointer;

  @media screen and (max-width: 402px) {
    font-size: 1.3rem;
  }
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

const OrderButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #000;
  color: #fff;
  border: none;
  font-size: 1.6rem;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 30px;

  @media screen and (max-width: 402px) {
    padding: 12px;
    font-size: 1.5rem;
    margin-top: 15px;
    margin-bottom: 25px;
  }
`;

const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 1.4rem;
  z-index: 1100;
  opacity: ${(props) => (props.visible ? "1" : "0")};
  transform: translateY(${(props) => (props.visible ? "0" : "-20px")});
  transition: opacity 0.3s, transform 0.3s;

  @media screen and (max-width: 402px) {
    font-size: 1.3rem;
    padding: 12px 15px;
    right: 10px;
    top: 10px;
  }
`;

const OrderCompletedModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1200;
`;

const ModalContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 8px;
  text-align: center;
  max-width: 90%;
  width: 400px;

  @media screen and (max-width: 402px) {
    padding: 30px;
    width: 85%;
  }
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;

  @media screen and (max-width: 402px) {
    font-size: 1.8rem;
  }
`;

const ModalText = styled.p`
  font-size: 1.4rem;
  margin-bottom: 30px;
  line-height: 1.5;

  @media screen and (max-width: 402px) {
    font-size: 1.3rem;
    margin-bottom: 25px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const ModalButton = styled.button`
  padding: 12px 25px;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? "#000" : "#f1f1f1")};
  color: ${(props) => (props.primary ? "#fff" : "#000")};
  border-radius: 4px;

  @media screen and (max-width: 402px) {
    padding: 10px 20px;
    font-size: 1.3rem;
  }
`;

const FormBottom = ({
  agreements,
  setAgreements,
  orderItems,
  quantities,
  discount,
  selectedAddress,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // React Query 클라이언트
  const { addOrder } = useOrderHistory(); // 주문 내역 훅 사용

  // 결제 방법 선택 상태 추가
  const [selectedPayment, setSelectedPayment] = useState("");
  const [isProcessing, setIsProcessing] = useState(false); // 처리 중 상태

  const [notification, setNotification] = useState({
    visible: false,
    message: "",
  });

  const [orderCompletedModal, setOrderCompletedModal] = useState(false);

  const handleCheckboxChange = (name) => {
    if (name === "terms") {
      const newValue = !agreements.terms;
      setAgreements({
        terms: newValue,
        privacy: newValue,
        refund: newValue,
      });
    } else {
      setAgreements((prev) => ({
        ...prev,
        [name]: !prev[name],
      }));
    }
  };

  // 알림 표시 함수
  const showNotification = (message) => {
    setNotification({
      visible: true,
      message,
    });

    setTimeout(() => {
      setNotification((prev) => ({
        ...prev,
        visible: false,
      }));
    }, 1000);
  };

  // 결제 방법 선택 핸들러
  const handlePaymentSelection = (paymentMethod) => {
    setSelectedPayment(paymentMethod);
  };

  // 주문 완료 mutation
  const completeOrderMutation = useMutation({
    mutationFn: (orderData) => {
      // 여기에서 실제 주문 처리 API를 호출할 수 있습니다.
      // 현재는 로컬 스토리지에만 저장합니다.
      return Promise.resolve(orderData);
    },
    onSuccess: (data) => {
      // 주문 내역에 추가
      console.log("주문 데이터 생성:", {
        orderItems: orderItems,
        quantities: quantities,
      });

      addOrder(
        {
          orderItems: {
            orderItems: orderItems,
            quantities: quantities,
          },
          paymentInfo: {
            address: selectedAddress,
            payment: selectedPayment,
            discount: discount,
            totalAmount: calculateTotalPrice(),
            date: new Date().toISOString(),
          },
        },
        {
          onSuccess: () => console.log("주문이 성공적으로 추가됨"),
          onError: (error) => console.error("주문 추가 실패:", error),
        }
      );

      // 장바구니에서 결제 완료된 아이템 제거
      // 1. ORDER_ITEMS_KEY 비우기
      queryClient.setQueryData([ORDER_ITEMS_KEY], []);
      localStorage.removeItem(ORDER_ITEMS_KEY);

      // 2. CART_ITEMS_KEY에서 결제 완료된 아이템들 제거
      const CART_ITEMS_KEY = "cartItems"; // 장바구니 키 상수
      const currentCartItems = JSON.parse(
        localStorage.getItem(CART_ITEMS_KEY) || "[]"
      );
      const orderItemIds = orderItems.map((item) => item.id);

      // 결제된 아이템을 장바구니에서 제외
      const updatedCartItems = currentCartItems.filter(
        (item) => !orderItemIds.includes(item.id)
      );

      // 장바구니 데이터 업데이트
      queryClient.setQueryData([CART_ITEMS_KEY], updatedCartItems);
      localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(updatedCartItems));

      // CART_ITEMS_KEY 캐시 무효화하여 UI 업데이트 트리거
      queryClient.invalidateQueries([CART_ITEMS_KEY]);

      // 장바구니 업데이트 이벤트 발생
      window.dispatchEvent(new CustomEvent("cart-updated"));

      // 처리 중 상태 해제
      setIsProcessing(false);

      // 주문 완료 모달 표시
      setOrderCompletedModal(true);
    },
    onError: (error) => {
      // 에러 처리
      console.error("Order error:", error);
      showNotification("주문 처리 중 오류가 발생했습니다.");
      setIsProcessing(false);
    },
  });

  // 총 가격 계산 함수
  const calculateTotalPrice = () => {
    // orderItems이 없거나 빈 배열이면 0 반환
    if (!orderItems || orderItems.length === 0) return 0;

    const itemsTotal = orderItems.reduce(
      (sum, item) => sum + item.price * (quantities[item.id] || 1),
      0
    );

    // 할인 적용
    let discountAmount = 0;
    if (discount?.applied && discount.type === "percentage") {
      discountAmount = Math.floor((itemsTotal * discount.rate) / 100);
    } else if (discount?.applied) {
      discountAmount = discount.amount;
    }

    return itemsTotal - discountAmount;
  };

  // 주문하기 버튼 클릭 핸들러
  const handleOrder = () => {
    // 주문 상품이 있는지 확인
    if (!orderItems || orderItems.length === 0) {
      showNotification("주문할 상품이 없습니다.");
      return;
    }

    // 모든 필수 약관에 동의했는지 확인
    if (!agreements.terms || !agreements.privacy || !agreements.refund) {
      showNotification("모든 필수 동의사항에 체크해주세요.");
      return;
    }

    // 결제 방법이 선택되었는지 확인
    if (!selectedPayment) {
      showNotification("결제 방법을 선택해주세요.");
      return;
    }

    // 처리 중 상태로 변경
    setIsProcessing(true);

    // 주문 데이터 생성
    const orderData = {
      orderItems: orderItems,
      quantities: quantities,
      address: selectedAddress,
      payment: selectedPayment,
      discount: discount,
      totalAmount: calculateTotalPrice(),
      orderDate: new Date().toISOString(),
    };

    // 주문 완료 처리
    completeOrderMutation.mutate(orderData);
  };

  // 마이페이지로 이동 핸들러
  const goToMypage = () => {
    navigate("/mypage/order-confirmation");
  };

  // 홈으로 이동 핸들러
  const goToHome = () => {
    navigate("/");
  };

  return (
    <FormBottomSection>
      {/* Payment Methods */}
      <SectionTitle>결제 방법</SectionTitle>
      <PaymentGrid>
        <PaymentOption
          selected={selectedPayment === "naver_pay"}
          onClick={() => handlePaymentSelection("naver_pay")}
        >
          <PayLogo src={naver_pay} alt="네이버페이" />
        </PaymentOption>
        <PaymentOption
          selected={selectedPayment === "kakao_pay"}
          onClick={() => handlePaymentSelection("kakao_pay")}
        >
          <PayLogo src={kakao_pay} alt="카카오페이" />
        </PaymentOption>
        <PaymentOption
          selected={selectedPayment === "toss_pay"}
          onClick={() => handlePaymentSelection("toss_pay")}
        >
          <PayLogo src={toss_pay} alt="토스페이" />
        </PaymentOption>
        <PaymentOption
          selected={selectedPayment === "payco"}
          onClick={() => handlePaymentSelection("payco")}
        >
          <PayLogo src={payco} alt="페이코" />
        </PaymentOption>
        <PaymentOption
          selected={selectedPayment === "samsung_pay"}
          onClick={() => handlePaymentSelection("samsung_pay")}
        >
          <PayLogo src={samsung_pay} alt="삼성페이" />
        </PaymentOption>
        <PaymentOption
          selected={selectedPayment === "apple_pay"}
          onClick={() => handlePaymentSelection("apple_pay")}
        >
          <PayLogo src={apple_pay} alt="애플페이" />
        </PaymentOption>
        <PaymentOption
          selected={selectedPayment === "credit_card"}
          onClick={() => handlePaymentSelection("credit_card")}
        >
          신용카드 결제
        </PaymentOption>
      </PaymentGrid>

      {/* Agreements */}
      <CheckboxLabel>
        <Checkbox
          type="checkbox"
          checked={agreements.terms}
          onChange={() => handleCheckboxChange("terms")}
        />
        주문 내용을 확인했으며, 이용약관에 모두 동의합니다.
      </CheckboxLabel>

      <CheckboxLabel>
        <Checkbox
          type="checkbox"
          checked={agreements.privacy}
          onChange={() => handleCheckboxChange("privacy")}
        />
        [필수] 개인정보 이용/수집 동의
      </CheckboxLabel>

      <CheckboxLabel>
        <Checkbox
          type="checkbox"
          checked={agreements.refund}
          onChange={() => handleCheckboxChange("refund")}
        />
        [필수] 교환하실 상품의 경계상품으로 발송하셔오며, 구매단계에서 동의
        됩니다. 주문이 확정하여 상패고 보다 많은 수량의 동이를 경우 결제가 취소
        될 수 있습니다.
      </CheckboxLabel>

      {/* 주문 버튼 */}
      <OrderButton onClick={handleOrder} disabled={isProcessing}>
        {isProcessing ? "처리 중..." : "주문하기"}
      </OrderButton>

      {/* 알림 메시지 */}
      <Notification visible={notification.visible}>
        {notification.message}
      </Notification>

      {/* 주문 완료 모달 */}
      <OrderCompletedModal isOpen={orderCompletedModal}>
        <ModalContent>
          <ModalTitle>주문이 완료되었습니다!</ModalTitle>
          <ModalText>
            주문하신 상품은 빠른 시일 내에 배송될 예정입니다.
            <br />
            주문 내역은 마이페이지에서 확인하실 수 있습니다.
          </ModalText>
          <ButtonGroup>
            <ModalButton onClick={goToHome}>홈으로</ModalButton>
            <ModalButton primary onClick={goToMypage}>
              주문 내역 확인
            </ModalButton>
          </ButtonGroup>
        </ModalContent>
      </OrderCompletedModal>
    </FormBottomSection>
  );
};

export default FormBottom;
