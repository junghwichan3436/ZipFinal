import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ORDER_HISTORY_KEY, PENDING_ORDERS_KEY } from "../constants/queryKeys";
import {
  getOrderHistory,
  saveOrderHistory,
  generateOrderId,
  getPendingOrders,
  savePendingOrders,
  scheduleOrderStatusUpdate,
} from "../utils/orderUtils";

export const useOrderHistory = () => {
  const queryClient = useQueryClient();

  // 주문 내역 가져오기
  const { data: orderHistory = [] } = useQuery({
    queryKey: [ORDER_HISTORY_KEY],
    queryFn: getOrderHistory,
    initialData: [],
  });

  // 새 주문 추가하기 (결제 완료 시)
  const addOrderMutation = useMutation({
    mutationFn: (orderData) => {
      console.log("addOrderMutation - orderData:", orderData);

      const currentHistory = getOrderHistory();
      console.log("addOrderMutation - currentHistory:", currentHistory);

      // 새 주문 생성
      const newOrder = {
        id: generateOrderId(),
        date: new Date().toISOString(),
        items: orderData.orderItems,
        paymentInfo: orderData.paymentInfo,
        status: "배송준비중", // 결제 완료 시 "배송준비중" 상태로 설정
      };

      console.log("addOrderMutation - newOrder:", newOrder);

      // 주문 내역 업데이트 (맨 앞에 추가)
      const updatedHistory = [newOrder, ...currentHistory];
      saveOrderHistory(updatedHistory);

      console.log("addOrderMutation - updatedHistory:", updatedHistory);

      // 입금대기 상태의 주문 제거 (결제 완료되었으므로)
      const pendingOrders = getPendingOrders();
      // 결제된 아이템 ID 목록
      const paidItemIds = orderData.orderItems.orderItems.map(
        (item) => item.id
      );
      // 결제되지 않은 입금대기 주문만 남김
      const remainingPendingOrders = pendingOrders.filter(
        (order) =>
          !order.items.orderItems.some((item) => paidItemIds.includes(item.id))
      );
      savePendingOrders(remainingPendingOrders);

      // 5분 후 자동으로 "배송중" 상태로 변경
      scheduleOrderStatusUpdate(newOrder.id, "배송중", 10/60);

      return newOrder;
    },
    onSuccess: (data) => {
      console.log("주문 성공적으로 추가됨:", data);
      // 주문 내역 쿼리 무효화하여 새로고침
      queryClient.invalidateQueries([ORDER_HISTORY_KEY]);
      // 입금대기 주문 쿼리 무효화
      queryClient.invalidateQueries([PENDING_ORDERS_KEY]);
    },
    onError: (error) => {
      console.error("주문 추가 실패:", error);
    },
  });

  // 주문 상태 업데이트
  const updateOrderStatusMutation = useMutation({
    mutationFn: ({ orderId, newStatus }) => {
      const currentHistory = getOrderHistory();
      const updatedHistory = currentHistory.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      );
      saveOrderHistory(updatedHistory);
      return updatedHistory;
    },
    onSuccess: () => {
      // 주문 내역 쿼리 무효화하여 새로고침
      queryClient.invalidateQueries([ORDER_HISTORY_KEY]);
    },
  });

  // 주문 제거 기능 추가
  const removeOrderMutation = useMutation({
    mutationFn: (orderId) => {
      const currentHistory = getOrderHistory();
      const updatedHistory = currentHistory.filter(
        (order) => order.id !== orderId
      );
      saveOrderHistory(updatedHistory);
      return updatedHistory;
    },
    onSuccess: () => {
      // 주문 내역 쿼리 무효화하여 새로고침
      queryClient.invalidateQueries([ORDER_HISTORY_KEY]);
    },
  });

  return {
    orderHistory,
    addOrder: addOrderMutation.mutate,
    updateOrderStatus: updateOrderStatusMutation.mutate,
    removeOrder: removeOrderMutation.mutate, // 주문 제거 함수 추가
  };
};
