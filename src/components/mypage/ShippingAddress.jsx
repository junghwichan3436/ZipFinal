import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";

// Modal styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 40px;
  width: 90%;
  max-width: 600px;
  position: relative;

  @media screen and (max-width: 1024px) {
    padding: 30px;
    max-width: 500px;
  }

  @media screen and (max-width: 402px) {
    padding: 25px 20px;
    width: 95%;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;

  @media screen and (max-width: 402px) {
    margin-bottom: 20px;
  }
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  width: 100%;
  font-family: "Pretendard", sans-serif;
  padding-right: 24px; /* Space for close button */

  @media screen and (max-width: 1024px) {
    font-size: 1.8rem;
  }

  @media screen and (max-width: 402px) {
    font-size: 1.6rem;
    padding-right: 20px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 2.4rem;
  cursor: pointer;
  padding: 0;
  color: #000;
  position: absolute;
  right: 40px;
  top: 40px;

  @media screen and (max-width: 1024px) {
    right: 30px;
    top: 30px;
    font-size: 2.2rem;
  }

  @media screen and (max-width: 402px) {
    right: 20px;
    top: 25px;
    font-size: 2rem;
  }
`;

const AddressForm = styled.form`
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
  width: 100%;

  @media screen and (max-width: 402px) {
    margin-bottom: 8px;
  }
`;

const Label = styled.div`
  display: block;
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 8px;
  font-family: "Pretendard", sans-serif;
  font-weight: 500;

  @media screen and (max-width: 402px) {
    font-size: 1.3rem;
    margin-bottom: 6px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 1px solid #e0e0e0;
  font-size: 1.4rem;
  font-family: "Pretendard", sans-serif;
  margin-bottom: 10px;

  &:focus {
    outline: none;
    border-color: #333;
  }

  &:disabled {
    background: #f8f8f8;
    color: #999;
  }

  @media screen and (max-width: 1024px) {
    padding: 12px;
  }

  @media screen and (max-width: 402px) {
    padding: 10px;
    font-size: 1.3rem;
    margin-bottom: 8px;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;

  @media screen and (max-width: 402px) {
    gap: 5px;
  }
`;

const ZipCodeInput = styled(Input)`
  flex: 1;
`;

const SearchButton = styled.button`
  padding: 0 15px;
  height: 47px; /* 입력 필드 높이와 맞춤 */
  background: #000;
  color: #fff;
  border: none;
  font-size: 1.4rem;
  cursor: pointer;
  font-family: "Pretendard", sans-serif;
  white-space: nowrap;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1024px) {
    height: 41px; /* 조정된 입력 필드 높이에 맞춤 */
    padding: 0 12px;
  }

  @media screen and (max-width: 402px) {
    height: 37px; /* 조정된 입력 필드 높이에 맞춤 */
    padding: 0 10px;
    font-size: 1.2rem;
  }
`;

const NoteText = styled.div`
  color: #999;
  font-size: 1.2rem;
  margin-top: 5px;
  font-family: "Pretendard", sans-serif;

  @media screen and (max-width: 402px) {
    font-size: 1.1rem;
    margin-top: 3px;
  }
`;

const CheckboxContainer = styled.div`
  margin: 15px 0;

  @media screen and (max-width: 402px) {
    margin: 12px 0;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  color: #333;
  font-family: "Pretendard", sans-serif;
  cursor: pointer;

  @media screen and (max-width: 402px) {
    font-size: 1.3rem;
  }
`;

const Checkbox = styled.input`
  margin-right: 10px;
  width: 20px;
  height: 20px;

  @media screen and (max-width: 402px) {
    margin-right: 8px;
    width: 18px;
    height: 18px;
  }
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 15px;
  background: #000;
  color: #fff;
  border: none;
  font-size: 1.6rem;
  font-family: "Pretendard", sans-serif;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-transform: uppercase;

  @media screen and (max-width: 1024px) {
    padding: 12px;
    font-size: 1.5rem;
  }

  @media screen and (max-width: 402px) {
    padding: 10px;
    font-size: 1.4rem;
  }
`;

// 다음 우편번호 컴포넌트 스타일 추가
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

// 알림 메시지 스타일
const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 15px 20px;
  background-color: ${(props) => (props.success ? "#4caf50" : "#f44336")};
  color: white;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 1.4rem;
  z-index: 1100;
  opacity: ${(props) => (props.visible ? "1" : "0")};
  transform: translateY(${(props) => (props.visible ? "0" : "-20px")});
  transition: opacity 0.3s, transform 0.3s;

  @media screen and (max-width: 402px) {
    font-size: 1.3rem;
    padding: 12px 15px;
    right: 10px;
    top: 10px;
  }
`;

const ShippingAddress = ({
  isOpen,
  onClose,
  onAddAddress,
  editAddress = null,
  isEditMode = false,
}) => {
  // 우편번호 모달 상태 관리
  const [postcodeVisible, setPostcodeVisible] = useState(false);

  // 알림 상태 관리
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
    success: true,
  });

  // 새 주소 상태 관리 (편집 모드일 경우 기존 주소 정보로 초기화)
  const [addressData, setAddressData] = useState({
    recipient: "",
    phone: "",
    zipCode: "",
    address: "",
    detailAddress: "",
    isDefault: false,
    title: "",
  });

  // 편집 모드일 경우 기존 주소 정보로 필드 초기화
  useEffect(() => {
    if (isEditMode && editAddress) {
      setAddressData({
        recipient: editAddress.recipient || "",
        phone: editAddress.phone || "",
        zipCode: editAddress.zipCode || "",
        address: editAddress.address || "",
        detailAddress: editAddress.detailAddress || "",
        isDefault: editAddress.isDefault || false,
        title: editAddress.title || "",
      });
    } else {
      // 새 주소 모드일 경우 필드 초기화
      setAddressData({
        recipient: "",
        phone: "",
        zipCode: "",
        address: "",
        detailAddress: "",
        isDefault: false,
        title: "",
      });
    }
  }, [isOpen, isEditMode, editAddress]);

  // 입력값 변경 함수
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressData({
      ...addressData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // 알림 표시 함수
  const showNotification = (message, success = true) => {
    setNotification({
      visible: true,
      message,
      success,
    });

    // 3초 후 알림 숨기기
    setTimeout(() => {
      setNotification((prev) => ({
        ...prev,
        visible: false,
      }));
    }, 3000);
  };

  // 우편번호 검색 모달 열기
  const handleOpenPostcode = () => {
    setPostcodeVisible(true);
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
    setAddressData({
      ...addressData,
      zipCode: data.zonecode,
      address: fullAddress,
    });

    // 우편번호 검색 창 닫기
    setPostcodeVisible(false);
  };

  // 주소 저장 함수
  const handleSaveAddress = (e) => {
    e.preventDefault();

    // 필수 필드 검증
    if (
      !addressData.recipient ||
      !addressData.phone ||
      !addressData.zipCode ||
      !addressData.address
    ) {
      showNotification("모든 필수 항목을 입력해주세요.", false);
      return;
    }

    // 부모 컴포넌트로 주소 데이터 전달
    onAddAddress(addressData);

    // 모달 닫기
    onClose();
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>{isEditMode ? "배송지 수정" : "배송지 등록"}</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>

        <AddressForm onSubmit={handleSaveAddress}>
          <FormGroup>
            <Input
              type="text"
              name="title"
              placeholder="배송지명"
              value={addressData.title}
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Input
              type="text"
              name="recipient"
              placeholder="이름"
              value={addressData.recipient}
              onChange={handleInputChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>주소</Label>
            <InputWrapper>
              <ZipCodeInput
                type="text"
                name="zipCode"
                placeholder="우편번호"
                value={addressData.zipCode}
                onChange={handleInputChange}
                required
                readOnly
              />
              <SearchButton type="button" onClick={handleOpenPostcode}>
                우편번호 검색
              </SearchButton>
            </InputWrapper>
          </FormGroup>

          <FormGroup>
            <Input
              type="text"
              name="address"
              placeholder="주소"
              value={addressData.address}
              onChange={handleInputChange}
              required
              readOnly
            />
          </FormGroup>

          <FormGroup>
            <Input
              type="text"
              name="detailAddress"
              placeholder="상세주소"
              value={addressData.detailAddress}
              onChange={handleInputChange}
            />
          </FormGroup>

          <FormGroup>
            <Input
              type="tel"
              name="phone"
              placeholder="휴대폰 번호"
              value={addressData.phone}
              onChange={handleInputChange}
              required
            />
            <NoteText>하이픈(-) 없이 입력</NoteText>
          </FormGroup>

          <CheckboxContainer>
            <CheckboxLabel>
              <Checkbox
                type="checkbox"
                name="isDefault"
                checked={addressData.isDefault}
                onChange={handleInputChange}
              />
              기본 배송지로 저장
            </CheckboxLabel>
          </CheckboxContainer>

          <SaveButton type="submit">
            {isEditMode ? "수정하기" : "저장하기"}
          </SaveButton>
        </AddressForm>
      </ModalContent>

      {/* 다음 우편번호 검색 모달 */}
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

      {/* 알림 메시지 */}
      <Notification
        visible={notification.visible}
        success={notification.success}
      >
        {notification.message}
      </Notification>
    </ModalOverlay>
  );
};

export default ShippingAddress;
