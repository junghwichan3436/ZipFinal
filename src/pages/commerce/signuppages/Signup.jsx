import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Agreement from "../../../components/signup/Agreement";
import Address from "../../../components/signup/Address";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

const Wrapper = styled.div`
  width: 540px;
  margin: 60px auto;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 30px;
  @media screen and (max-width: 1024px) {
    /* width: 360px; */
    /* margin: 30px auto; */
    padding: 6% 3%;
    width: 100%;
  }

  @media screen and (max-width: 428px) {
    /* width: 300px;
    margin: 40px auto; */
  }
`;

const Title = styled.h3`
  font-size: 3.6rem;
  font-weight: bold;
  font-family: "EHNormalTrial";
  @media screen and (max-width: 428px) {
    font-size: 3rem;
  }
`;

const Form = styled.form`
  /* width: 500px; */
  width: 100%;
  height: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid var(--border-color);
  color: var(--border-color);
  padding: 24px 20px;
  transition: all 0.3s;
  &::placeholder {
    opacity: 1;
    transition: opacity 0.3s;
  }
  &:focus {
    border: 1px solid var(--dark-color);
    color: var(--dark-color);
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }
  @media screen and (max-width: 767px) {
    padding: 20px;
  }
`;

const Group = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Btn = styled.button`
  width: 100%;
  font-family: "Pretendard";
  font-size: 1.4rem;
  padding: 24px 0;
  color: var(--light-color);
  background: var(--dark-color);
  border: none;
  cursor: pointer;
  @media screen and (max-width: 428px) {
    padding: 20px 0;
  }
`;

const Desc = styled.p`
  font-size: 1.2rem;
  color: var(--border-color);
`;

const Error = styled.p`
  font-size: 1.2rem;
  color: var(--accent);
`;

const Signup = () => {
  const [isAgreed, setIsAgreed] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const navigate = useNavigate();

  //firebase 회원가입
  const onSubmit = async (data) => {
    if (!isAgreed) {
      alert("필수 약관에 동의해주세요.");
      return;
    }

    // 아티스트 선택 페이지로 이동 및 데이터 전달
    navigate("/signupv2", { state: data });
  };

  return (
    <Wrapper>
      <Title>JOIN</Title>
      <Form id="form" as="form" onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="이름 *"
          {...register("name", { required: "이름을 입력해주세요." })}
        />
        {errors.name && <Error>{errors.name.message}</Error>}
        <Input
          type="text"
          placeholder="아이디 *"
          {...register("username", {
            required: "아이디를 입력해주세요.",
            minLength: {
              value: 4,
              message: "아이디는 최소 4자 이상이어야 합니다.",
            },
          })}
        />
        {errors.username && <Error>{errors.username.message}</Error>}
        <Group>
          <Input
            type="password"
            placeholder="비밀번호 *"
            {...register("password", {
              required: "비밀번호를 입력해주세요.",
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.{10,16}).*$/,
                message:
                  "비밀번호는 영문 + 숫자 포함, 10자 이상 16자 이하입니다.",
              },
            })}
          />
          <Desc>(영문 대소문자+숫자 포함, 10자~16자)</Desc>
          {errors.password && <Error>{errors.password.message}</Error>}
        </Group>
        <Input
          type="password"
          placeholder="비밀번호 확인 *"
          {...register("confirmPassword", {
            required: "비밀번호를 다시 한 번 입력해주세요.",
            validate: (value) =>
              value === password || "비밀번호가 일치하지 않습니다.",
          })}
        />
        {errors.confirmPassword && (
          <Error>{errors.confirmPassword.message}</Error>
        )}
        <Address register={register} setValue={setValue} />
        <Input
          id="email"
          type="email"
          placeholder="이메일 *"
          {...register("email", {
            required: "이메일을 입력해주세요.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "유효한 이메일 형식이 아닙니다.",
            },
          })}
        />
        {errors.email && <Error>{errors.email.message}</Error>}
      </Form>
      <Agreement setIsAgreed={setIsAgreed} />
      <Btn type="submit" form="form">
        다음
      </Btn>
    </Wrapper>
  );
};

export default Signup;
