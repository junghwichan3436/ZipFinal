import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

// 데스크탑용 사이드바
const DesktopSidebar = styled.div`
  width: 200px;
  flex-shrink: 0;
  padding-top: 50px;
  position: sticky;
  top: 100px;
  align-self: flex-start;

  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

// 모바일용 플로팅 액션 버튼
const FloatingButton = styled.button`
  display: none;
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: #000;
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  cursor: pointer;
  transition: all 0.3s ease;

  &:active {
    transform: scale(0.95);
  }

  @media screen and (max-width: 1024px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  // 플러스 아이콘 (열림/닫힘 상태에 따라 회전)
  &:before,
  &:after {
    content: "";
    position: absolute;
    background: white;
    transition: transform 0.3s ease;
  }

  &:before {
    width: 24px;
    height: 2px;
    transform: ${(props) => (props.isOpen ? "rotate(45deg)" : "rotate(0)")};
  }

  &:after {
    width: 2px;
    height: 24px;
    transform: ${(props) => (props.isOpen ? "rotate(45deg)" : "rotate(0)")};
  }
`;

// 모바일 메뉴 오버레이
const MobileMenuOverlay = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 990;
  backdrop-filter: blur(2px);
  transition: opacity 0.3s ease;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
`;

// 모바일 메뉴 컨테이너
const MobileMenuContainer = styled.div`
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 280px;
  max-height: 70vh;
  overflow-y: auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
  z-index: 999;
  opacity: ${(props) => (props.isOpen ? "1" : "0")};
  transform: ${(props) =>
    props.isOpen ? "translateY(0)" : "translateY(20px)"};
  visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
  transition: all 0.3s ease;

  // 스크롤바 스타일링
  scrollbar-width: thin;
  scrollbar-color: #ddd #f5f5f5;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 6px;
  }
`;

const MobileMenuCategory = styled.div`
  padding: 16px 18px;
  font-size: 1.5rem;
  font-weight: bold;
  font-family: "EHNormalTrial", sans-serif;
  background: #f8f8f8;
  color: #333;
  position: sticky;
  top: 0;
  border-bottom: 1px solid #eee;
  &:first-child {
    border-radius: 12px 12px 0 0;
  }
`;

const MobileMenuItem = styled.div`
  a {
    display: inline-block; /* 텍스트 너비만큼만 요소 크기 설정 */
    padding: 14px 20px;
    font-size: 1.3rem;
    color: ${(props) => (props.isActive ? "#ACE0FF" : "#666")};
    text-decoration: none;
    font-family: "Pretendard", sans-serif;
    border-bottom: 1px solid #f5f5f5;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    position: relative;

    /* 왼쪽에서 오른쪽으로 밑줄 효과 */
    &:after {
      content: "";
      position: absolute;
      bottom: 10px;
      left: 0;
      width: ${(props) => (props.isActive ? "100%" : "0")};
      height: 2px;
      background-color: #ace0ff;
      transition: width 0.3s ease;
    }

    &:hover {
      color: #ace0ff;

      &:after {
        width: 100%;
      }
    }
  }

  &:last-child {
    a {
      border-bottom: none;
      border-radius: 0 0 12px 12px;
    }
  }
`;

// 기존 사이드바 컴포넌트 스타일
const MenuGroup = styled.div`
  margin-bottom: 8px;
`;

const MenuHeader = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  color: #000;
  padding: 16px 0 8px 0;
  margin-bottom: 0;
  font-family: "EHNormalTrial", sans-serif;
`;

const MenuList = styled.ul`
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
`;

const MenuItem = styled.li`
  a {
    display: inline-block; /* 텍스트 너비만큼만 요소 크기 설정 */
    padding: 16px 0 8px 0;
    font-size: 1.4rem;
    color: ${(props) => (props.isActive ? "#ACE0FF" : "#666")};
    font-family: "Pretendard", sans-serif;
    white-space: pre-line;
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    position: relative;
    transition: color 0.3s ease;

    /* 왼쪽에서 오른쪽으로 밑줄 효과 */
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: ${(props) => (props.isActive ? "100%" : "0")};
      height: 2px;
      background-color: #ace0ff;
      transition: width 0.3s ease;
    }

    &:hover {
      color: #ace0ff;

      &:after {
        width: 100%;
      }
    }
  }
`;

const MypageSidebar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();

  // 현재 경로 확인 함수
  const isActive = (path) => {
    return location.pathname === path;
  };

  // 메뉴 카테고리 및 항목 정의 (회원탈퇴 메뉴 제거)
  const menuCategories = [
    {
      name: "SHOPPING",
      items: [
        { path: "/mypage", label: "주문/배송 조회" },
        { path: "/mypage/order-confirmation", label: "취소, 교환, 반품 조회" },
      ],
    },
    {
      name: "ACCOUNT",
      items: [
        { path: "/mypage/user-address", label: "배송지 관리" },
        {
          path: "/mypage/change-user-info",
          label: "비밀번호 / 휴대폰 번호 변경 및 관리",
        },
        {
          path: "/mypage/FavoriteArtist",
          label: "관심 아티스트 등록 / 수정",
        },
        // 회원탈퇴 메뉴 제거됨
        // {
        //   path: "/mypage/delete-account",
        //   label: "회원 탈퇴",
        //   isWithdrawal: true,
        // },
      ],
    },
    {
      name: "CUSTOMER CARE",
      items: [{ path: "/mypage/faq", label: "F&Q" }],
    },
  ];

  // 메뉴 외부 클릭 시 닫기 (플로팅 버튼 제외)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef, buttonRef]);

  // 메뉴 항목 클릭 시 메뉴 닫기
  const handleItemClick = () => {
    setIsMenuOpen(false);
  };

  // 모바일 메뉴 토글 - 버튼 클릭 시 열림/닫힘 상태 변경
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* 모바일용 플로팅 버튼 및 메뉴 */}
      <FloatingButton
        ref={buttonRef}
        onClick={toggleMenu}
        isOpen={isMenuOpen}
        aria-label="마이페이지 메뉴"
      />

      <MobileMenuOverlay
        isOpen={isMenuOpen}
        onClick={() => setIsMenuOpen(false)}
      />

      <MobileMenuContainer isOpen={isMenuOpen} ref={menuRef}>
        {menuCategories.map((category, catIndex) => (
          <div key={catIndex}>
            <MobileMenuCategory>{category.name}</MobileMenuCategory>
            {category.items.map((item, itemIndex) => (
              <MobileMenuItem
                key={`${catIndex}-${itemIndex}`}
                isActive={isActive(item.path)}
              >
                <Link to={item.path} onClick={handleItemClick}>
                  {item.label.replace("\n", " ")}
                </Link>
              </MobileMenuItem>
            ))}
          </div>
        ))}
      </MobileMenuContainer>

      {/* 데스크탑용 사이드바 */}
      <DesktopSidebar>
        {menuCategories.map((category, index) => (
          <div key={index}>
            <MenuGroup>
              <MenuHeader>{category.name}</MenuHeader>
            </MenuGroup>
            {category.items.map((item, itemIndex) => (
              <MenuGroup key={`${index}-${itemIndex}`}>
                <MenuList>
                  <MenuItem isActive={isActive(item.path)}>
                    <Link to={item.path}>{item.label}</Link>
                  </MenuItem>
                </MenuList>
              </MenuGroup>
            ))}
          </div>
        ))}
      </DesktopSidebar>
    </>
  );
};

export default MypageSidebar;
