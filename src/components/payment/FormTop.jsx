import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useAddresses } from "../../hooks/useAddresses";
import DaumPostcode from "react-daum-postcode";

const FormTopSection = styled.div`
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 30px;

  @media screen and (max-width: 402px) {
    margin-bottom: 20px;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 10px;
  font-size: 1.5rem;
  font-weight: 500;

  @media screen and (max-width: 402px) {
    font-size: 1.4rem;
    margin-bottom: 8px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid #ddd;
  font-size: 1.4rem;
  margin-bottom: 5px;

  @media screen and (max-width: 402px) {
    padding: 12px;
    font-size: 1.3rem;
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  cursor: pointer;
`;

const SelectHeader = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 402px) {
    padding: 12px;
    font-size: 1.3rem;
  }
`;

const SelectOptions = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  width: 100%;
  background: white;
  border: 1px solid #ddd;
  border-top: none;
  z-index: 10;
`;

const Option = styled.div`
  padding: 15px;
  border-bottom: 1px solid #f5f5f5;
  &:hover {
    background: #f9f9f9;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 402px) {
    padding: 12px;
    font-size: 1.3rem;
  }
`;

const SelectedMark = styled.span`
  margin-left: 10px;
`;

const ArrowIcon = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-right: 2px solid #000;
  border-bottom: 2px solid #000;
  transform: ${(props) => (props.isOpen ? "rotate(-135deg)" : "rotate(45deg)")};
  transition: transform 0.3s;
`;

const AddressGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;

  @media screen and (max-width: 402px) {
    gap: 5px;
  }
`;

const PostcodeInput = styled.input`
  flex: 1;
  padding: 15px;
  border: 1px solid #ddd;
  font-size: 1.4rem;

  @media screen and (max-width: 402px) {
    padding: 12px;
    font-size: 1.3rem;
  }
`;

const SearchButton = styled.button`
  background-color: #000;
  color: #fff;
  padding: 0 20px;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;

  @media screen and (max-width: 402px) {
    padding: 0 15px;
    font-size: 1.3rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: bold;
  margin: 30px 0 15px;

  @media screen and (max-width: 402px) {
    font-size: 1.5rem;
    margin: 20px 0 10px;
  }
`;

const SubText = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin: 5px 0;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  margin: 10px 0;
  cursor: pointer;

  @media screen and (max-width: 402px) {
    font-size: 1.3rem;
  }
`;

const Checkbox = styled.input`
  margin-right: 8px;
`;

const CouponGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;

  @media screen and (max-width: 402px) {
    gap: 5px;
  }
`;

const CouponInput = styled.input`
  flex: 1;
  padding: 15px;
  border: 1px solid #ddd;
  font-size: 1.4rem;

  @media screen and (max-width: 402px) {
    font-size: 1.3rem;
  }
`;

const CouponButton = styled.button`
  background-color: #000;
  color: #fff;
  padding: 0 15px;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;

  @media screen and (max-width: 402px) {
    font-size: 1.3rem;
    padding: 0 10px;
    white-space: nowrap;
  }
`;

const AllUseButton = styled.button`
  background-color: #f1f1f1;
  color: #000;
  padding: 0 14px;
  border: 1px solid #ddd;
  font-size: 1.5rem;
  cursor: pointer;

  @media screen and (max-width: 402px) {
    font-size: 1.3rem;
    padding: 0 10px;
    white-space: nowrap;
  }
`;

const PostcodeWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  justify-content: center;
  align-items: center;
  z-index: 1200;
`;

const PostcodeContent = styled.div`
  position: relative;
  width: 500px;
  max-width: 95%;
  height: 500px;
  max-height: 95vh;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;

  @media screen and (max-width: 600px) {
    width: 95%;
    height: 400px;
  }
