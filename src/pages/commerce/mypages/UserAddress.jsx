import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ShippingAddress from "../../../components/mypage/ShippingAddress";
import { useAddresses } from "../../../hooks/useAddresses";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Container = styled.div`
  padding: 0 3%;
  margin: 0 auto;
  max-width: 800px;

  @media screen and (max-width: 1024px) {
    padding: 0 5%;
    max-width: 700px;
  }

  @media screen and (max-width: 402px) {
    padding: 0 3%;
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
    margin-bottom: 50px;
  }

  @media screen and (max-width: 402px) {
    margin-bottom: 40px;
    font-size: 2.2rem;
  }
`;

const AddressHeader = styled.div`
  margin-bottom: 24px;

  @media screen and (max-width: 1024px) {
    margin-bottom: 25px;
  }

  @media screen and (max-width: 402px) {
    margin-bottom: 20px;
  }
`;

const TabButton = styled.button`
  width: 100%;
  padding: 15px;
  border: 1px solid #e0e0e0;
  background: #fff;
  color: #333;
  font-size: 1.4rem;
  text-align: center;
  cursor: pointer;
  font-family: "Pretendard", sans-serif;
  margin-bottom: 40px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f5f5f5;
  }

  @media screen and (max-width: 1024px) {
    margin-bottom: 30px;
  }

  @media screen and (max-width: 402px) {
    margin-bottom: 25px;
    padding: 12px;
    font-size: 1.3rem;
  }
`;

const AddressList = styled.div`
  margin-top: 20px;

  @media screen and (max-width: 1024px) {
    margin-top: 40px;
  }

  @media screen and (max-width: 402px) {
    margin-top: 30px;
  }
`;

const AddressItem = styled.div`
  background: #f8f8f8;
  padding: 28px;
  margin-bottom: 20px;
  position: relative;

  @media screen and (max-width: 1024px) {
    padding: 24px;
  }

  @media screen and (max-width: 402px) {
    padding: 18px;
    margin-bottom: 15px;
  }
`;

const AddressInfo = styled.div`
  font-size: 1.4rem;
  font-family: "Pretendard", sans-serif;
  line-height: 1.7;
  margin-bottom: 20px;

  @media screen and (max-width: 1024px) {
    margin-bottom: 15px;
  }

  @media screen and (max-width: 402px) {
    font-size: 1.3rem;
    line-height: 1.5;
    margin-bottom: 12px;
  }
`;

const AddressName = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const DefaultBadgeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DefaultBadge = styled.span`
  background: #333;
  color: #fff;
  padding: 5px 10px;
  font-size: 1.3rem;
  font-family: "Pretendard", sans-serif;
  margin-left: 8px;

  @media screen and (max-width: 402px) {
    font-size: 1rem;
    padding: 4px 8px;
  }
`;

const Recipient = styled.div`
  font-weight: bold;
  font-size: 1.7rem;

  @media screen and (max-width: 402px) {
    font-size: 1.4rem;
  }
`;

const AddressText = styled.div`
  margin-bottom: 5px;
`;

const ZipCode = styled.div`
  color: #666;
`;

const Phone = styled.div`
  color: #666;
  margin-top: 5px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 5px;
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  border: none;
  background: #fff;
  color: #333;
  font-size: 1.3rem;
  cursor: pointer;
  font-family: "Pretendard", sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background: #333;
    color: #fff;
  }

  @media screen and (max-width: 1024px) {
    padding: 9px 18px;
  }

  @media screen and (max-width: 402px) {
    padding: 8px 15px;
    font-size: 1.2rem;
  }
`;

