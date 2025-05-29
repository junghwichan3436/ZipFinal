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

// 배경색이 있는 정보 테이블 (이미지와 동일)
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

// 배경색이 없는 혜택 테이블 (이미지와 동일)
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

const UserLevel = ({ isOpen, onClose }) => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const handleOpenInfoModal = (e) => {
    e.stopPropagation();
    setIsInfoModalOpen(true);
  };

  const handleCloseInfoModal = () => {
    setIsInfoModalOpen(false);
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
        <UserInfo isOpen={isInfoModalOpen} onClose={handleCloseInfoModal} />
      </ModalContainer>
    </ModalOverlay>
  );
};

export default UserLevel;
