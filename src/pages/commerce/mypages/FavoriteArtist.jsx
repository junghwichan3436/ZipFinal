// components/mypage/FavoriteArtist.jsx - 기본 UI만 구성
import React, { useState, useMemo } from "react";
import styled, { keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { StarData } from "../../../StarData";

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

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e5e5;
  flex-wrap: wrap;
  gap: 20px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FilterLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const FilterLabel = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  color: #333;
  white-space: nowrap;
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 8px 20px;
  border: 1px solid #ddd;
  background: ${(props) => (props.active ? "#333" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  border-radius: 25px;
  cursor: pointer;
  font-size: 1.4rem;
  transition: all 0.3s ease;
  white-space: nowrap;
  font-weight: bold;

  &:hover:not(:disabled) {
    background: ${(props) => (props.active ? "#333" : "#f5f5f5")};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const DropdownWrapper = styled.div`
  position: relative;
  min-width: 200px;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const DropdownButton = styled.button`
  width: 100%;
  height: 35px;
  padding: 12px 16px;
  border: 1px solid #ddd;
  background: #fff;
  color: #333;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    border-color: #999;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  svg {
    transition: transform 0.3s ease;
    transform: ${(props) => (props.isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 0 0 4px 4px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  font-size: 1.4rem;
  transition: background 0.2s ease;

  &:hover {
    background: #f5f5f5;
  }

  &:last-child {
    border-radius: 0 0 4px 4px;
  }
`;

// 새로운 ActionBar 컴포넌트
const ActionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding: 20px 0;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
`;

const ActionText = styled.p`
  font-size: 1.8rem;
  color: #333;
  font-weight: 500;
  margin: 0;

  @media screen and (max-width: 768px) {
    text-align: center;
    font-size: 1.6rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const ActionButton = styled.button`
  padding: 10px 24px;
  border: 1px solid ${(props) => (props.primary ? "#333" : "#ddd")};
  background: ${(props) => (props.primary ? "#333" : "#fff")};
  color: ${(props) => (props.primary ? "#fff" : "#333")};
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: 500;
  transition: all 0.3s ease;
  min-width: 80px;

  &:hover:not(:disabled) {
    background: ${(props) => (props.primary ? "#555" : "#f5f5f5")};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ResultText = styled.p`
  text-align: center;
  font-size: 1.6rem;
  margin-bottom: 30px;
  color: #333;
  font-weight: 500;
`;

const ArtistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-bottom: 40px;

  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  @media screen and (max-width: 402px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
`;

const ArtistCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: ${(props) => (props.disabled ? "default" : "pointer")};
  transition: all 0.3s ease;
  position: relative;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};

  &:hover {
    transform: ${(props) => (props.disabled ? "none" : "translateY(-5px)")};
  }
`;

const ArtistImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 15px;
  transition: all 0.3s ease;

  ${(props) =>
    props.isSelected &&
    `
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }
  `}
`;

const ArtistImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transition: all 0.3s ease;
`;

const ArtistName = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  color: ${(props) => (props.isSelected ? "#007bff" : "#333")};
  transition: color 0.3s ease;

  @media screen and (max-width: 402px) {
    font-size: 1.4rem;
  }
`;

const HeartIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  color: #ff4757;
  font-size: 2.4rem;
  opacity: ${(props) => (props.show ? 1 : 0)};
  animation: ${(props) => (props.show ? heartAnimation : "none")} 1s ease-out;
  pointer-events: none;

  @media screen and (max-width: 402px) {
    font-size: 2rem;
  }
`;

const SelectedBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #28a745;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  z-index: 2;
`;

const heartAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.5);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -80%) scale(1.2);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -100%) scale(1);
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  gap: 5px;
  flex-wrap: wrap;
`;

const PaginationButton = styled.button`
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  background: ${(props) => (props.active ? "#333" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#333")};
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.4rem;
  font-weight: 500;

  &:hover {
    background: ${(props) => (props.active ? "#333" : "#f5f5f5")};
    border-color: #999;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Loading = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8rem;
  color: #666;
`;

const FavoriteArtist = () => {
  // 기본 로컬 상태만 사용 (나중에 상태관리 연결 예정)
  const [savedArtists, setSavedArtists] = useState([]); // 저장된 아티스트 목록
  const [selectedArtists, setSelectedArtists] = useState([]); // 수정 중인 아티스트 목록
  const [showHeartAnimation, setShowHeartAnimation] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("이름순(ㄱ - ㅎ)");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const itemsPerPage = 12;
  const { isLoading, data } = StarData();

  const allArtists = data?.artists?.map((artist) => artist).flat() || [];

  // 표시할 아티스트 목록 결정 (수정 모드면 전체, 일반 모드면 저장된 것만)
  const displayArtists = useMemo(() => {
    if (isEditMode) {
      // 수정 모드일 때는 전체 아티스트 중에서 필터링/정렬
      return allArtists;
    } else {
      // 일반 모드일 때는 저장된 아티스트만 표시
      return allArtists.filter((artist) =>
        savedArtists.includes(artist.artistName)
      );
    }
  }, [allArtists, savedArtists, isEditMode]);

  // 필터링 및 정렬된 아티스트 목록
  const filteredAndSortedArtists = useMemo(() => {
    let filtered = displayArtists;

    // 수정 모드일 때만 필터링 적용
    if (isEditMode && activeFilter !== "ALL") {
      filtered = filtered.filter(
        (artist) =>
          artist.jobCategory &&
          artist.jobCategory.toLowerCase() === activeFilter.toLowerCase()
      );
    }

    // 정렬
    if (sortOrder === "이름순(ㄱ - ㅎ)") {
      filtered = [...filtered].sort((a, b) =>
        a.artistName.localeCompare(b.artistName, "ko")
      );
    } else if (sortOrder === "이름순(ㅎ - ㄱ)") {
      filtered = [...filtered].sort((a, b) =>
        b.artistName.localeCompare(a.artistName, "ko")
      );
    }

    return filtered;
  }, [displayArtists, activeFilter, sortOrder, isEditMode]);

  // 페이지네이션 계산
  const totalPages = Math.ceil(filteredAndSortedArtists.length / itemsPerPage);
  const currentArtists = filteredAndSortedArtists.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // 필터 변경 시 첫 페이지로 이동
  const handleFilterChange = (filter) => {
    if (!isEditMode) return;
    setActiveFilter(filter);
    setCurrentPage(0);
  };

  // 정렬 변경 시 첫 페이지로 이동
  const handleSortChange = (sort) => {
    if (!isEditMode) return;
    setSortOrder(sort);
    setCurrentPage(0);
    setIsDropdownOpen(false);
  };

  // 수정 모드 토글
  const handleToggleEditMode = () => {
    if (!isEditMode) {
      // 수정 모드로 진입할 때 현재 저장된 아티스트를 선택된 상태로 설정
      setSelectedArtists([...savedArtists]);
      setCurrentPage(0); // 첫 페이지로 이동
    }
    setIsEditMode(!isEditMode);
  };

  // 아티스트 클릭 핸들러
  const handleArtistClick = (artistName) => {
    if (!isEditMode) return;

    const isCurrentlySelected = selectedArtists.includes(artistName);

    // 선택/해제
    setSelectedArtists((prev) => {
      if (prev.includes(artistName)) {
        return prev.filter((name) => name !== artistName);
      } else {
        return [...prev, artistName];
      }
    });

    // 하트 애니메이션 (새로 선택했을 때만)
    if (!isCurrentlySelected) {
      setShowHeartAnimation((prev) => ({
        ...prev,
        [artistName]: true,
      }));

      setTimeout(() => {
        setShowHeartAnimation((prev) => ({
          ...prev,
          [artistName]: false,
        }));
      }, 1000);
    }
  };

  // 저장 핸들러 (나중에 상태관리 연결)
  const handleSave = () => {
    // 선택된 아티스트들을 저장된 상태로 업데이트
    setSavedArtists([...selectedArtists]);
    console.log("저장할 아티스트:", selectedArtists);
    setIsEditMode(false);
    setCurrentPage(0); // 첫 페이지로 이동
    alert("저장되었습니다!");
  };

  // 취소 핸들러
  const handleCancel = () => {
    // 원래 저장된 상태로 되돌리기
    setSelectedArtists([...savedArtists]);
    setIsEditMode(false);
    setCurrentPage(0); // 첫 페이지로 이동
  };

  // 페이지 번호 생성
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 0; i < totalPages; i++) {
        pages.push(i);
      }
    } else {
      const startPage = Math.max(0, currentPage - 2);
      const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  if (isLoading) {
    return (
      <Container>
        <Loading>Loading...</Loading>
      </Container>
    );
  }

  return (
    <Container>
      <PageTitle>FAVORITE ARTIST</PageTitle>

      {/* 필터 섹션 - 수정 모드일 때만 활성화 */}
      {isEditMode && (
        <FilterSection disabled={!isEditMode}>
          <FilterLeft>
            <FilterLabel>아티스트 선택</FilterLabel>
            <FilterButtons>
              {["ALL", "ACTOR", "MUSICIAN", "SPORTS"].map((filter) => (
                <FilterButton
                  key={filter}
                  active={activeFilter === filter}
                  onClick={() => handleFilterChange(filter)}
                  disabled={!isEditMode}
                >
                  {filter}
                </FilterButton>
              ))}
            </FilterButtons>
          </FilterLeft>

          <DropdownWrapper>
            <DropdownButton
              isOpen={isDropdownOpen}
              onClick={() => isEditMode && setIsDropdownOpen(!isDropdownOpen)}
              disabled={!isEditMode}
            >
              {sortOrder}
              <FontAwesomeIcon icon={faChevronDown} />
            </DropdownButton>
            <DropdownMenu isOpen={isDropdownOpen}>
              <DropdownItem onClick={() => handleSortChange("이름순(ㄱ - ㅎ)")}>
                이름순(ㄱ - ㅎ)
              </DropdownItem>
              <DropdownItem onClick={() => handleSortChange("이름순(ㅎ - ㄱ)")}>
                이름순(ㅎ - ㄱ)
              </DropdownItem>
            </DropdownMenu>
          </DropdownWrapper>
        </FilterSection>
      )}

      {/* ActionBar - 텍스트와 버튼을 한 줄로 배치 */}
      <ActionBar>
        <ActionText>
          {isEditMode
            ? "좋아하는 아티스트를 재선택해주세요!"
            : "현재 선택된 아티스트입니다"}
        </ActionText>

        {!isEditMode ? (
          <ActionButton onClick={handleToggleEditMode}>수정</ActionButton>
        ) : (
          <ButtonGroup>
            <ActionButton onClick={handleSave} primary>
              완료
            </ActionButton>
            <ActionButton onClick={handleCancel}>취소</ActionButton>
          </ButtonGroup>
        )}
      </ActionBar>

      <ResultText>
        {isEditMode
          ? selectedArtists.length > 0 &&
            `이 아티스트들을 좋아해요 ❤️: ${selectedArtists.length}명`
          : savedArtists.length > 0 &&
            `총 ${savedArtists.length}명의 아티스트를 선택하셨습니다`}
      </ResultText>

      <ArtistGrid>
        {currentArtists.map((artist, index) => (
          <ArtistCard
            key={`${artist.artistName}-${index}`}
            onClick={() => handleArtistClick(artist.artistName)}
            disabled={!isEditMode}
          >
            <ArtistImageWrapper
              isSelected={
                isEditMode
                  ? selectedArtists.includes(artist.artistName)
                  : savedArtists.includes(artist.artistName)
              }
            >
              <ArtistImage src={artist.artistImg} alt={artist.artistName} />
              <HeartIcon show={showHeartAnimation[artist.artistName]}>
                <FontAwesomeIcon icon={faHeart} />
              </HeartIcon>
              {!isEditMode && savedArtists.includes(artist.artistName) && (
                <SelectedBadge>✓</SelectedBadge>
              )}
            </ArtistImageWrapper>
            <ArtistName
              isSelected={
                isEditMode
                  ? selectedArtists.includes(artist.artistName)
                  : savedArtists.includes(artist.artistName)
              }
            >
              {artist.artistName}
            </ArtistName>
          </ArtistCard>
        ))}
      </ArtistGrid>

      {totalPages > 1 && (
        <PaginationWrapper>
          <PaginationButton
            onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
          >
            ‹
          </PaginationButton>

          {getPageNumbers().map((pageNum) => (
            <PaginationButton
              key={pageNum}
              active={currentPage === pageNum}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum + 1}
            </PaginationButton>
          ))}

          <PaginationButton
            onClick={() =>
              setCurrentPage(Math.min(totalPages - 1, currentPage + 1))
            }
            disabled={currentPage === totalPages - 1}
          >
            ›
          </PaginationButton>
        </PaginationWrapper>
      )}
    </Container>
  );
};

export default FavoriteArtist;