const NoAddressText = styled.p`
  text-align: center;
  color: #666;
  font-size: 1.4rem;
  margin: 60px 0;
  font-family: "Pretendard", sans-serif;

  @media screen and (max-width: 1024px) {
    margin: 50px 0;
  }

  @media screen and (max-width: 402px) {
    font-size: 1.3rem;
    margin: 40px 0;
  }
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

const queryClient = new QueryClient();

const UserAddress = () => {
  // React Query 커스텀 훅 사용
  const { addresses, isLoading, addOrUpdateAddress, deleteAddress } =
    useAddresses();

  // 배송지 모달 상태
  const [isShippingModalOpen, setIsShippingModalOpen] = useState(false);

  // 현재 편집 중인 주소 ID 상태
  const [editingAddressId, setEditingAddressId] = useState(null);

  // 알림 상태
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
    success: true,
  });

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

  // 모달 열기 함수 - 새 주소 등록
  const handleOpenShippingModal = () => {
    setEditingAddressId(null); // 편집 ID 초기화 (새 주소 등록 모드)
    setIsShippingModalOpen(true);
  };

  // 모달 열기 함수 - 기존 주소 수정
  const handleEditAddress = (addressId) => {
    setEditingAddressId(addressId); // 편집할 주소 ID 설정
    setIsShippingModalOpen(true);
  };

  // 모달 닫기 함수
  const handleCloseShippingModal = () => {
    setIsShippingModalOpen(false);
    setEditingAddressId(null); // 편집 ID 초기화
  };

  // 주소 삭제 함수
  const handleDeleteAddress = (id) => {
    deleteAddress.mutate(id, {
      onSuccess: () => {
        showNotification("배송지가 삭제되었습니다.");
      },
    });
  };

  // 주소 추가/수정 함수
  const handleAddOrUpdateAddress = (addressData) => {
    // 수정 모드에서 기존 ID 유지
    const addressWithId = editingAddressId
      ? { ...addressData, id: editingAddressId }
      : addressData;

    addOrUpdateAddress.mutate(addressWithId, {
      onSuccess: () => {
        showNotification(
          editingAddressId
            ? "배송지가 수정되었습니다."
            : "새 배송지가 추가되었습니다."
        );
        handleCloseShippingModal();
      },
    });
  };

  // 현재 편집 중인 주소 찾기
  const getEditingAddress = () => {
    if (!editingAddressId) return null;
    return addresses.find((addr) => addr.id === editingAddressId) || null;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <Container>
        <PageTitle>User Address</PageTitle>

        <AddressHeader>
          <TabButton onClick={handleOpenShippingModal}>배송지 등록</TabButton>
        </AddressHeader>

        <AddressList>
          {isLoading ? (
            <NoAddressText>로딩 중...</NoAddressText>
          ) : addresses.length > 0 ? (
            addresses.map((address) => (
              <AddressItem key={address.id}>
                <AddressInfo>
                  <AddressName>
                    <Recipient>
                      {address.title
                        ? `${address.title} - ${address.recipient}`
                        : address.recipient}
                    </Recipient>
                    {address.isDefault && (
                      <DefaultBadgeContainer>
                        <DefaultBadge>기본 배송지</DefaultBadge>
                      </DefaultBadgeContainer>
                    )}
                  </AddressName>
                  <AddressText>{address.address}</AddressText>
                  <AddressText>{address.detailAddress}</AddressText>
                  <ZipCode>{address.zipCode}</ZipCode>
                  <Phone>{address.phone}</Phone>
                </AddressInfo>
                <ActionButtons>
                  <ActionButton onClick={() => handleEditAddress(address.id)}>
                    수정
                  </ActionButton>
                  <ActionButton onClick={() => handleDeleteAddress(address.id)}>
                    삭제
                  </ActionButton>
                </ActionButtons>
              </AddressItem>
            ))
          ) : (
            <NoAddressText>입력된 주소가 없습니다.</NoAddressText>
          )}
        </AddressList>

        {/* 배송지 등록/수정 모달 컴포넌트 */}
        <ShippingAddress
          isOpen={isShippingModalOpen}
          onClose={handleCloseShippingModal}
          onAddAddress={handleAddOrUpdateAddress}
          editAddress={getEditingAddress()} // 편집할 주소 정보 전달
          isEditMode={!!editingAddressId} // 편집 모드 여부 전달
        />

        {/* 알림 메시지 */}
        <Notification
          visible={notification.visible}
          success={notification.success}
        >
          {notification.message}
        </Notification>
      </Container>
    </QueryClientProvider>
  );
};

export default UserAddress;
