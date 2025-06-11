import React, { useState } from "react";
import styled from "styled-components";
import UserInfo from "./UserInfo";

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
  width: 90%;
  max-width: 600px;
  border-radius: 4px;
  padding: 20px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
  padding: 0;
  line-height: 1;
`;

const ModalTitle = styled.h2`
  font-size: 2.4rem;
  text-align: center;
  margin-bottom: 30px;
  font-family: "EHNormalTrial", sans-serif;
  font-weight: bold;
`;

const MembershipInfo = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const InfoIcon = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #999;
  color: #999;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  margin-left: 5px;
  cursor: pointer;
`;

const UserLevelHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h3 {
    font-size: 1.1rem;
    color: #666;
    font-family: "Pretendard", sans-serif;
    font-weight: normal;
    margin-bottom: 5px;
  }
`;

const LevelDisplay = styled.div`
  font-size: 2.8rem;
  font-weight: bold;
  font-family: "EHNormalTrial", sans-serif;
  margin: 15px 0 30px;
`;

const InfoBox = styled.div`
  background-color: #f0f0f0;
  border-radius: 4px;
  padding: 0;
  margin-bottom: 40px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 2px dashed #fff;
  &:nth-child(2) {
    border-bottom: none;
  }
  &:last-child {
    border-bottom: none;
  }
  .label {
    padding: 15px;
    text-align: left;
    font-size: 1.4rem;
    font-family: "Pretendard", sans-serif;
    flex: 1;
  }

  .value {
    padding: 15px;
    text-align: right;
    font-size: 1.4rem;
    font-weight: bold;
    font-family: "Pretendard", sans-serif;
    flex: 1;
  }
`;

const LevelTitle = styled.h3`
  font-size: 1.5rem;
  margin: 40px 0 20px;
  font-family: "EHNormalTrial", sans-serif;
  text-align: center;
  font-weight: bold;
`;

const BenefitsTable = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const TableHeader = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;

  .header-cell {
    flex: 1;
    text-align: center;
    padding: 15px 10px;
    font-size: 1.5rem;
    font-weight: bold;
    font-family: "EHNormalTrial", sans-serif;

    &:first-child {
      text-align: left;
    }

    &.welcome {
      color: #000;
    }

    &.bronze {
      color: #d08c58;
    }

    &.silver {
      color: #a6a8a9;
    }

    &.gold {
      color: #e1bb35;
    }
  }
`;

const TableRow = styled.div`
  display: flex;
  border-bottom: 1px dashed #ddd;

  &:last-child {
    border-bottom: none;
  }

  .row-header {
    flex: 1;
    padding: 15px 10px;
    text-align: left;
    font-size: 1.5rem;
    line-height: 1.2;
    font-family: "Pretendard", sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .row-subtitle {
      font-size: 1.1rem;
      color: #999;
      margin-top: 4px;
    }
  }

  .row-cell {
    flex: 1;
    padding: 15px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 1.4rem;
    font-family: "Pretendard", sans-serif;
    &.highlight {
      font-weight: bold;
    }
  }
`;

const OTTSection = styled.div`
  margin-top: 40px;
`;

const OTTPlansContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const OTTPlanCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: white;

  /* 호버 효과 */
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border-color: #ff6b00;
  }

  /* 클릭 효과 */
  &:active {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  &.recommended {
    border: 1px solid #ddd;
    background-color: white;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      border-color: #ff6b00;
    }
  }

  /* 선택된 상태 */
  &.selected {
    border-color: #ff6b00;
    background: linear-gradient(135deg, #fff5f0 0%, #ffffff 100%);
    box-shadow: 0 4px 20px rgba(255, 107, 0, 0.15);
  }
`;

const RecommendedBadge = styled.div`
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #ff6b00 0%, #ff8533 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(255, 107, 0, 0.3);
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      transform: translateX(-50%) scale(1);
    }
    50% {
      transform: translateX(-50%) scale(1.05);
    }
    100% {
      transform: translateX(-50%) scale(1);
    }
  }
`;

const PlanPeriod = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 8px;
  font-family: "Pretendard", sans-serif;
  color: #333;
`;

const PlanPrice = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 5px;
  font-family: "Pretendard", sans-serif;
  color: #ff6b00;
`;

const PlanSubPrice = styled.div`
  font-size: 1rem;
  color: #999;
  margin-bottom: 10px;
  font-family: "Pretendard", sans-serif;
`;

const PlanDiscount = styled.div`
  font-size: 1rem;
  color: #28a745;
  margin-bottom: 15px;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;
