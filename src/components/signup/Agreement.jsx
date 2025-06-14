import { useState, useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #838383;
`;

const Title = styled.h3`
  /* font-size: 1.8rem; */
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  label {
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    input {
      margin: 0;
    }
    .allAgree {
      font-weight: bold;
    }
  }
`;

const CheckboxGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AgreementGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  label {
    display: flex;
    align-items: center;
    gap: 10px;
    line-height: 16px;
    cursor: pointer;
    input {
      margin: 0;
    }
  }
`;

const Text = styled.p`
  font-size: 1.2rem;
  text-decoration: underline;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    color: var(--dark-color);
  }
`;

const Agreement = ({ setIsAgreed }) => {
  const [allChecked, setAllChecked] = useState(false);
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    shopping: false,
  });

  useEffect(() => {
    const requiredAgreement = agreements.terms && agreements.privacy;
    setIsAgreed(requiredAgreement);
  }, [agreements, setIsAgreed]);

  //전체동의
  const handleAllChecked = (e) => {
    const checked = e.target.checked;
    setAllChecked(checked);
    setAgreements({
      terms: checked,
      privacy: checked,
      shopping: checked,
    });
  };

  //개별선택
  const handleAgreement = (e) => {
    const { name, checked } = e.target;
    const updated = { ...agreements, [name]: checked };
    setAgreements(updated);

    const allagreement = updated.terms && updated.privacy && updated.shopping;
    setAllChecked(allagreement);
  };
  return (
    <Wrapper>
      <Title>이용약관</Title>
      <Group>
        <label>
          <input
            type="checkbox"
            checked={allChecked}
            onChange={handleAllChecked}
          />
          <span className="allAgree"> 아래 약관에 모두 동의합니다.</span>
        </label>
        <CheckboxGroup>
          <AgreementGroup>
            <label>
              <input
                type="checkbox"
                name="terms"
                checked={agreements.terms}
                onChange={handleAgreement}
              />
              <span> [필수] 이용약관 동의</span>
            </label>
            <Text>자세히 보기</Text>
          </AgreementGroup>
          <AgreementGroup>
            <label>
              <input
                type="checkbox"
                name="privacy"
                checked={agreements.privacy}
                onChange={handleAgreement}
              />
              <span> [필수] 개인정보 수집 및 이용동의</span>
            </label>
            <Text>자세히 보기</Text>
          </AgreementGroup>
          <AgreementGroup>
            <label>
              <input
                type="checkbox"
                name="shopping"
                checked={agreements.shopping}
                onChange={handleAgreement}
              />
              <span>[선택] 쇼핑정보 수신 동의</span>
            </label>
            <Text>자세히 보기</Text>
          </AgreementGroup>
        </CheckboxGroup>
      </Group>
    </Wrapper>
  );
};

export default Agreement;
