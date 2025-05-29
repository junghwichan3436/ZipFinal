// src/utils/orderUtils.js
import { PENDING_ORDERS_KEY, ORDER_HISTORY_KEY } from "../constants/queryKeys";

// 유니크한 주문 ID 생성
export const generateOrderId = () => {
  return `order_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
};

// 주문 내역 로컬 스토리지 관리 함수
export const getOrderHistory = () => {
  try {
    const history = localStorage.getItem(ORDER_HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error("Error getting order history:", error);
    return [];
  }
};

export const saveOrderHistory = (history) => {
  try {
    localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error("Error saving order history:", error);
  }
};

// 입금대기 주문(장바구니 기반) 관리 함수
export const getPendingOrders = () => {
  try {
    const pendingOrders = localStorage.getItem(PENDING_ORDERS_KEY);
    return pendingOrders ? JSON.parse(pendingOrders) : [];
  } catch (error) {
    console.error("Error getting pending orders:", error);
    return [];
  }
};

export const savePendingOrders = (pendingOrders) => {
  try {
    localStorage.setItem(PENDING_ORDERS_KEY, JSON.stringify(pendingOrders));
  } catch (error) {
    console.error("Error saving pending orders:", error);
  }
};

// 장바구니 아이템에서 입금대기 주문 생성
export const createPendingOrderFromCart = (cartItem) => {
  return {
    id: generateOrderId(),
    date: new Date().toISOString(),
    items: {
      orderItems: [
        {
          id: cartItem.id,
          name: cartItem.name,
          brand: cartItem.brand,
          detail: cartItem.detail,
          price: cartItem.price,
          quantity: cartItem.quantity,
          image: cartItem.image,
        },
      ],
    },
    status: "입금대기",
    cartItemId: cartItem.id, // 장바구니 아이템과 연결
  };
};

// 주문 상태 자동 업데이트 타이머 설정
export const scheduleOrderStatusUpdate = (
  orderId,
  newStatus,
  delayInMinutes = 5
) => {
  const timeoutId = setTimeout(() => {
    const currentHistory = getOrderHistory();
    const updatedHistory = currentHistory.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    saveOrderHistory(updatedHistory);

    // 이벤트 발생 - UI 업데이트 트리거
    window.dispatchEvent(new CustomEvent("order-status-updated"));
  }, delayInMinutes * 60 * 1000);

  // 타이머 ID 저장 (필요시 취소하기 위해)
  const timers = JSON.parse(localStorage.getItem("orderStatusTimers") || "{}");
  timers[orderId] = {
    timeoutId: timeoutId.toString(),
    expiresAt: new Date(Date.now() + delayInMinutes * 60 * 1000).toISOString(),
  };
  localStorage.setItem("orderStatusTimers", JSON.stringify(timers));

  return timeoutId;
};