`;

const PlanFeatures = styled.div`
  text-align: left;
  margin-bottom: 15px;

  .feature {
    font-size: 1rem;
    margin-bottom: 5px;
    font-family: "Pretendard", sans-serif;
    display: flex;
    align-items: center;
    color: #555;

    &:before {
      content: "✓";
      color: #28a745;
      margin-right: 8px;
      font-weight: bold;
      font-size: 1.1rem;
    }
  }
`;

const PlanBadge = styled.div`
  background: linear-gradient(
    135deg,
    ${(props) => props.color || "#666"} 0%,
    ${(props) => props.color || "#666"}dd 100%
  );
  color: white;
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 0.9rem;
  margin-bottom: 12px;
  display: inline-block;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const PurchaseButton = styled.button`
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  font-family: "Pretendard", sans-serif;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover:before {
    left: 100%;
  }

  &.primary {
    background: linear-gradient(135deg, #ff6b00 0%, #ff8533 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(255, 107, 0, 0.3);

    &:hover {
      background: linear-gradient(135deg, #e55a00 0%, #ff6b00 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(255, 107, 0, 0.4);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 10px rgba(255, 107, 0, 0.3);
    }
  }

  &.secondary {
    background: linear-gradient(135deg, #333 0%, #555 100%);
    color: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

    &:hover {
      background: linear-gradient(135deg, #444 0%, #666 100%);
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    }
  }
`;

const OTTNotice = styled.div`
  margin-top: 20px;
  font-size: 1rem;
  color: #666;
  font-family: "Pretendard", sans-serif;

  .notice-item {
    margin-bottom: 5px;

    &:before {
      content: "• ";
      margin-right: 5px;
      color: #ace0ff;
    }
  }
`;

