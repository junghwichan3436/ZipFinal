import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Container = styled.div`
  padding: 0 3%;
  margin: 0 auto;
  max-width: 800px;

  @media screen and (max-width: 1024px) {
    padding: 0 5%;
    max-width: 700px;
  }

  @media screen and (max-width: 402px) {
    padding: 0 4%;
    max-width: 100%;
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

const FormGroup = styled.div`
  margin-bottom: 24px;

  @media screen and (max-width: 1024px) {
    margin-bottom: 20px;
  }

  @media screen and (max-width: 402px) {
    margin-bottom: 16px;
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

  &:disabled {
    background: #f8f8f8;
    color: #999;
  }

  @media screen and (max-width: 1024px) {
    padding: 10px;
  }

  @media screen and (max-width: 402px) {
    padding: 10px 8px;
    font-size: 1.2rem;
  }
`;

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

const PasswordRequirement = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-top: 8px;
  font-family: "Pretendard", sans-serif;

  @media screen and (max-width: 402px) {
    font-size: 1rem;
    margin-top: 6px;
    line-height: 1.4;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 35px;

  @media screen and (max-width: 1024px) {
    margin-top: 30px;
    gap: 10px;
  }

  @media screen and (max-width: 402px) {
    margin-top: 25px;
    gap: 8px;
    flex-direction: ${(props) => (props.phoneSection ? "column" : "row")};
  }
`;

const Button = styled.button`
  flex: 1;
  padding: 14px;
  font-size: 1.4rem;
  font-family: "EHNormalTrial", sans-serif;
  border: none;
  cursor: pointer;

  &:disabled {
    background: #f5f5f5;
    color: #ccc;
    cursor: not-allowed;
  }

  @media screen and (max-width: 1024px) {
    padding: 12px;
    font-size: 1.3rem;
  }

  @media screen and (max-width: 402px) {
    padding: 10px;
    font-size: 1.2rem;
  }
`;

const SaveButton = styled(Button)`
  background: #000;
  color: #fff;

  &:hover:not(:disabled) {
    background: #333;
  }
`;

const ChangePasswordButton = styled(Button)`
  background: #e0e0e0;
  color: #333;

  &:hover {
    background: #d0d0d0;
  }

  @media screen and (max-width: 402px) {
    margin-bottom: ${(props) => (props.phoneSection ? "8px" : "0")};
  }
`;

const SectionDivider = styled.hr`
  margin: 48px 0;
  border: none;
  border-top: 1px solid #e0e0e0;

  @media screen and (max-width: 1024px) {
    margin: 40px 0;
  }

  @media screen and (max-width: 402px) {
    margin: 30px 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 24px;
  font-family: "EHNormalTrial", sans-serif;

  @media screen and (max-width: 1024px) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 402px) {
    font-size: 1.4rem;
    margin-bottom: 16px;
  }
`;

const PhoneSection = styled.div`
  background: #f8f8f8;
  padding: 30px 24px; // 상하 패딩 약간 축소
  margin-top: 32px;

  @media screen and (max-width: 1024px) {
    padding: 25px 20px;
    margin-top: 28px;
  }

  @media screen and (max-width: 402px) {
    padding: 20px 16px;
    margin-top: 20px;
  }
`;

const ChangeUserInfo = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePassword = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    if (currentPassword && newPassword && confirmPassword) {
      alert("비밀번호가 변경 되었습니다.");
      // 비밀번호 변경 로직
    }
  };

  const handlePhoneChange = (e) => {
    e.preventDefault();
    if (newPhone) {
      alert("휴대폰 번호가 변경 되었습니다.");
    }
  };

  return (
    <Container>
      <PageTitle>Change User Info</PageTitle>

      <Form onSubmit={handlePasswordChange}>
        <SectionTitle>비밀번호 변경</SectionTitle>

        <FormGroup>
          <Label>현재 비밀번호</Label>
          <InputWrapper>
            <Input
              type={showPasswords.current ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="현재 비밀번호를 입력해주세요"
            />
            <PasswordToggle
              type="button"
              onClick={() => togglePassword("current")}
            >
              <FontAwesomeIcon
                icon={showPasswords.current ? faEyeSlash : faEye}
              />
            </PasswordToggle>
          </InputWrapper>
        </FormGroup>

        <FormGroup>
          <Label>새 비밀번호</Label>
          <InputWrapper>
            <Input
              type={showPasswords.new ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="새 비밀번호를 입력해주세요"
            />
            <PasswordToggle type="button" onClick={() => togglePassword("new")}>
              <FontAwesomeIcon icon={showPasswords.new ? faEyeSlash : faEye} />
            </PasswordToggle>
          </InputWrapper>
          <PasswordRequirement>
            (영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자)
          </PasswordRequirement>
        </FormGroup>

        <FormGroup>
          <Label>새 비밀번호 확인</Label>
          <InputWrapper>
            <Input
              type={showPasswords.confirm ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="새 비밀번호를 다시 입력해주세요"
            />
            <PasswordToggle
              type="button"
              onClick={() => togglePassword("confirm")}
            >
              <FontAwesomeIcon
                icon={showPasswords.confirm ? faEyeSlash : faEye}
              />
            </PasswordToggle>
          </InputWrapper>
        </FormGroup>

        <ButtonGroup>
          <SaveButton
            type="submit"
            disabled={!currentPassword || !newPassword || !confirmPassword}
          >
            저장
          </SaveButton>
        </ButtonGroup>
      </Form>

      <SectionDivider />

      <Form onSubmit={handlePhoneChange}>
        <SectionTitle>휴대폰 번호 변경</SectionTitle>

        <PhoneSection>
          <FormGroup>
            <Label>현재 휴대폰 번호</Label>
            <Input type="text" value="010-1234-5678" disabled />
          </FormGroup>

          <FormGroup>
            <Label>새로운 휴대폰 번호</Label>
            <InputWrapper>
              <Input
                type="text"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                placeholder="새로운 휴대폰 번호를 입력해주세요"
              />
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Label>인증번호</Label>
            <InputWrapper>
              <Input type="text" placeholder="인증번호를 입력해주세요" />
            </InputWrapper>
          </FormGroup>

          <ButtonGroup phoneSection>
            <ChangePasswordButton phoneSection type="button">
              인증번호 발송
            </ChangePasswordButton>
            <SaveButton type="submit" disabled={!newPhone}>
              저장
            </SaveButton>
          </ButtonGroup>
        </PhoneSection>
      </Form>
    </Container>
  );
};

export default ChangeUserInfo;
