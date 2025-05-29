import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useOrderStatus } from "../../../hooks/useOrderStatus";
import logoSellor from "../../../imgs/mypage/logo-sellor.png";
import UserLevel from "../../../components/mypage/UserLevel";
import SellerMark from "../../../components/mypage/SellerMark";
import CouponList from "../../../components/mypage/CouponList";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Container = styled.div`
  margin: 0 auto;
  padding: 0 3%;

  @media screen and (max-width: 1024px) {
    padding: 0 5%;
  }

  @media screen and (max-width: 402px) {
    padding: 0 3%;
  }
`;

const PageTitle = styled.h1`
  font-size: 3.6rem;
  text-align: center;
  margin-top: 60px;
  margin-bottom: 40px;
  font-weight: bold;
  font-family: "EHNormalTrial", sans-serif;

  @media screen and (max-width: 402px) {
    margin-bottom: 20px;
    font-size: 2.2rem;
  }
`;

const UserInfo = styled.div`
  margin-bottom: 32px;

  h2 {
    font-size: 1.8rem;
    font-weight: normal;
    margin-bottom: 4px;
    font-family: "Pretendard", sans-serif;
  }

  p {
    color: #999;
    font-size: 1.3rem;
    font-family: "EHNormalTrial", sans-serif;
  }

  @media screen and (max-width: 402px) {
    margin-bottom: 20px;

    h2 {
      font-size: 1.6rem;
    }
  }
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 48px;

  @media screen and (max-width: 1024px) {
    flex-wrap: wrap;
    gap: 12px;
  }

  @media screen and (max-width: 402px) {
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 30px;
  }
`;

const StatCard = styled.div`
  background: ${(props) => (props.dark ? "#333" : "#f5f5f5")};
  color: ${(props) => (props.dark ? "#fff" : "#000")};
  padding: 20px 24px;
  text-align: left;
  border-radius: 8px;
  position: relative;
  min-height: 80px;
  display: flex;
  width: 100%;
  flex-direction: column;
  cursor: pointer;
  &:first-child {
    width: 45%;
  }

  &:not(:first-child) {
    width: 25%;
  }

  h4 {
    font-size: 1.8rem;
    color: ${(props) => (props.dark ? "#ccc" : "#666")};
    margin-bottom: 8px;
    font-family: "Pretendard", sans-serif;
  }

  .grade-icon {
    position: absolute;
    right: 30px;
    top: 20px;
    width: 32px;
    height: 32px;

    img {
      width: 100%;
      height: 100%;
      opacity: 0.8;
    }
  }

  @media screen and (max-width: 1024px) {
    &:first-child {
      width: 100%;
    }

    &:not(:first-child) {
      width: calc(50% - 6px);
    }
  }

  @media screen and (max-width: 402px) {
    &:first-child {
      width: 100%;
    }

    &:not(:first-child) {
      width: calc(50% - 5px);
    }

    min-height: auto;
    padding: 15px;

    h4 {
      font-size: 1.4rem;
    }
  }
`;

const LogoSellor = styled.img`
  width: 32px;
  height: 32px;
  opacity: 1;
  position: absolute;
  right: 0px;
  top: 20%;
  transform: translateY(-50%);
  cursor: pointer;

  @media screen and (max-width: 402px) {
    width: 24px;
    height: 24px;
    right: 0px;
  }
`;

const StatValue = styled.p`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0;
  font-family: "Pretendard", sans-serif;
  margin-top: 16px;

  @media screen and (max-width: 402px) {
    font-size: 1.6rem;
    margin-top: 8px;
  }
`;

const GradeContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;

  .grade-text {
    font-size: 1.8rem;
    font-weight: bold;
    font-family: "EHNormalTrial", sans-serif;
  }

  .upgrade-btn {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.5);
    color: #fff;
    padding: 6px 16px;
    font-size: 1rem;
    cursor: pointer;
    font-family: "Pretendard", sans-serif;
    border-radius: 4px;
  }

  @media screen and (max-width: 402px) {
    margin-top: 10px;

    .grade-text {
      font-size: 1.6rem;
    }

    .upgrade-btn {
      padding: 4px 12px;
      font-size: 0.9rem;
    }
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 24px;
  font-family: "EHNormalTrial", sans-serif;

  @media screen and (max-width: 402px) {
    font-size: 1.6rem;
    margin-bottom: 16px;
  }
`;

const FilterSection = styled.div`
  margin-bottom: 48px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    margin-bottom: 35px;
  }

  @media screen and (max-width: 580px) {
    gap: 8px;
    align-items: flex-start;
  }

  @media screen and (max-width: 430px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 30px;
    gap: 12px;
  }

  @media screen and (max-width: 402px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 24px;
    gap: 10px;
  }
