import React, { useState } from "react";
import styled from "styled-components";

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
  z-index: 1100;
`;

const ModalContainer = styled.div`
  background-color: white;
  width: 90%;
  max-width: 600px;
  border-radius: 4px;
  position: relative;
  /* 스크롤 제거 */
  overflow: hidden;

  @media (max-width: 580px) {
    width: 95%;
    max-width: 540px;
  }

  @media (max-width: 402px) {
    width: 95%;
    max-width: 100%;
  }
`;

const ModalHeader = styled.div`
  padding: 25px;
  border-bottom: 1px solid #eee;
  position: relative;

  @media (max-width: 580px) {
    padding: 20px;
  }

  @media (max-width: 402px) {
    padding: 15px;
  }
`;

const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: bold;
  text-align: center;
  font-family: "EHNormalTrial", sans-serif;
  margin: 0;

  @media (max-width: 580px) {
    font-size: 2rem;
  }

  @media (max-width: 402px) {
    font-size: 1.8rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2.2rem;
  font-weight: bold;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  color: #666;
  position: absolute;
  right: 25px;
  top: 50%;
  transform: translateY(-50%);

  &:hover {
    color: #000;
  }

  @media (max-width: 580px) {
    right: 20px;
    font-size: 2rem;
  }

  @media (max-width: 402px) {
    right: 15px;
    font-size: 1.8rem;
  }
`;

const ModalBody = styled.div`
  padding: 25px 30px;

  @media (max-width: 580px) {
    padding: 20px 25px;
  }

  @media (max-width: 402px) {
    padding: 15px 20px;
  }
`;

const CouponInputSection = styled.div`
  margin-bottom: 20px;
`;

const InputLabel = styled.p`
  font-size: 1.4rem;
  margin-bottom: 15px;
  font-family: "Pretendard", sans-serif;
  color: #333;

  @media (max-width: 580px) {
    font-size: 1.3rem;
    margin-bottom: 12px;
  }

  @media (max-width: 402px) {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
`;

const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  @media (max-width: 580px) {
    gap: 8px;
  }

  @media (max-width: 402px) {
    flex-direction: column;
    gap: 5px;
  }
`;

const CouponInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1.4rem;
  font-family: "Pretendard", sans-serif;

  &::placeholder {
    color: #999;
  }

  @media (max-width: 580px) {
    padding: 10px 12px;
    font-size: 1.3rem;
  }

  @media (max-width: 402px) {
    padding: 10px;
    font-size: 1.2rem;
  }
`;

const SubmitButton = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 12px 24px;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  font-family: "Pretendard", sans-serif;
  white-space: nowrap;

  &:hover {
    background-color: #333;
  }

  @media (max-width: 580px) {
    padding: 10px 20px;
    font-size: 1.3rem;
  }

  @media (max-width: 402px) {
    padding: 10px;
    font-size: 1.2rem;
    width: 100%;
  }
`;

const AvailableCoupons = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  text-align: center;
  font-size: 1.4rem;
  font-family: "Pretendard", sans-serif;
  margin-bottom: 20px;

  @media (max-width: 580px) {
    padding: 12px;
    font-size: 1.3rem;
    margin-bottom: 18px;
  }

  @media (max-width: 402px) {
    padding: 10px;
    font-size: 1.2rem;
    margin-bottom: 15px;
  }
`;

const Divider = styled.div`
  height: 1px;
  background-color: #eee;
  margin: 15px 0;
`;

const CouponsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 15px;

  @media (max-width: 580px) {
    gap: 12px;
    margin-bottom: 12px;
  }

  @media (max-width: 402px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const CouponCard = styled.div`
  background-color: #f5f5f5;
  padding: 20px;

  @media (max-width: 580px) {
    padding: 18px;
  }

  @media (max-width: 402px) {
    padding: 15px;
  }
`;

const CouponValue = styled.h3`
  font-size: 2.4rem;
  font-weight: bold;
  margin-bottom: 8px;
  font-family: "EHNormalTrial", sans-serif;

  @media (max-width: 580px) {
    font-size: 2.2rem;
    margin-bottom: 6px;
  }

  @media (max-width: 402px) {
    font-size: 2rem;
    margin-bottom: 5px;
  }
`;

const CouponTitle = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  margin-bottom: 10px;
  font-family: "Pretendard", sans-serif;

  @media (max-width: 580px) {
    font-size: 1.2rem;
    margin-bottom: 9px;
  }

  @media (max-width: 402px) {
    font-size: 1.1rem;
    margin-bottom: 8px;
  }
`;

const CouponInfo = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 4px;
  font-family: "Pretendard", sans-serif;

  @media (max-width: 580px) {
    font-size: 1.05rem;
  }

  @media (max-width: 402px) {
    font-size: 1rem;
  }
`;

const ModalFooter = styled.div`
  padding: 15px 30px;
  border-top: 1px solid #eee;
  background: #f9f9f9;

  @media (max-width: 580px) {
    padding: 12px 25px;
  }

  @media (max-width: 402px) {
    padding: 10px 20px;
  }
`;

const ModalFooterNote = styled.ul`
  font-size: 1.2rem;
  color: #666;
  line-height: 1.5;
  padding-left: 15px;
  list-style-type: none;
  margin: 0;

  li {
    margin-bottom: 3px;
    position: relative;
    padding-left: 8px;

    &:before {
      content: "•";
      position: absolute;
      left: 0;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  @media (max-width: 580px) {
    font-size: 1.1rem;
    padding-left: 12px;
  }

  @media (max-width: 402px) {
    font-size: 1rem;
    padding-left: 10px;
  }
`;

const CouponList = ({ isOpen, onClose }) => {
  const [couponNumber, setCouponNumber] = useState("");

  // 쿠폰 목록
  const coupons = [
    {
      type: "percentage",
      value: "10%",
      title: "MID SEASON OFF SALE 10% COUPON",
      maxDiscount: "최대 50,000원 할인",
      minPurchase: "30,000원 이상 구매시 사용 가능",
      validUntil: "2025-04-23~2025-05-06",
    },
    {
      type: "percentage",
      value: "15%",
      title: "HAPPY BIRTH DAY 15% COUPON",
      maxDiscount: "최대 50,000원 할인",
      minPurchase: "30,000원 이상 구매시 사용 가능",
      validUntil: "2025-04-23~2025-05-06",
    },
    {
      type: "amount",
      value: "₩3,000",
      title: "WELCOME COUPON 10% COUPON",
      maxDiscount: "최대 50,000원 할인",
      minPurchase: "30,000원 이상 구매시 사용 가능",
      validUntil: "2025-04-23~2025-05-06",
    },
    {
      type: "amount",
      value: "₩3,000",
      title: "S/S SEASON OFF SALE 10% COUPON",
      maxDiscount: "최대 50,000원 할인",
      minPurchase: "30,000원 이상 구매시 사용 가능",
      validUntil: "2025-04-23~2025-05-06",
    },
  ];

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <Title>Coupons</Title>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <ModalBody>
          <CouponInputSection>
            <InputLabel>발급받은 쿠폰의 인증번호를 입력해 주세요</InputLabel>
            <InputContainer>
              <CouponInput
                placeholder="Coupon Number"
                value={couponNumber}
                onChange={(e) => setCouponNumber(e.target.value)}
              />
              <SubmitButton>쿠폰 등록</SubmitButton>
            </InputContainer>
          </CouponInputSection>

          <AvailableCoupons>사용가능(4)</AvailableCoupons>

          <Divider />

          <CouponsGrid>
            {coupons.map((coupon, index) => (
              <CouponCard key={index}>
                <CouponValue>{coupon.value}</CouponValue>
                <CouponTitle>{coupon.title}</CouponTitle>
                <CouponInfo>{coupon.maxDiscount}</CouponInfo>
                <CouponInfo>{coupon.minPurchase}</CouponInfo>
                <CouponInfo>{coupon.validUntil}</CouponInfo>
              </CouponCard>
            ))}
          </CouponsGrid>
        </ModalBody>

        <ModalFooter>
          <ModalFooterNote>
            <li>
              상품 쿠폰과 장바구니 쿠폰은 함께 사용할 수 있습니다. 단, 일부
              상품은 중복 사용이 제한됩니다.
            </li>
            <li>쿠폰 사용 불가 상품은 쿠폰 할인 적용에 불가합니다.</li>
          </ModalFooterNote>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default CouponList;