`;

const PostcodeCloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  background: white;
  border: none;
  border-radius: 50%;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1300;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const FormTop = ({
  saveAddress,
  setSaveAddress,
  addressDropdownOpen,
  setAddressDropdownOpen,
  selectedAddress,
  setSelectedAddress,
  openCouponModal,
  selectedCoupon,
}) => {
  // React Query 커스텀 훅 사용
  const { addresses, isLoading } = useAddresses();

  // 폼 상태 관리
  const [formData, setFormData] = useState({
    name: "",
    postcode: "",
    address: "",
    detailAddress: "",
    phoneNumber: "",
  });

  // 우편번호 검색 모달
  const [postcodeVisible, setPostcodeVisible] = useState(false);

  // 주소 옵션 동적 생성
  const getAddressOptions = () => {
    const options = ["신규 입력"];

    // 기본 배송지가 있으면 추가
    const defaultAddress = addresses.find((addr) => addr.isDefault);
    if (defaultAddress) {
      options.push("기본배송지");
    }

    // 나머지 저장된 배송지 추가
    addresses.forEach((addr) => {
      if (!addr.isDefault) {
        // 기본 배송지는 이미 추가했으므로 제외
        options.push(`${addr.title || "Address"} | ${addr.recipient}`);
      }
    });

    return options;
  };

  const addressOptions = getAddressOptions();

  const toggleAddressDropdown = () => {
    setAddressDropdownOpen(!addressDropdownOpen);
  };

  const selectAddress = (address) => {
    setSelectedAddress(address);
    setAddressDropdownOpen(false);

    // 선택된 주소에 따라 폼 데이터 업데이트
    if (address === "신규 입력") {
      // 폼 초기화
      setFormData({
        name: "",
        postcode: "",
        address: "",
        detailAddress: "",
        phoneNumber: "",
      });
    } else if (address === "기본배송지") {
      // 기본 배송지 정보로 폼 업데이트
      const defaultAddress = addresses.find((addr) => addr.isDefault);
      if (defaultAddress) {
        setFormData({
          name: defaultAddress.recipient,
          postcode: defaultAddress.zipCode,
          address: defaultAddress.address,
          detailAddress: defaultAddress.detailAddress,
          phoneNumber: defaultAddress.phone,
        });
      }
    } else {
      // 선택한 특정 배송지 정보로 폼 업데이트
      const addressTitle = address.split(" | ")[0];
      const selectedAddressData = addresses.find(
        (addr) =>
          addr.title === addressTitle ||
          `${addr.title} | ${addr.recipient}` === address
      );

      if (selectedAddressData) {
        setFormData({
          name: selectedAddressData.recipient,
          postcode: selectedAddressData.zipCode,
          address: selectedAddressData.address,
          detailAddress: selectedAddressData.detailAddress,
          phoneNumber: selectedAddressData.phone,
        });
      }
    }
  };

  // 입력 필드 변경 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 우편번호 검색 완료 처리
  const handlePostcodeComplete = (data) => {
    // 도로명 주소 또는 지번 주소를 사용
    let fullAddress = data.roadAddress || data.jibunAddress;
    const extraAddress = [];

    if (data.bname !== "") {
      extraAddress.push(data.bname);
    }
    if (data.buildingName !== "") {
      extraAddress.push(data.buildingName);
    }
    if (extraAddress.length > 0) {
      fullAddress += ` (${extraAddress.join(", ")})`;
    }

    // 우편번호 및 주소 상태 업데이트
    setFormData({
      ...formData,
      postcode: data.zonecode,
      address: fullAddress,
    });

    // 우편번호 검색 창 닫기
    setPostcodeVisible(false);
  };

  // 쿠폰이 선택되었는지 확인
  const isCouponSelected =
    selectedCoupon !== "선택 없음" && selectedCoupon !== "";

  // 선택된 쿠폰 이름 표시용 함수
  const getShortCouponName = () => {
    if (!isCouponSelected) return "";

    if (selectedCoupon.includes("MID SEASON")) {
      return "MID SEASON OFF SALE 10% COUPON";
    } else if (selectedCoupon.includes("BIRTH DAY")) {
      return "HAPPY BIRTH DAY 15% COUPON";
    } else if (selectedCoupon.includes("WELCOME")) {
      return "WELCOME COUPON 10% COUPON";
    }

    return selectedCoupon;
  };

  // 적립금 사용 가능 여부
  const points = { available: 0 }; // 기본값
  const isPointsAvailable = points.available > 0;

  return (
    <FormTopSection>
      <FormGroup>
        <Label>내 배송지</Label>
        <SelectWrapper onClick={toggleAddressDropdown}>
          <SelectHeader>
            {selectedAddress}
            <ArrowIcon isOpen={addressDropdownOpen} />
          </SelectHeader>
          <SelectOptions isOpen={addressDropdownOpen}>
            {addressOptions.map((option, index) => (
              <Option key={index} onClick={() => selectAddress(option)}>
                {option}
                {option === selectedAddress && <SelectedMark>✓</SelectedMark>}
              </Option>
            ))}
          </SelectOptions>
        </SelectWrapper>
      </FormGroup>

      <FormGroup>
        <Label>이름</Label>
        <Input
          type="text"
          placeholder="이름"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </FormGroup>

      <FormGroup>
        <Label>주소</Label>
        <AddressGroup>
          <PostcodeInput
            type="text"
            placeholder="우편번호"
            name="postcode"
            value={formData.postcode}
            onChange={handleInputChange}
          />
          <SearchButton onClick={() => setPostcodeVisible(true)}>
            우편번호 검색
          </SearchButton>
        </AddressGroup>
        <Input
          type="text"
          placeholder="주소"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />
        <Input
          type="text"
          placeholder="상세주소"
          name="detailAddress"
          value={formData.detailAddress}
          onChange={handleInputChange}
        />
      </FormGroup>

      <FormGroup>
        <Label>휴대폰 번호</Label>
        <Input
          type="text"
          placeholder="휴대폰 번호"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
        <SubText>하이픈(-) 빼고 입력</SubText>
      </FormGroup>

      <CheckboxLabel>
        <Checkbox
          type="checkbox"
          checked={saveAddress}
          onChange={() => setSaveAddress(!saveAddress)}
        />
        기본 배송지로 저장
      </CheckboxLabel>

      {/* 쿠폰 & 마일리지 섹션 */}
      <SectionTitle>쿠폰 & 마일리지</SectionTitle>
      <CouponGroup>
        <CouponInput
          type="text"
          placeholder="쿠폰 할인"
          value={isCouponSelected ? getShortCouponName() : ""}
          readOnly
        />
        <CouponButton onClick={openCouponModal}>쿠폰 사용</CouponButton>
      </CouponGroup>
      <CouponGroup>
        <CouponInput
          type="text"
          placeholder="적립금 사용"
          disabled={!isPointsAvailable}
        />
        <AllUseButton disabled={!isPointsAvailable}>모두 사용</AllUseButton>
      </CouponGroup>
      <SubText>보유 적립금: 0원</SubText>
      <SubText>사용가능한 적립금: 0원</SubText>
      <PostcodeWrapper isOpen={postcodeVisible}>
        <PostcodeContent>
          <PostcodeCloseButton onClick={() => setPostcodeVisible(false)}>
            ×
          </PostcodeCloseButton>
          <DaumPostcode
            onComplete={handlePostcodeComplete}
            style={{ width: "100%", height: "100%" }}
          />
        </PostcodeContent>
      </PostcodeWrapper>
    </FormTopSection>
  );
};

export default FormTop;
