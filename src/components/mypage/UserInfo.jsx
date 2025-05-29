import React from "react";
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
  z-index: 1100; /* UserLevel 모달보다 높은 z-index */
`;

const ModalContainer = styled.div`
  background-color: white;
  width: 90%;
  max-width: 500px;
  border-radius: 4px;
  padding: 25px 20px 30px; /* 하단 패딩 추가 */
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center; /* 내용물 중앙 정렬 */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 2.2rem;
  font-weight: bold;
  cursor: pointer;
  padding: 0;
  line-height: 1;
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  font-family: "Pretendard", sans-serif;
  margin: 30px 0;
  text-align: center;
  width: 80%; /* 버튼과 동일한 너비 */
`;

const ContentWrapper = styled.div`
  width: 80%; /* 버튼과 동일한 너비 */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InfoList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 20px;
  width: 100%;
`;

const ListItem = styled.li`
  position: relative;
  margin-bottom: 15px;
  font-size: 1.4rem;
  line-height: 1.3;
  font-family: "Pretendard", sans-serif;
  color: #333;
  padding-left: 22px;
  text-align: left;

  &:last-child {
    margin-bottom: 0;
  }

  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 10px;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #333;
  }
`;

const LabelText = styled.span`
  font-weight: 600;
  color: #000;
  margin-right: 5px;
  display: inline-block;
`;

const SubInfo = styled.div`
  margin-top: 8px;
  padding-left: 12px;
  font-size: 1.2rem;
  color: #666;
  line-height: 1.5;
  width: 100%; /* 전체 너비 사용 */
`;

const ExampleInfo = styled(SubInfo)`
  margin-top: 10px;
  background-color: #f7f7f7;
  padding: 12px;
  border-radius: 4px;
  border-left: 3px solid #ddd;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const ConfirmButton = styled.button`
  width: 80%;
  padding: 15px;
  background-color: #000;
  color: #fff;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  font-family: "Pretendard", sans-serif;
  border-radius: 2px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #333;
  }
`;

const UserInfo = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>회원등급 기준 안내</Title>

        <ContentWrapper>
          <InfoList>
            <ListItem>
              최근 6개월간의 구매 확정된 주문 금액을 반영하여 매월 1일 새로운
              회원등급이 부여됩니다.
            </ListItem>

            <ListItem>
              향후 멤버십 등급별 혜택 및 선정 기준은 사전 통지 후 변경될 수
              있습니다.
            </ListItem>

            <ListItem>
              <LabelText>등급 변경 주기:</LabelText>
              매월 1일 오전 00시
            </ListItem>

            <ListItem>
              <LabelText>등급 산정기준:</LabelText>
              등급 변경 시점으로부터 직전 6개월간의 구매 확정상태 주문금액 합계
              <SubInfo>
                (주문 상품의 실 결제금액 기준이며, 취소/반품 완료 상태의
                주문금액은 제외됩니다.)
              </SubInfo>
              <ExampleInfo>
                예시) 2024.07.01 등급 산정 배출 기준:
                <br />
                2024.01.01 00시 ~ 2022.06.30 24시
              </ExampleInfo>
            </ListItem>
          </InfoList>
        </ContentWrapper>

        <ButtonContainer>
          <ConfirmButton onClick={onClose}>확인</ConfirmButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default UserInfo;