`;

const FilterLabel = styled.label`
  font-size: 1.6rem;
  font-weight: bold;
  color: #666;
  margin-right: 16px;
  font-family: "Pretendard", sans-serif;

  @media screen and (max-width: 580px) {
    margin-right: 0;
    margin-bottom: 4px;
  }

  @media screen and (max-width: 430px) {
    margin-right: 0;
    font-size: 1.5rem;
    margin-bottom: 0;
  }

  @media screen and (max-width: 402px) {
    margin-bottom: 0;
    font-size: 1.4rem;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 8px;

  @media screen and (max-width: 1024px) {
    gap: 6px;
  }

  @media screen and (max-width: 580px) {
    width: 100%;
  }

  @media screen and (max-width: 576px) {
    overflow-x: auto;
    width: 100%;
    padding-bottom: 5px;
  }

  @media screen and (max-width: 430px) {
    width: 100%;
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
  font-size: 1.4rem;
  cursor: pointer;
  font-family: "EHNormalTrial", sans-serif;
  border-radius: 20px;
  white-space: nowrap;

  &:hover {
    background: ${(props) => (props.active ? "#000" : "#e0e0e0")};
  }

  @media screen and (max-width: 430px) {
    padding: 5px 15px;
    font-size: 1.2rem;
  }

  @media screen and (max-width: 402px) {
    padding: 6px 15px;
    font-size: 1.1rem;
    flex-shrink: 0;
  }
`;

const OrderStatusGrid = styled.div`
  display: flex;
  gap: 32px;
  margin-bottom: 48px;
  justify-content: center;

  @media screen and (max-width: 1024px) {
    gap: 20px; // 태블릿에서 간격 축소
  }

  @media screen and (max-width: 402px) {
    flex-wrap: wrap;
    gap: 8px; // 모바일에서 간격 더 축소
    margin-bottom: 30px;
    justify-content: space-between; // 공간 균등하게 분배
    max-width: 320px; // 최대 너비 제한
    margin-left: auto;
    margin-right: auto;
  }

  @media screen and (max-width: 375px) {
    gap: 6px; // 더 작은 모바일에서 간격 더 축소
  }
`;

const OrderStatusItem = styled.div`
  text-align: center;
  .circle {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 12px;

    span {
      font-size: 2.8rem;
      font-weight: bold;
      font-family: "EHNormalTrial", sans-serif;
    }
  }

  .label {
    font-size: 1.4rem;
    color: #333;
    font-family: "Pretendard", sans-serif;
  }

  @media screen and (max-width: 1024px) {
    .circle {
      width: 80px;
      height: 80px;

      span {
        font-size: 2.4rem;
      }
    }

    .label {
      font-size: 1.3rem;
    }
  }

  @media screen and (max-width: 402px) {
    width: calc(50% - 4px);
    margin-bottom: 15px;

    .circle {
      width: 55px;
      height: 55px;
      margin-bottom: 6px;

      span {
        font-size: 1.8rem;
      }
    }

    .label {
      font-size: 1.1rem;
    }
  }

  @media screen and (max-width: 375px) {
    width: calc(50% - 3px); // 더 작은 간격에 맞춰 너비 수정

    .circle {
      width: 50px; // 더 작은 화면에서 원 크기 더 축소
      height: 50px;
    }
  }
`;

const NoOrdersMessage = styled.p`
  text-align: center;
  color: #999;
  font-size: 1.4rem;
  margin: 48px 0;
  font-family: "Pretendard", sans-serif;

  @media screen and (max-width: 402px) {
    font-size: 1.3rem;
    margin: 30px 0;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 48px;
  margin-bottom: 60px;

  @media screen and (max-width: 402px) {
    flex-direction: column;
    gap: 10px;
    margin-top: 30px;
    margin-bottom: 40px;
  }
`;

const ButtonLink = styled(Link)`
  padding: 12px 48px;
  border: 1px solid #e0e0e0;
  text-decoration: none;
  color: #333;
  font-size: 1.3rem;
  background: #fff;
  font-family: "EHNormalTrial", sans-serif;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    background: #f8f8f8;
  }

  @media screen and (max-width: 768px) {
    padding: 12px 30px;
    font-size: 1.2rem;
  }

  @media screen and (max-width: 430px) {
    padding: 12px 20px;
    font-size: 1.1rem;
  }

  @media screen and (max-width: 402px) {
    padding: 10px 0;
    width: 100%;
    text-align: center;
    font-size: 1rem;
    white-space: nowrap;
  }
`;

const MypageMain = () => {
  const [selectedFilter, setSelectedFilter] = useState("Today");
  const filterOptions = ["Today", "1 week", "1 month", "3 month"];
  const [userData, setUserData] = useState(null);

  //로그인된 회원정보
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        console.log("로그인된 유저 없음");
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.log("유저 데이터 없음");
        }
      } catch (err) {
        console.error("유저 데이터 가져오기 실패:", err);
      }
    });

    return () => unsubscribe(); // cleanup
  }, []);

  // 주문 상태 정보 가져오기
  const { orderStatusCounts, refreshOrderStatus } = useOrderStatus();

  // 주문 상태 변경 이벤트 리스너 설정
  useEffect(() => {
    const handleOrderStatusUpdate = () => {
      refreshOrderStatus();
    };

    // 이벤트 리스너 등록
    window.addEventListener("order-status-updated", handleOrderStatusUpdate);
    window.addEventListener("cart-updated", handleOrderStatusUpdate);

    // 클린업 함수
    return () => {
      window.removeEventListener(
        "order-status-updated",
        handleOrderStatusUpdate
      );
      window.removeEventListener("cart-updated", handleOrderStatusUpdate);
    };
  }, [refreshOrderStatus]);

  // 주문 내역 있는지 확인
  const hasOrders = Object.values(orderStatusCounts).some((count) => count > 0);

  // 등급혜택 모달
  const [isLevelModalOpen, setIsLevelModalOpen] = useState(false);

  const handleOpenLevelModal = () => {
    setIsLevelModalOpen(true);
  };

  const handleCloseLevelModal = () => {
    setIsLevelModalOpen(false);
  };

  //(인플루언서) 모달 상태
  const [isSellerMarkModalOpen, setIsSellerMarkModalOpen] = useState(false);

  const handleOpenSellerMarkModal = (e) => {
    e.stopPropagation(); // 이벤트 전파 방지
    setIsSellerMarkModalOpen(true);
  };

  const handleCloseSellerMarkModal = () => {
    setIsSellerMarkModalOpen(false);
  };

  // 쿠폰 모달 상태
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  const handleOpenCouponModal = () => {
    setIsCouponModalOpen(true);
  };

  const handleCloseCouponModal = () => {
    setIsCouponModalOpen(false);
  };

  return (
    <Container>
      <PageTitle>My Page</PageTitle>

      <UserInfo>
        <h2>{userData ? `안녕하세요. ${userData.name} 님.` : "안녕하세요."}</h2>
        <p>{userData ? userData.email : ""}</p>
      </UserInfo>

      <StatsContainer>
        <StatCard dark>
          <h4>나의 등급</h4>
          <div className="grade-icon">
            <LogoSellor
              src={logoSellor}
              alt="셀러로고"
              onClick={handleOpenSellerMarkModal}
            />
          </div>
          <GradeContainer>
            <div className="grade-text">WELCOME</div>
            <button className="upgrade-btn" onClick={handleOpenLevelModal}>
              등급혜택 보기
            </button>
          </GradeContainer>
        </StatCard>
        <StatCard clickable onClick={handleOpenCouponModal}>
          <h4>보유 쿠폰</h4>
          <StatValue>4 장</StatValue>
        </StatCard>
        <StatCard>
          <h4>적립금</h4>
          <StatValue>0 원</StatValue>
        </StatCard>
      </StatsContainer>

      <SectionTitle>RECENT ORDERS</SectionTitle>

      <FilterSection>
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
      </FilterSection>

      <OrderStatusGrid>
        <OrderStatusItem>
          <div className="circle">
            <span>{orderStatusCounts.waitingForPayment}</span>
          </div>
          <div className="label">입금대기</div>
        </OrderStatusItem>
        <OrderStatusItem>
          <div className="circle">
            <span>{orderStatusCounts.preparingShipment}</span>
          </div>
          <div className="label">배송준비중</div>
        </OrderStatusItem>
        <OrderStatusItem>
          <div className="circle">
            <span>{orderStatusCounts.inTransit}</span>
          </div>
          <div className="label">배송중</div>
        </OrderStatusItem>
        <OrderStatusItem>
          <div className="circle">
            <span>{orderStatusCounts.delivered}</span>
          </div>
          <div className="label">배송완료</div>
        </OrderStatusItem>
      </OrderStatusGrid>

      {!hasOrders && (
        <NoOrdersMessage>최근 주문 내역이 없습니다.</NoOrdersMessage>
      )}

      <ActionButtons>
        <ButtonLink to="/detail">SHOP NEW ITEMS</ButtonLink>
        <ButtonLink to="/event">GO TO EVENT PAGE</ButtonLink>
      </ActionButtons>
      <UserLevel isOpen={isLevelModalOpen} onClose={handleCloseLevelModal} />
      <SellerMark
        isOpen={isSellerMarkModalOpen}
        onClose={handleCloseSellerMarkModal}
      />
      <CouponList isOpen={isCouponModalOpen} onClose={handleCloseCouponModal} />
    </Container>
  );
};

export default MypageMain;
