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
  z-index: 1100;
`;

const ModalContainer = styled.div`
  background-color: white;
  width: 90%;
  max-width: 500px;
  border-radius: 4px;
  padding: 25px 20px;
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
  font-size: 2.2rem;
  font-weight: bold;
  cursor: pointer;
  padding: 0;
  line-height: 1;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: bold;
  font-family: "EHNormalTrial", sans-serif;
  margin: 10px 0 30px;
  text-align: center;
`;

const SubTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 1.3rem;
  color: #666;
  .info-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid #999;
    color: #999;
    font-size: 1rem;
    line-height: 1.4;
    text-align: center;
  }
`;

const LogoText = styled.div`
  font-size: 4rem;
  font-weight: 900;
  text-align: center;
  margin-bottom: 30px;
  font-family: "EHNormalTrial", sans-serif;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: left;
  padding: 0 20px;
  margin: 10px;
  font-family: "Pretendard", sans-serif;
`;

const InfoList = styled.ul`
  list-style-type: none;
  padding: 10px 20px;
  margin: 0;
`;

const ListItem = styled.li`
  position: relative;
  margin-bottom: 10px;
  font-size: 1.4rem;
  line-height: 1.2;
  font-family: "Pretendard", sans-serif;
  padding-left: 15px;
  &:before {
    content: "•";
    position: absolute;
    left: 0;
    color: #000;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

const Notes = styled.div`
  padding: 0 20px 10px;
`;

const Note = styled.p`
  font-size: 1.2rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 8px;
  padding-left: 15px;
  position: relative;
  &:before {
    content: "※";
    position: absolute;
    left: 0;
  }
`;

const ConfirmButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #000;
  color: #fff;
  border: none;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  font-family: "Pretendard", sans-serif;
  margin-top: 10px;
  border-radius: 2px;
  transition: background-color 0.2s;
  &:hover {
    background-color: #333;
  }
`;

const SellerMark = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>Influencer</Title>
        <SubTitle>
          ZIP official seller <span className="info-icon">i</span>
        </SubTitle>
        <LogoText>ZIPPER .</LogoText>
        <SectionTitle>회원등급 기준 안내</SectionTitle>
        <InfoList>
          <ListItem>
            인스타그램, 유튜브, 틱톡 등 SNS 팔로워 수 10,000명 이상
          </ListItem>
          <ListItem>본인 계정에서 실제 활동 이력 확인 필수</ListItem>
          <ListItem>최소 1회 이상 ZIPPER 제품 제품 콘텐츠 업로드 이력</ListItem>
          <ListItem>ZIPPER 플랫폼 내 판매 연동 완료</ListItem>
        </InfoList>
        <Notes>
          <Note>인플루언서 인증은 ZIPPER 운영팀의 검토 후 승인됩니다.</Note>
          <Note>
            비활성 계정, 가짜 팔로워 다수 보유 시 등록이 거부될 수 있습니다.
          </Note>
        </Notes>
        <ConfirmButton onClick={onClose}>확인</ConfirmButton>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default SellerMark;
