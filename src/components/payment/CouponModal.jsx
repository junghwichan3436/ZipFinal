import React from "react";
import styled from "styled-components";

// 모달 관련 스타일
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  width: 450px;
  height: 450px;
  max-width: 90%;
  border-radius: 8px;
  overflow: visible;
  position: relative;
  display: flex;
  flex-direction: column; /* 컨텐츠를 열 방향으로 배치 */

  @media screen and (max-width: 402px) {
    max-width: 95%;
  }
`;

const ModalHeader = styled.div`
  padding: 20px;
  border-bottom: 1px solid #eee;
  position: relative;
  text-align: center;
  flex-shrink: 0; /* 헤더 크기 고정 */

  @media screen and (max-width: 402px) {
    padding: 15px;
  }
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  font-family: "EHNormalTrial", sans-serif;

  @media screen and (max-width: 402px) {
    font-size: 1.8rem;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #666;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);

  &:hover {
    color: #000;
    background: #f5f5f5;
    border-radius: 4px;
  }
`;

const ModalBody = styled.div`
  padding: 20px;
  overflow-y: visible;
  flex: 1;

  @media screen and (max-width: 402px) {
    padding: 15px;
  }
`;

const ModalForm = styled.form``;

const ModalFormGroup = styled.div`
  margin-bottom: 20px;

  @media screen and (max-width: 402px) {
    margin-bottom: 15px;
  }
`;

const ModalLabel = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 1.3rem;
  color: #333;

  @media screen and (max-width: 402px) {
    font-size: 1.2rem;
    margin-bottom: 8px;
  }
`;

const CouponInputGroup = styled.div`
  display: flex;
  gap: 10px;

  @media screen and (max-width: 402px) {
    gap: 5px;
  }
`;

const ModalInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1.3rem;

  &::placeholder {
    color: #999;
  }

  @media screen and (max-width: 402px) {
    padding: 8px 10px;
    font-size: 1.2rem;
  }
`;

const CouponRegisterButton = styled.button`
  background: #000;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.3rem;
  white-space: nowrap;

  &:hover {
    background: #333;
  }

  @media screen and (max-width: 402px) {
    padding: 8px 12px;
    font-size: 1.2rem;
  }
`;

const ModalSelectWrapper = styled.div`
  position: relative;
`;

const ModalSelectHeader = styled.div`
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  min-height: 42px;
  font-size: 1.3rem;

  @media screen and (max-width: 402px) {
    padding: 8px 10px;
    min-height: 38px;
    font-size: 1.2rem;
  }
`;

const ModalSelectOptions = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 4px 4px;
  z-index: 10;
  max-height: 150px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 402px) {
    max-height: 120px;
  }
`;

const ModalOption = styled.div`
  padding: 10px 15px;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3rem;

  &:hover {
    background: #f9f9f9;
  }

  &:last-child {
    border-bottom: none;
  }

  @media screen and (max-width: 402px) {
    padding: 8px 10px;
    font-size: 1.2rem;
  }
`;

const CheckMark = styled.span`
  color: #000;
  font-size: 1.6rem;

  @media screen and (max-width: 402px) {
    font-size: 1.4rem;
  }
`;

const ModalFooter = styled.div`
  padding: 15px 20px;
  border-top: 1px solid #eee;
  background: #f9f9f9;
  border-radius: 0 0 8px 8px;
  flex-shrink: 0;

  @media screen and (max-width: 402px) {
    padding: 12px 15px;
  }
`;

const ModalFooterNote = styled.ul`
  font-size: 1.1rem;
  color: #666;
  line-height: 1.4;
  padding-left: 12px;
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

  @media screen and (max-width: 402px) {
    font-size: 1rem;
    padding-left: 10px;
    line-height: 1.3;
  }
`;

const ArrowIcon = styled.span`
  display: inline-block;
  width: 8px;
  height: 8px;
  border-right: 2px solid #000;
  border-bottom: 2px solid #000;
  transform: ${(props) => (props.isOpen ? "rotate(-135deg)" : "rotate(45deg)")};
  transition: transform 0.3s;
`;

// 쿠폰 선택 상태 메시지 스타일 추가
const CouponStatusMessage = styled.div`
  margin-top: 10px;
  font-size: 1.3rem;
  padding: 10px;
  background-color: ${(props) => (props.selected ? "#f0f8ff" : "#fff8f0")};
  border: 1px solid ${(props) => (props.selected ? "#d0e8ff" : "#ffe8d0")};
  color: ${(props) => (props.selected ? "#0066cc" : "#cc6600")};
  border-radius: 4px;
  text-align: center;

  @media screen and (max-width: 402px) {
    font-size: 1.2rem;
    padding: 8px;
    margin-top: 8px;
  }
`;

const ApplyCouponButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #000;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.4rem;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background: #333;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }

  @media screen and (max-width: 402px) {
    padding: 10px;
    font-size: 1.3rem;
  }
`;

const CouponModal = ({
  isOpen,
  onClose,
  couponNumber,
  setCouponNumber,
  selectedCoupon,
  setSelectedCoupon,
  couponDropdownOpen,
  toggleCouponDropdown,
  applyCoupon,
}) => {
  // 쿠폰 옵션과 할인율 매핑
  const couponOptions = [
    "선택 없음",
    "MID SEASON OFF SALE 10% COUPON",
    "HAPPY BIRTH DAY 15% COUPON",
    "WELCOME COUPON 10% COUPON",
  ];

  const selectCoupon = (coupon) => {
    setSelectedCoupon(coupon);
    toggleCouponDropdown();
  };

  // 쿠폰이 선택되었는지 확인
  const isCouponSelected =
    selectedCoupon !== "선택 없음" && selectedCoupon !== "";

  // 쿠폰 적용 핸들러
  const handleApplyCoupon = (e) => {
    e.preventDefault();
    applyCoupon();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <ModalOverlay isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Coupons</ModalTitle>
          <CloseButton onClick={onClose} type="button">
            ×
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <ModalForm onSubmit={handleSubmit}>
            <ModalFormGroup>
              <ModalLabel>발급받은 쿠폰의 인증번호를 입력해 주세요</ModalLabel>
              <CouponInputGroup>
                <ModalInput
                  type="text"
                  placeholder="Coupon Number"
                  value={couponNumber}
                  onChange={(e) => setCouponNumber(e.target.value)}
                />
                <CouponRegisterButton type="button">
                  쿠폰 등록
                </CouponRegisterButton>
              </CouponInputGroup>
            </ModalFormGroup>

            <ModalFormGroup>
              <ModalLabel>쿠폰 선택</ModalLabel>
              <ModalSelectWrapper>
                <ModalSelectHeader onClick={toggleCouponDropdown}>
                  {selectedCoupon || "선택 없음"}
                  <ArrowIcon isOpen={couponDropdownOpen} />
                </ModalSelectHeader>
                <ModalSelectOptions isOpen={couponDropdownOpen}>
                  {couponOptions.map((option) => (
                    <ModalOption
                      key={option}
                      onClick={() => selectCoupon(option)}
                    >
                      {option}
                      {selectedCoupon === option && <CheckMark>✓</CheckMark>}
                    </ModalOption>
                  ))}
                </ModalSelectOptions>
              </ModalSelectWrapper>

              {/* 쿠폰 선택 상태 메시지 */}
              <CouponStatusMessage selected={isCouponSelected}>
                {isCouponSelected
                  ? `${selectedCoupon} 쿠폰이 선택되었습니다.`
                  : "선택된 쿠폰이 없습니다."}
              </CouponStatusMessage>

              {/* 쿠폰 적용 버튼 추가 - type="button" 명시 */}
              <ApplyCouponButton
                onClick={handleApplyCoupon}
                disabled={!isCouponSelected}
                type="button"
              >
                쿠폰 적용하기
              </ApplyCouponButton>
            </ModalFormGroup>
          </ModalForm>
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
      </ModalContent>
    </ModalOverlay>
  );
};

export default CouponModal;
