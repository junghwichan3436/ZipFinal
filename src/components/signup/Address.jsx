import styled from "styled-components";
import { useDaumPostcodePopup } from "react-daum-postcode";

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
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

const Button = styled.button`
  width: 44%;
  font-family: "Pretendard";
  font-size: 1.4rem;
  padding: 24px 0;
  color: var(--light-color);
  background: var(--dark-color);
  border: none;
  cursor: pointer;
  @media screen and (max-width: 428px) {
    width: 50%;
  }
`;

const Address = ({ register, setValue }) => {
  // 다음 우편번호 API
  const postcodeScriptUrl =
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
  const open = useDaumPostcodePopup(postcodeScriptUrl);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";
    let zonecode = data.zonecode;

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    // react-hook-form 값 업데이트
    setValue("address.zonecode", zonecode);
    setValue("address.fullAddress", fullAddress);
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return (
    <>
      <InputGroup>
        <Input
          type="text"
          placeholder="우편번호"
          {...register("address.zonecode")}
          readOnly
        />
        <Button type="button" onClick={handleClick}>
          우편번호 검색
        </Button>
      </InputGroup>
      <Input
        type="text"
        placeholder="집주소"
        {...register("address.fullAddress")}
        readOnly
      />
      <Input
        type="text"
        placeholder="상세주소"
        {...register("address.detail")}
      />
    </>
  );
};

export default Address;
