import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// 로컬 스토리지에서 주소 가져오기
const getAddressesFromStorage = () => {
  const savedAddresses = localStorage.getItem("shippingAddresses");
  return savedAddresses
    ? JSON.parse(savedAddresses)
    : [
        {
          id: "1",
          recipient: "000 님",
          phone: "01012345678",
          zipCode: "14285",
          address: "경기도 00시 00로 157-358번지 (00동, 000아파트)",
          detailAddress: "000아파트 000호",
          isDefault: true,
          title: "집",
        },
        {
          id: "2",
          recipient: "000 님",
          phone: "01012345678",
          zipCode: "14285",
          address: "서울특별시 00구 00로 157-358번지 (00동, 000아파트)",
          detailAddress: "000아파트 000호",
          isDefault: false,
          title: "회사",
        },
      ];
};

// 로컬 스토리지에 주소 저장하기
const saveAddressesToStorage = (addresses) => {
  localStorage.setItem("shippingAddresses", JSON.stringify(addresses));
  return addresses;
};

export const useAddresses = () => {
  const queryClient = useQueryClient();

  // 주소 목록 가져오기
  const {
    data: addresses = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["shippingAddresses"],
    queryFn: getAddressesFromStorage,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
    gcTime: 1000 * 60 * 30, // 30분 동안 캐시 보관
  });

  // 주소 추가/수정하기
  const addOrUpdateAddress = useMutation({
    mutationFn: (newAddressData) => {
      const currentAddresses = getAddressesFromStorage();
      let updatedAddresses = [...currentAddresses];

      // 기본 배송지로 설정된 경우 다른 주소의 기본 배송지 상태 해제
      if (newAddressData.isDefault) {
        updatedAddresses = updatedAddresses.map((addr) => ({
          ...addr,
          isDefault: false,
        }));
      }

      // 수정 모드인 경우
      if (newAddressData.id) {
        updatedAddresses = updatedAddresses.map((addr) =>
          addr.id === newAddressData.id ? newAddressData : addr
        );
      } else {
        // 추가 모드인 경우
        const newAddressObj = {
          ...newAddressData,
          id: Date.now().toString(), // 고유 ID 생성
        };
        updatedAddresses.push(newAddressObj);
      }

      return saveAddressesToStorage(updatedAddresses);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shippingAddresses"] });
    },
  });

  // 주소 삭제하기
  const deleteAddress = useMutation({
    mutationFn: (addressId) => {
      const currentAddresses = getAddressesFromStorage();
      let updatedAddresses = currentAddresses.filter(
        (address) => address.id !== addressId
      );

      // 삭제된 주소가 기본 배송지였고, 다른 주소가 있는 경우 첫 번째 주소를 기본 배송지로 설정
      if (
        currentAddresses.find((addr) => addr.id === addressId)?.isDefault &&
        updatedAddresses.length > 0
      ) {
        updatedAddresses[0].isDefault = true;
      }

      return saveAddressesToStorage(updatedAddresses);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shippingAddresses"] });
    },
  });

  // 기본 배송지 찾기
  const getDefaultAddress = () => {
    return addresses.find((address) => address.isDefault) || null;
  };

  return {
    addresses,
    isLoading,
    isError,
    addOrUpdateAddress,
    deleteAddress,
    getDefaultAddress,
  };
};
