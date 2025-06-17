import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";

const Container = styled.div`
  /* width: 600px; */
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* margin-top: 30px; */
  gap: 50px;
  span {
    font-size: 1.6rem;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 10px;
  /* margin-bottom: 50px; */
  h3 {
    font-size: 3.8rem;
    /* font-weight: bold; */
    span {
      font: normal bold 3.8rem/1 "EHNormalTrial";
    }
  }
`;

const Contents = styled.div`
  /* width: 100%; */
  /* height: 100%; */
  width: 600px;
  height: 500px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  overflow-y: auto;
`;

const Star = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* text-align: center; */
  gap: 5px;
`;

const ImgWrap = styled.div`
  position: relative;
  width: 130px;
  height: 130px;
  &:hover .overlay {
    opacity: 1;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  cursor: pointer;
`;

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
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
  color: var(--light-color);
  font-size: 2.6rem;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  transition: opacity 0.3s;
`;

const Skip = styled.p`
  text-align: right;
  margin-bottom: 10px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const ButtonWrap = styled.div`
  /* width: 100%; */
  width: 600px;
  display: flex;
  gap: 40px;
`;

const Button = styled.button`
  width: 100%;
  padding: 20px 0;
  font-family: "pretendard";
  background: var(--light-color);
  border: 1px solid var(--dark-color);
  cursor: pointer;
`;

const Btn = styled(Button)`
  border: none;
  background: var(--dark-color);
  color: var(--light-color);
`;

const Signupv2 = () => {
  const [starData, setStarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtist, setSelectedArtist] = useState(null);

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

  const handleonClick = (id) => {
    setSelectedArtist(id === selectedArtist ? null : id);
  };

  const handleSignup = async () => {
    const artist = starData.find((item) => item.id === selectedArtist);
    const artistName = artist?.artistName || "";

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
        favoriteArtist: artistName,
      });

      console.log("회원가입 성공:", credential.user);
      alert("회원가입이 완료되었습니다!");
      navigate("/");
    } catch (error) {
      console.error("회원가입 에러:", error.message);
      alert(error.message);
    }
  };

  return (
    <Container>
      <Title>
        <span>좋아하는 아티스트를 선택해주세요</span>
        <h3>
          당신의 <span>FAVORITE STAR</span>는?
        </h3>
      </Title>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <Contents>
          {starData.map((artist) => (
            <Star key={artist.id}>
              <ImgWrap onClick={() => handleonClick(artist.id)}>
                <Img src={artist.artistImg} alt={artist.artistName} />
                <Overlay
                  className="overlay"
                  $isVisible={selectedArtist === artist.id}
                />
                {selectedArtist === artist.id && (
                  <StyledIcon
                    icon={faCheck}
                    $isVisible={selectedArtist === artist.id}
                  />
                )}
              </ImgWrap>
              <p>{artist.artistName}</p>
            </Star>
          ))}
        </Contents>
      )}
      <div>
        <Skip>건너뛰기</Skip>
        <ButtonWrap>
          <Button onClick={() => navigate(-1)}>이전</Button>
          <Btn onClick={handleSignup}>회원가입 하기</Btn>
        </ButtonWrap>
      </div>
    </Container>
  );
};

export default Signupv2;
