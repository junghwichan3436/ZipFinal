import React from "react";
import styled from "styled-components";

// Modal Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  border-radius: 4px;
  width: 90%;
  max-width: 500px;
  padding: 30px;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 1024px) {
    max-width: 450px;
    padding: 25px;
  }

  @media screen and (max-width: 402px) {
    padding: 20px;
    width: 95%;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  position: relative;
`;

const ModalTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: bold;
  text-align: center;
  width: 100%;
  font-family: "EHNormalTrial", sans-serif;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2.4rem;
  cursor: pointer;
  color: #666;
  position: absolute;
  right: 0;
  top: 0;

  &:hover {
    color: #000;
  }
`;

const ModalContent = styled.div`
  margin-bottom: 30px;
`;

const OrderDetailList = styled.ul`
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 30px;
  width: fit-content;
  margin: 0 auto 30px auto;

  li {
    font-size: 1.4rem;
    line-height: 2;
    font-family: "Pretendard", sans-serif;
  }
`;

const OrderDetailText = styled.p`
  font-size: 1.6rem;
  line-height: 1.8;
  margin-bottom: 20px;
  font-family: "Pretendard", sans-serif;
  text-align: center;
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const ModalButton = styled.button`
  padding: 14px 0;
  width: 100%;
  background: ${(props) => (props.primary ? "#333" : "#f5f5f5")};
  color: ${(props) => (props.primary ? "#fff" : "#333")};
  border: 1px solid ${(props) => (props.primary ? "#333" : "#e0e0e0")};
  font-size: 1.5rem;
  font-family: "Pretendard", sans-serif;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.3s;

  &:hover {
    background: ${(props) => (props.primary ? "#000" : "#e0e0e0")};
  }

  @media screen and (max-width: 1024px) {
    padding: 12px 0;
    font-size: 1.4rem;
  }

  @media screen and (max-width: 402px) {
    padding: 10px 0;
    font-size: 1.3rem;
  }
`;

const OrderCancelModal = ({ isOpen, onClose, order, onExchangeRequest, onReturnRequest }) => {
  if (!isOpen || !order) return null;

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Order Details</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        <ModalContent>
          <OrderDetailText>주문 번호: {order.id}</OrderDetailText>
          <OrderDetailText>주문일: {order.date}</OrderDetailText>
          <OrderDetailText>상태: {order.status}</OrderDetailText>
          <OrderDetailList>
            <li>
              주문상품: {order.productName} / {order.quantity}개 / KRW {order.price}
            </li>
          </OrderDetailList>
        </ModalContent>
        <ModalActions>
          <ModalButton onClick={onExchangeRequest}>
            교환 요청
          </ModalButton>
          <ModalButton onClick={onReturnRequest}>
            반품 요청
          </ModalButton>
        </ModalActions>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default OrderCancelModal;