const UserLevel = ({ isOpen, onClose }) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleOpenInfoModal = (e) => {
    e.stopPropagation();
    setIsInfoModalOpen(true);
  };

  const handleCloseInfoModal = () => {
    setIsInfoModalOpen(false);
  };

  const handlePlanClick = (planId) => {
    setSelectedPlan(planId);
  };

  const handlePurchase = (planName) => {
    alert(`${planName} 구독을 시작합니다!`);
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalTitle>Membership</ModalTitle>

        <UserLevelHeader>
          <h3>
            000님의 회원등급{" "}
            <InfoIcon onClick={handleOpenInfoModal}>?</InfoIcon>
          </h3>
          <LevelDisplay>WELCOME</LevelDisplay>
        </UserLevelHeader>

        <InfoBox>
          <InfoRow>
            <div className="label">다음달 예정 등급</div>
            <div className="value">WELCOME(기준일 : 2025.00.00)</div>
          </InfoRow>
          <InfoRow>
            <div className="label">현재 누적 구매 금액</div>
            <div className="value">0원</div>
          </InfoRow>
          <InfoRow>
            <div className="label">다음 등급 신청 기간</div>
            <div className="value">2025.04.00 ~ 2025.05.00</div>
          </InfoRow>
        </InfoBox>

        <LevelTitle>회원 등급별 혜택 안내</LevelTitle>

        <BenefitsTable>
          <TableHeader>
            <div className="header-cell">혜택</div>
            <div className="header-cell welcome">WECOME</div>
            <div className="header-cell bronze">BRONZE</div>
            <div className="header-cell silver">SILVER</div>
            <div className="header-cell gold">GOLD</div>
          </TableHeader>

          <TableRow>
            <div className="row-header">
              조건
              <span className="row-subtitle">최근 6개월 구매액</span>
            </div>
            <div className="row-cell highlight">회원가입</div>
            <div className="row-cell">10만원이상</div>
            <div className="row-cell">30만원이상</div>
            <div className="row-cell">50만원이상</div>
          </TableRow>

          <TableRow>
            <div className="row-header">적립</div>
            <div className="row-cell highlight">2%</div>
            <div className="row-cell">3%</div>
            <div className="row-cell">4%</div>
            <div className="row-cell">5%</div>
          </TableRow>

          <TableRow>
            <div className="row-header">등급별 쿠폰</div>
            <div className="row-cell highlight">-</div>
            <div className="row-cell">매달 5%</div>
            <div className="row-cell">매달5% 2장</div>
            <div className="row-cell">매달 7% 2장</div>
          </TableRow>

          <TableRow>
            <div className="row-header">생일 쿠폰</div>
            <div className="row-cell highlight">10%</div>
            <div className="row-cell">10%</div>
            <div className="row-cell">15%</div>
            <div className="row-cell">30%</div>
          </TableRow>
        </BenefitsTable>

        <OTTSection>
          <LevelTitle>OTT + 커머스 통합 멤버십 구독 플랜</LevelTitle>

          <OTTPlansContainer>
            <OTTPlanCard
              className={selectedPlan === "1month" ? "selected" : ""}
              onClick={() => handlePlanClick("1month")}
            >
              <PlanPeriod>1개월 구독</PlanPeriod>
              <PlanPrice>3,000원</PlanPrice>
              <PlanSubPrice>/월</PlanSubPrice>
              <PlanDiscount>첫 구독 시 1개월 무료</PlanDiscount>
              <PlanFeatures>
                <div className="feature">모든 콘텐츠 무제한 시청</div>
                <div className="feature">구매혜택 2% 적립</div>
                <div className="feature">생일쿠폰 10% 제공</div>
              </PlanFeatures>
              <PlanBadge color="#333333">WELCOME 등급 혜택</PlanBadge>
              <PurchaseButton
                className="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePurchase("1개월 구독");
                }}
              >
                구독하기
              </PurchaseButton>
            </OTTPlanCard>

            <OTTPlanCard
              className={`recommended ${
                selectedPlan === "3month" ? "selected" : ""
              }`}
              onClick={() => handlePlanClick("3month")}
            >
              <RecommendedBadge>인기</RecommendedBadge>
              <PlanPeriod>3개월 구독</PlanPeriod>
              <PlanPrice>8,000원</PlanPrice>
              <PlanSubPrice>/3개월</PlanSubPrice>
              <PlanDiscount>월 2,667원 (11% 할인)</PlanDiscount>
              <PlanFeatures>
                <div className="feature">모든 콘텐츠 무제한 시청</div>
                <div className="feature">구매혜택 3% 적립</div>
                <div className="feature">5% 할인쿠폰 1장 제공</div>
              </PlanFeatures>
              <PlanBadge color="#d08c58">BRONZE 등급 혜택</PlanBadge>
              <PurchaseButton
                className="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePurchase("3개월 구독");
                }}
              >
                구독하기
              </PurchaseButton>
            </OTTPlanCard>

            <OTTPlanCard
              className={selectedPlan === "6month" ? "selected" : ""}
              onClick={() => handlePlanClick("6month")}
            >
              <PlanPeriod>6개월 구독</PlanPeriod>
              <PlanPrice>15,000원</PlanPrice>
              <PlanSubPrice>/6개월</PlanSubPrice>
              <PlanDiscount>월 2,500원 (16% 할인)</PlanDiscount>
              <PlanFeatures>
                <div className="feature">모든 콘텐츠 무제한 시청</div>
                <div className="feature">구매혜택 4% 적립</div>
                <div className="feature">5% 할인쿠폰 매달 제공</div>
              </PlanFeatures>
              <PlanBadge color="#a6a8a9">SILVER 등급 혜택</PlanBadge>
              <PurchaseButton
                className="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePurchase("6개월 구독");
                }}
              >
                구독하기
              </PurchaseButton>
            </OTTPlanCard>

            <OTTPlanCard
              className={selectedPlan === "12month" ? "selected" : ""}
              onClick={() => handlePlanClick("12month")}
            >
              <PlanPeriod>연간 구독</PlanPeriod>
              <PlanPrice>27,000원</PlanPrice>
              <PlanSubPrice>/12개월</PlanSubPrice>
              <PlanDiscount>월 2,250원 (25% 할인)</PlanDiscount>
              <PlanFeatures>
                <div className="feature">모든 콘텐츠 무제한 시청</div>
                <div className="feature">구매혜택 5% 적립</div>
                <div className="feature">7% 할인쿠폰 매달 제공</div>
              </PlanFeatures>
              <PlanBadge color="#e1bb35">GOLD 등급 혜택</PlanBadge>
              <PurchaseButton
                className="secondary"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePurchase("연간 구독");
                }}
              >
                구독하기
              </PurchaseButton>
            </OTTPlanCard>
          </OTTPlansContainer>

          <OTTNotice>
            <div className="notice-item">
              멤버십 구독은 선택한 기간 동안 혜택을 제공합니다.
            </div>
            <div className="notice-item">
              첫 구독 무료 혜택은 신규 가입자에게 적용됩니다.
            </div>
          </OTTNotice>
        </OTTSection>

        <UserInfo isOpen={isInfoModalOpen} onClose={handleCloseInfoModal} />
      </ModalContainer>
    </ModalOverlay>
  );
};

export default UserLevel;
