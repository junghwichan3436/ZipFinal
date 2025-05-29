// src/hooks/useOrderStatus.js
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ORDER_HISTORY_KEY, PENDING_ORDERS_KEY } from "../constants/queryKeys";
import { getOrderHistory, getPendingOrders } from "../utils/orderUtils";

export const useOrderStatus = () => {
  const queryClient = useQueryClient();

  // 실제 주문 내역 데이터 조회
  const { data: orderHistory = [] } = useQuery({
    queryKey: [ORDER_HISTORY_KEY],
    queryFn: getOrderHistory,
    initialData: [],
  });

  // 장바구니 기반 입금대기 주문 데이터 조회
  const { data: pendingOrders = [] } = useQuery({
    queryKey: [PENDING_ORDERS_KEY],
    queryFn: getPendingOrders,
    initialData: [],
  });

  // 주문 상태별 카운트 계산
  const orderStatusCounts = {
    waitingForPayment: pendingOrders.length, // 입금대기
    preparingShipment: orderHistory.filter(
      (order) => order.status === "배송준비중"
    ).length,
    inTransit: orderHistory.filter((order) => order.status === "배송중").length,
    delivered: orderHistory.filter((order) => order.status === "배송완료")
      .length,
  };

  // 주문상태 변경 감지 이벤트 핸들러 설정
  const refreshOrderStatus = () => {
    queryClient.invalidateQueries([ORDER_HISTORY_KEY]);
    queryClient.invalidateQueries([PENDING_ORDERS_KEY]);
  };

  return {
    orderStatusCounts,
    refreshOrderStatus,
  };
};
