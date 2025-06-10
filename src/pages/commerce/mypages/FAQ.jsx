import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
// React Router를 사용하는 경우
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  padding: 0 3%;
  margin: 0 auto;
  max-width: 1200px;

  @media screen and (max-width: 1024px) {
    padding: 0 5%;
  }

  @media screen and (max-width: 402px) {
    padding: 0 4%;
  }
`;

const PageTitle = styled.h1`
  font-size: 3.6rem;
  text-align: center;
  margin-top: 60px;
  margin-bottom: 40px;
  font-weight: bold;
  font-family: "EHNormalTrial", sans-serif;

  @media screen and (max-width: 1024px) {
    font-size: 2.4rem;
    margin-bottom: 35px;
  }

  @media screen and (max-width: 402px) {
    font-size: 2.2rem;
    margin-bottom: 30px;
  }
`;

const SearchSection = styled.div`
  margin-bottom: 48px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;

  @media screen and (max-width: 1024px) {
    max-width: 550px;
    margin-bottom: 40px;
  }

  @media screen and (max-width: 402px) {
    max-width: 100%;
    margin-bottom: 30px;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px 48px 16px 24px;
  font-size: 1.4rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: "Pretendard", sans-serif;

  &::placeholder {
    color: #999;
  }

  @media screen and (max-width: 1024px) {
    padding: 14px 40px 14px 20px;
    font-size: 1.3rem;
  }

  @media screen and (max-width: 402px) {
    padding: 12px 36px 12px 16px;
    font-size: 1.2rem;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.6rem;
  color: #666;
  cursor: pointer;

  @media screen and (max-width: 1024px) {
    right: 14px;
    font-size: 1.5rem;
  }

  @media screen and (max-width: 402px) {
    right: 12px;
    font-size: 1.4rem;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const FAQSection = styled.div`
  margin-bottom: 48px;
  width: 100%;
  min-height: 500px;

  @media screen and (max-width: 1024px) {
    margin-bottom: 40px;
    min-height: 450px;
  }

  @media screen and (max-width: 402px) {
    margin-bottom: 30px;
    min-height: 400px;
  }
`;

const FAQItem = styled.div`
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 16px;
  background: #f8f8f8;

  @media screen and (max-width: 1024px) {
    margin-bottom: 14px;
  }

  @media screen and (max-width: 402px) {
    margin-bottom: 12px;
  }
`;

const Question = styled.button`
  width: 100%;
  padding: 20px 48px 20px 20px;
  text-align: left;
  background: none;
  border: none;
  font-size: 1.6rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  position: relative;
  font-family: "Pretendard", sans-serif;

  &:hover {
    background: #f0f0f0;
  }

  @media screen and (max-width: 1024px) {
    padding: 18px 44px 18px 18px;
    font-size: 1.6rem;
  }

  @media screen and (max-width: 402px) {
    padding: 15px 40px 15px 15px;
    font-size: 1.4rem;
    line-height: 1.4;
  }
`;

const ToggleIcon = styled.span`
  position: absolute;
  right: 20px;
  font-size: 2.3rem;
  color: #666;
  transition: transform 0.3s ease;
  transform: ${(props) => (props.isOpen ? "rotate(45deg)" : "rotate(0deg)")};
  &::before {
    content: "+";
  }

  @media screen and (max-width: 1024px) {
    right: 18px;
    font-size: 2rem;
  }

  @media screen and (max-width: 402px) {
    right: 15px;
    font-size: 1.6rem;
  }
`;

// 회원탈퇴 관련 질문을 위한 특별한 스타일링
const NavigationIcon = styled.span`
  position: absolute;
  right: 20px;
  font-size: 1.8rem;
  color: #666;
  &::before {
    content: "→";
  }

  @media screen and (max-width: 1024px) {
    right: 18px;
    font-size: 1.6rem;
  }

  @media screen and (max-width: 402px) {
    right: 15px;
    font-size: 1.4rem;
  }
`;

const Answer = styled.div`
  padding: ${(props) => (props.isOpen ? "0 20px 20px 20px" : "0 20px")};
  font-size: 1.4rem;
  color: #666;
  line-height: 1.6;
  max-height: ${(props) => (props.isOpen ? "500px" : "0")};
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  overflow: hidden;
  transition: all 0.3s ease;
  font-family: "Pretendard", sans-serif;
  @media screen and (max-width: 1024px) {
    padding: ${(props) => (props.isOpen ? "0 18px 18px 18px" : "0 18px")};
    font-size: 1.4rem;
  }

  @media screen and (max-width: 402px) {
    padding: ${(props) => (props.isOpen ? "0 15px 15px 15px" : "0 15px")};
    font-size: 1.3rem;
    line-height: 1.5;
  }
`;

const NoResults = styled.div`
  padding: 30px;
  text-align: center;
  font-size: 1.4rem;
  color: #666;
  background: #f8f8f8;
  border-radius: 4px;
  margin-top: 20px;

  @media screen and (max-width: 1024px) {
    padding: 25px;
    font-size: 1.3rem;
  }

  @media screen and (max-width: 402px) {
    padding: 20px;
    font-size: 1.2rem;
  }
`;

const FAQ = () => {
  const [openItems, setOpenItems] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  // React Router 사용 시
  const navigate = useNavigate();

  const faqItems = [
    {
      id: 1,
      question: "기본 배송지를 바꾸고 싶어요.",
      answer:
        "안전하게 회원님의 정보를 보호하기 위해 비밀번호를 다시 한 번 입력해주세요.",
      type: "normal",
    },
    {
      id: 2,
      question: "결제수단을 변경할 수 있나요?",
      answer: "결제 완료 후에는 결제수단 변경이 불가능합니다.",
      type: "normal",
    },
    {
      id: 3,
      question: "부분 결제가 가능한가요?",
      answer: "부분 결제는 지원하지 않습니다.",
      type: "normal",
    },
    {
      id: 4,
      question: "주문 상품 배송지를 변경하고 싶어요.",
      answer: "배송 준비 중 상태인 경우 배송지 변경이 가능합니다.",
      type: "normal",
    },
    {
      id: 5,
      question: "주문 상품(사이즈)을 변경하고 싶어요.",
      answer: "배송 시작 전까지는 주문 취소 후 재주문이 가능합니다.",
      type: "normal",
    },
    {
      id: 6,
      question: "주문 상품을 취소(부분 취소) 하고 싶어요.",
      answer: "부분 취소는 배송 완료 후에만 가능합니다.",
      type: "normal",
    },
    {
      id: 7,
      question: "주문 내역은 어디서 조회할 수 있나요?",
      answer:
        "기본 배송지는 로그인 후 MYPAGE > ACCOUNT > 배송지 관리에서 변경할 수 있습니다.",
      type: "normal",
    },
    {
      id: 8,
      question: "회원 탈퇴를 진행하고 싶은데 어떻게 해야 하나요?",
      answer: "회원 탈퇴 페이지로 이동합니다.",
      type: "navigation", // 페이지 이동을 위한 타입
      path: "/mypage/delete-account", // 현재 라우터 구조에 맞는 경로
    },
  ];

  const handleItemClick = (item) => {
    if (item.type === "navigation") {
      // 페이지 이동 처리
      if (item.path) {
        // React Router 사용 시
        navigate(item.path);

        // 또는 일반 페이지 이동 시
        // window.location.href = item.path;
      }
    } else {
      // 일반 FAQ 토글 처리
      toggleItem(item.id);
    }
  };

  const toggleItem = (itemId) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      newOpenItems.add(itemId);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFAQs = faqItems.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <PageTitle>FAQ</PageTitle>
      <SearchSection>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="궁금한 내용을 검색하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchButton>
            <FontAwesomeIcon icon={faSearch} />
          </SearchButton>
        </SearchContainer>
      </SearchSection>
      <ContentContainer>
        <FAQSection>
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((item) => (
              <FAQItem key={item.id}>
                <Question onClick={() => handleItemClick(item)}>
                  {item.question}
                  {item.type === "navigation" ? (
                    <NavigationIcon />
                  ) : (
                    <ToggleIcon isOpen={openItems.has(item.id)} />
                  )}
                </Question>
                {item.type === "normal" && (
                  <Answer isOpen={openItems.has(item.id)}>{item.answer}</Answer>
                )}
              </FAQItem>
            ))
          ) : (
            <NoResults>검색 결과가 없습니다.</NoResults>
          )}
        </FAQSection>
      </ContentContainer>
    </Container>
  );
};

export default FAQ;
