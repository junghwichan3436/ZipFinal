import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 40px 20px;
  span {
    font-size: 1.6rem;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
  h3 {
    font-size: 3.8rem;
    span {
      font: normal bold 3.8rem/1 "EHNormalTrial";
    }
  }
  @media screen and (max-width: 767px) {
    h3 {
      font-size: 3rem;
      span {
        font-size: 3rem;
      }
    }
  }
`;

const SelectionInfo = styled.div`
  text-align: center;
  color: var(--subTitle);
  /* font-size: 1.4rem; */
  margin-bottom: 10px;

  .count {
    color: #007bff;
    font-weight: bold;
    font-size: 1.6rem;
  }
  @media screen and (max-width: 767px) {
    span {
      font-size: 1.4rem;
    }
  }
`;

const Contents = styled.div`
  width: 100%;
  max-width: 600px;
  height: 400px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  overflow-y: auto;
  padding: 20px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;

  @media screen and (max-width: 767px) {
    /* grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); */
    /* grid-template-columns: repeat(2, 1fr); */
    max-width: 500px;
    gap: 15px;
    height: 350px;
  }
`;

const Star = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

const ImgWrap = styled.div`
  position: relative;
  width: 100px;
  height: 100px;

  @media screen and (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  transition: all 0.3s ease;
  border: ${(props) =>
    props.$isSelected ? "3px solid #007bff" : "2px solid transparent"};
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  background: rgba(0, 123, 255, 0.7);
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.3s;
  pointer-events: none;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
  color: white;
  font-size: 2.2rem;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.3s;
`;

// 선택된 개수 표시 배지
const SelectionBadge = styled.div`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #28a745;
  color: var(--light-color);
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: bold;
  z-index: 4;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.3s;
`;

const ArtistName = styled.p`
  margin: 0;
  font-size: 1.3rem;
  text-align: center;
  color: ${(props) => (props.$isSelected ? "#007bff" : "#333")};
  font-weight: ${(props) => (props.$isSelected ? "bold" : "normal")};
  transition: color 0.3s ease;

  @media screen and (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ButtonSection = styled.div`
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  @media screen and (max-width: 767px) {
    max-width: 500px;
  }
`;

const Skip = styled.p`
  text-align: right;
  margin: 0;
  cursor: pointer;
  color: #666;
  font-size: 1.4rem;

  &:hover {
    text-decoration: underline;
    color: #333;
  }
`;

const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  gap: 15px;
`;

const Button = styled.button`
  flex: 1;
  padding: 16px 0;
  font-family: "pretendard";
  font-size: 1.5rem;
  background: var(--light-color);
  border: 1px solid var(--dark-color);
  cursor: pointer;
  /* border-radius: 4px; */
  transition: all 0.3s ease;

  &:hover {
    background: #f5f5f5;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SignupBtn = styled(Button)`
  border: none;
  background: var(--dark-color);
  color: var(--light-color);
  &:hover:not(:disabled) {
    background: #333;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.6rem;
  color: #666;
`;

const Signupv2 = () => {
  const [starData, setStarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtists, setSelectedArtists] = useState([]); // 배열로 변경
  const [isSigningUp, setIsSigningUp] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state;

  useEffect(() => {
    fetch("/API/index.json")
      .then((res) => res.json())
      .then((data) => {
        setStarData(data.artists);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading artists:", err);
        setLoading(false);
      });
  }, []);

  // 아티스트 선택/해제 핸들러
  const handleArtistClick = (artistId) => {
    setSelectedArtists((prev) => {
      if (prev.includes(artistId)) {
        // 이미 선택된 경우 제거
        return prev.filter((id) => id !== artistId);
      } else {
        // 선택되지 않은 경우 추가
        return [...prev, artistId];
      }
    });
  };

  // 회원가입 처리 (선택된 아티스트들과 함께)
  const handleSignup = async () => {
    if (isSigningUp) return;

    setIsSigningUp(true);

    // 선택된 아티스트들의 이름 배열 생성
    const selectedArtistNames = selectedArtists
      .map((id) => {
        const artist = starData.find((item) => item.id === id);
        return artist?.artistName || "";
      })
      .filter((name) => name !== "");

    const { email, password, username, name } = userData;

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = credential.user;

      await setDoc(doc(db, "users", user.uid), {
        email,
        username,
        name,
        address: userData.address,
        createdAt: new Date(),
        favoriteArtists: selectedArtistNames, // 배열로 저장
      });

      console.log("회원가입 성공:", credential.user);
      console.log("선택된 아티스트들:", selectedArtistNames);
      alert("회원가입이 완료되었습니다!");
      navigate("/");
    } catch (error) {
      console.error("회원가입 에러:", error.message);
      alert(error.message);
    } finally {
      setIsSigningUp(false);
    }
  };

  // 건너뛰기 (아티스트 선택 없이 회원가입)
  const handleSkip = async () => {
    if (isSigningUp) return;

    setIsSigningUp(true);

    const { email, password, username, name } = userData;

    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = credential.user;

      await setDoc(doc(db, "users", user.uid), {
        email,
        username,
        name,
        address: userData.address,
        createdAt: new Date(),
        favoriteArtists: [], // 빈 배열로 저장
      });

      console.log("회원가입 성공 (아티스트 선택 건너뛰기):", credential.user);
      alert("회원가입이 완료되었습니다!");
      navigate("/");
    } catch (error) {
      console.error("회원가입 에러:", error.message);
      alert(error.message);
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <Container>
      <Title>
        <span>좋아하는 아티스트를 선택해주세요 (복수 선택 가능)</span>
        <h3>
          당신의 <span>FAVORITE STAR</span>는?
        </h3>
      </Title>

      <SelectionInfo>
        {selectedArtists.length > 0 ? (
          <span>
            <span className="count">{selectedArtists.length}명</span>의
            아티스트를 선택했습니다 ❤️
          </span>
        ) : (
          <span>
            아티스트를 선택하거나 건너뛰고 나중에 마이페이지에서 설정할 수
            있어요
          </span>
        )}
      </SelectionInfo>

      {loading ? (
        <LoadingSpinner>아티스트 목록을 불러오는 중...</LoadingSpinner>
      ) : (
        <Contents>
          {starData.map((artist, index) => {
            const isSelected = selectedArtists.includes(artist.id);
            const selectionOrder = selectedArtists.indexOf(artist.id) + 1;

            return (
              <Star
                key={artist.id}
                onClick={() => handleArtistClick(artist.id)}
              >
                <ImgWrap>
                  <Img
                    src={artist.artistImg}
                    alt={artist.artistName}
                    $isSelected={isSelected}
                  />
                  <Overlay $isVisible={isSelected} />
                  {isSelected && (
                    <>
                      <StyledIcon icon={faCheck} $isVisible={isSelected} />
                      <SelectionBadge $isVisible={isSelected}>
                        {selectionOrder}
                      </SelectionBadge>
                    </>
                  )}
                </ImgWrap>
                <ArtistName $isSelected={isSelected}>
                  {artist.artistName}
                </ArtistName>
              </Star>
            );
          })}
        </Contents>
      )}

      <ButtonSection>
        <Skip onClick={handleSkip}>
          {isSigningUp ? "처리중..." : "건너뛰고 회원가입하기"}
        </Skip>
        <ButtonWrap>
          <Button onClick={() => navigate(-1)} disabled={isSigningUp}>
            이전
          </Button>
          <SignupBtn onClick={handleSignup} disabled={isSigningUp}>
            {isSigningUp
              ? "가입 중..."
              : selectedArtists.length > 0
              ? `${selectedArtists.length}명과 함께 가입하기`
              : "회원가입 하기"}
          </SignupBtn>
        </ButtonWrap>
      </ButtonSection>
    </Container>
  );
};

export default Signupv2;
