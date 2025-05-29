import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Kakao from "../../components/login/Kakao";
import { useRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const ImgWrap = styled.div`
  width: 60%;
  height: 100%;
  position: relative;
  aspect-ratio: 1 / 1;
  @media screen and (max-width: 1024px) {
    width: 50%;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Form = styled.form`
  width: 40%;
  height: 100%;
  /* flex: 2; */
  padding: 0 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 1024px) {
    width: 50%;
    padding: 0 3%;
  }
  //모바일
  @media screen and (max-width: 767px) {
    width: 100%;
    padding: 0 3%;
  }
`;

const Inner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  h3 {
    font-size: 3.6rem;
    font-weight: bold;
    font-family: "EHNormalTrial";
  }
  @media screen and (max-width: 428px) {
    h3 {
      font-size: 3rem;
    }
  }
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid var(--border-color);
  padding: 20px 20px;
  &::placeholder {
    opacity: 1;
    transition: opacity 0.3s;
  }
  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }
`;

const Group = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const InputGroup = styled(Group)`
  gap: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 20px 0;
  background: var(--dark-color);
  color: var(--light-color);
  border: none;
  font-family: "EHNormalTrial";
  cursor: pointer;
`;

const SubBtn = styled(Button)`
  background: var(--light-color);
  color: 1px solid var(--dark-color);
  border: 1px solid var(--dark-color);
  position: relative;
`;

const Text = styled.div`
  width: 100%;
  text-align: right;
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const logonNavigate = useNavigate();
  const handleSignupClick = () => {
    navigate("/signup");
  };
  const btnRef = useRef();

  //db에 저장된 아이디, 비밀번호로 로그인
  const handleLogin = async (enteredusername, enteredpassword) => {
    try {
      const q = query(
        collection(db, "users"),
        where("username", "==", enteredusername)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("존재하지 않는 아이디입니다.");
        return;
      }
      const userDoc = querySnapshot.docs[0];
      const { email, name } = userDoc.data();

      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        enteredpassword
      );
      console.log("로그인 성공:", credential.user);
      alert(`${name}님 반갑습니다!`);
      logonNavigate("/");
    } catch (error) {
      alert("로그인 실패: " + error.message);
    }
  };

  //로그인이미지 배열로 저장
  const loginImages = ["/img/login1.jpg", "/img/login2.jpg", "/img/login3.jpg"];

  //랜덤이미지 추출
  const getRandomImage = () => {
    const index = Math.floor(Math.random() * loginImages.length);
    return loginImages[index];
  };

  //랜더링 될때마다 이미지 바뀜
  const randomImage = getRandomImage();

  return (
    <Wrapper>
      <ImgWrap>
        <Img src={randomImage} alt="login" />
      </ImgWrap>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(usernameRef.current.value, passwordRef.current.value);
        }}
      >
        <Inner>
          <h3>LOGIN</h3>
          <Group>
            <Input type="text" placeholder="아이디" ref={usernameRef} />
            <Input type="password" placeholder="비밀번호" ref={passwordRef} />
          </Group>
          <InputGroup>
            <Group>
              <Button
                onClick={() =>
                  handleLogin(
                    username.current.value,
                    userpassword.current.value
                  )
                }
              >
                LOGIN
              </Button>
              <SubBtn ref={btnRef} type="button" onClick={handleSignupClick}>
                CREATE ACCOUNT
              </SubBtn>
            </Group>
            <Text>아이디 | 비밀번호 찾기</Text>
          </InputGroup>
          <Kakao />
        </Inner>
      </Form>
    </Wrapper>
  );
};

export default Login;
