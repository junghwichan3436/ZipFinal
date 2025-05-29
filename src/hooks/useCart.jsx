// src/hooks/useCart.jsx
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { CART_ITEMS_KEY } from "../constants/queryKeys";
import { useAuth } from "./useAuth";

// 로컬 스토리지 헬퍼 함수들
const getCartFromStorage = () => {
  try {
    // 항상 동일한 키 사용
    const cart = localStorage.getItem(CART_ITEMS_KEY);
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error("Error getting cart from storage:", error);
    return [];
  }
};

const saveCartToStorage = (cart) => {
  try {
    // 항상 동일한 키 사용
    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to storage:", error);
  }
};

export const useCart = () => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();

  // 장바구니 데이터 조회
  const { data: cartItems = [] } = useQuery({
    queryKey: [CART_ITEMS_KEY],
    queryFn: () => getCartFromStorage(),
  });

  // 장바구니에 상품 추가 mutation
  const addToCart = useMutation({
    mutationFn: (newItem) => {
      // 현재 장바구니 가져오기
      const currentCart = getCartFromStorage();

      // 동일한 상품이 있는지 확인
      const existingItemIndex = currentCart.findIndex(
        (item) => item.id === newItem.id
      );

      // 장바구니 업데이트
      let updatedCart;
      if (existingItemIndex >= 0) {
        // 기존 상품이 있으면 수량 추가
        updatedCart = [...currentCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + newItem.quantity,
        };
      } else {
        // 새 상품 추가
        updatedCart = [...currentCart, newItem];
      }

      // 로컬 스토리지에 저장
      saveCartToStorage(updatedCart);
      return updatedCart;
    },
    onSuccess: (updatedCart) => {
      // 쿼리 캐시 업데이트
      queryClient.setQueryData([CART_ITEMS_KEY], updatedCart);
      // 장바구니 업데이트 이벤트 발생
      window.dispatchEvent(new CustomEvent("cart-updated"));
    },
  });

  // 장바구니 아이템 업데이트 mutation
  const updateCartItem = useMutation({
    mutationFn: ({ itemId, quantity, selected }) => {
      const currentCart = getCartFromStorage();
      const updatedCart = currentCart.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: quantity !== undefined ? quantity : item.quantity,
            selected: selected !== undefined ? selected : item.selected,
          };
        }
        return item;
      });

      saveCartToStorage(updatedCart);
      return updatedCart;
    },
    onSuccess: (updatedCart) => {
      queryClient.setQueryData([CART_ITEMS_KEY], updatedCart);
      window.dispatchEvent(new CustomEvent("cart-updated"));
    },
  });

  // 장바구니 아이템 제거 mutation
  const removeFromCart = useMutation({
    mutationFn: (itemId) => {
      const currentCart = getCartFromStorage();
      const updatedCart = currentCart.filter((item) => item.id !== itemId);

      saveCartToStorage(updatedCart);
      return updatedCart;
    },
    onSuccess: (updatedCart) => {
      queryClient.setQueryData([CART_ITEMS_KEY], updatedCart);
      window.dispatchEvent(new CustomEvent("cart-updated"));
    },
  });

  // 장바구니 비우기 mutation
  const clearCart = useMutation({
    mutationFn: () => {
      saveCartToStorage([]);
      return [];
    },
    onSuccess: (emptyCart) => {
      queryClient.setQueryData([CART_ITEMS_KEY], emptyCart);
      window.dispatchEvent(new CustomEvent("cart-updated"));
    },
  });

  // 장바구니 전체 아이템 선택/해제 mutation
  const selectAllItems = useMutation({
    mutationFn: (isSelected) => {
      const currentCart = getCartFromStorage();
      const updatedCart = currentCart.map((item) => ({
        ...item,
        selected: isSelected,
      }));

      saveCartToStorage(updatedCart);
      return updatedCart;
    },
    onSuccess: (updatedCart) => {
      queryClient.setQueryData([CART_ITEMS_KEY], updatedCart);
      window.dispatchEvent(new CustomEvent("cart-updated"));
    },
  });

  // 장바구니 아이템 개수 계산 함수
  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + (item.quantity || 1), 0);
  };

  // 선택된 아이템 계산 함수
  const getSelectedItems = () => {
    return cartItems.filter((item) => item.selected);
  };

  // 장바구니 총 금액 계산 함수
  const getTotalPrice = () => {
    return getSelectedItems().reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return {
    cartItems,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    selectAllItems,
    getCartItemCount,
    getSelectedItems,
    getTotalPrice,
    isLoggedIn: !!currentUser,
  };
};

export default useCart;
