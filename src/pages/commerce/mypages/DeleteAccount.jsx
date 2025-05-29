import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  padding: 0 3%;
  margin: 0 auto;

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
    margin-top: 50px;
    margin-bottom: 35px;
  }

  @media screen and (max-width: 402px) {
    font-size: 2.2rem;
    margin-top: 40px;
    margin-bottom: 30px;
  }
`;

const Form = styled.form`
  max-width: 600px;
  margin: 0 auto;

  @media screen and (max-width: 1024px) {
    max-width: 550px;
  }

  @media screen and (max-width: 402px) {
    max-width: 100%;
  }
`;

const Description = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.3rem;
  margin-bottom: 40px;
  font-family: "Pretendard", sans-serif;

  @media screen and (max-width: 1024px) {
    font-size: 1.2rem;
    margin-bottom: 35px;
  }

  @media screen and (max-width: 402px) {
    font-size: 1.1rem;
    margin-bottom: 30px;
    line-height: 1.5;
  }
`;

const InputGroup = styled.div`
  margin-bottom: 32px;

  @media screen and (max-width: 1024px) {
    margin-bottom: 28px;
  }

  @media screen and (max-width: 402px) {
    margin-bottom: 24px;
  }
`;

const Label = styled.label`
  display: block;
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 8px;
  font-family: "Pretendard", sans-serif;

  @media screen and (max-width: 402px) {
    font-size: 1.3rem;
    margin-bottom: 6px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  font-size: 1.3rem;
  font-family: "Pretendard", sans-serif;

  &:focus {
    outline: none;
    border-color: #333;
  }

  @media screen and (max-width: 1024px) {
    padding: 10px 12px;
  }

  @media screen and (max-width: 402px) {
    padding: 10px 8px;
    font-size: 1.2rem;
  }
`;

// FontAwesome 아이콘을 위한 스타일 수정
const PasswordToggle = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 24px;
  height: 24px;

  @media screen and (max-width: 402px) {
    right: 8px;
    font-size: 1.4rem;
  }
`;

const DeleteButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #e0e0e0;
  color: #666;
  border: none;
  font-size: 1.4rem;
  font-family: "EHNormalTrial", sans-serif;
  cursor: pointer;
  margin-top: 24px;

  &:hover {
    background: #d0d0d0;
  }

  &:disabled {
    background: #f5f5f5;
    color: #ccc;
    cursor: not-allowed;
  }

  @media screen and (max-width: 1024px) {
    padding: 14px;
    margin-top: 20px;
  }

  @media screen and (max-width: 402px) {
    padding: 12px;
    font-size: 1.3rem;
    margin-top: 16px;
  }
`;

const Notice = styled.div`
  margin-top: 30px;
  padding: 24px;
  background: #f8f8f8;
  border: 1px solid #e0e0e0;

  @media screen and (max-width: 1024px) {
    margin-top: 35px;
    padding: 20px;
  }

  @media screen and (max-width: 402px) {
    margin-top: 30px;
    padding: 16px;
  }
`;

const NoticeTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 16px;
  font-family: "EHNormalTrial", sans-serif;

  @media screen and (max-width: 1024px) {
    font-size: 1.3rem;
    margin-bottom: 14px;
  }

  @media screen and (max-width: 402px) {
    font-size: 1.2rem;
    margin-bottom: 12px;
  }
`;

const NoticeText = styled.p`
  font-size: 1.4rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 8px;
  font-family: "Pretendard", sans-serif;

  @media screen and (max-width: 1024px) {
    font-size: 1.1rem;
    margin-bottom: 6px;
  }

  @media screen and (max-width: 402px) {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 5px;
  }
`;

const Checkbox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  margin-top: 0px;

  input {
    margin-right: 5px;
    width: 15px;
    height: 15px;

    @media screen and (max-width: 402px) {
      width: 13px;
      height: 13px;
    }
  }

  label {
    font-size: 1.2rem;
    color: #333;
    font-family: "Pretendard", sans-serif;

    @media screen and (max-width: 1024px) {
      font-size: 1.2rem;
    }

    @media screen and (max-width: 402px) {
      font-size: 1.1rem;
      line-height: 1.4;
    }
  }

  @media screen and (max-width: 1024px) {
    margin-top: 28px;
  }

  @media screen and (max-width: 402px) {
    margin-top: 24px;
  }
`;

const DeleteAccount = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password && agreed) {
      // 회원 탈퇴 로직 실행
      if (window.confirm("정말로 회원 탈퇴를 하시겠습니까?")) {
        // 탈퇴 처리
        alert("회원 탈퇴가 정상적으로 처리 되었습니다.");
      }
    }
  };

  return (
    <Container>
      <PageTitle>Delete Account</PageTitle>

      <Description>
        회원님의 정보를 안전하게 보호하기 위해 비밀번호를 다시 한 번
        입력해주세요.
      </Description>

      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>비밀번호</Label>
          <InputWrapper>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </PasswordToggle>
          </InputWrapper>
        </InputGroup>

        <Notice>
          <NoticeTitle>회원 탈퇴 안내</NoticeTitle>
          <NoticeText>• 회원 탈퇴 시 모든 개인정보가 삭제됩니다.</NoticeText>
          <NoticeText>
            • 탈퇴 후 동일한 아이디로 재가입이 불가능합니다.
          </NoticeText>
          <NoticeText>• 보유하신 적립금과 쿠폰은 모두 소멸됩니다.</NoticeText>
          <NoticeText>
            • 미처리된 주문이 있는 경우 탈퇴가 제한될 수 있습니다.
          </NoticeText>
        </Notice>

        <Checkbox>
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label htmlFor="agree">
            안내사항을 모두 확인하였으며, 이에 동의합니다.
          </label>
        </Checkbox>

        <DeleteButton type="submit" disabled={!password || !agreed}>
          확인
        </DeleteButton>
      </Form>
    </Container>
  );
};

export default DeleteAccount;
