// App.jsx 또는 Root.jsx 수정
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles.styles";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollToTop";
import Lenis from "@studio-freight/lenis";
import { scheduleOrderStatusUpdate } from "./utils/orderUtils";
import { useQueryClient } from "@tanstack/react-query";
import { CART_ITEMS_KEY } from "./constants/queryKeys";
import { useCart } from "./hooks/useCart";

const Root = () => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const { syncCart } = useCart();

  // 로그인/로그아웃 이벤트 핸들러 등록
  useEffect(() => {
    // 인증 상태 변경 시 장바구니 동기화
    const handleAuthStateChanged = (event) => {
      if (event.detail.isLoggedIn) {
        // 로그인 시 게스트 장바구니와 사용자 장바구니 동기화
        syncCart();
      } else {
        // 로그아웃 시 장바구니 캐시 초기화 (게스트 장바구니로 전환)
        queryClient.invalidateQueries([CART_ITEMS_KEY]);
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener("auth-state-changed", handleAuthStateChanged);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("auth-state-changed", handleAuthStateChanged);
    };
  }, [queryClient, syncCart]);

  // 경로 변경 감지 및 카트 데이터 새로고침
  useEffect(() => {
    // 로컬 스토리지에서 직접 카트 데이터 가져와 캐시 업데이트
    try {
      const cartData = localStorage.getItem(CART_ITEMS_KEY);
      if (cartData) {
        queryClient.setQueryData([CART_ITEMS_KEY], JSON.parse(cartData));
      }
    } catch (error) {
      console.error("경로 변경 시 카트 데이터 새로고침 실패:", error);
    }
  }, [location.pathname, queryClient]);

  useEffect(() => {
    // lenis 라이브러리
    const lenis = new Lenis();

    lenis.on("scroll", (e) => {});

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  // 주문 상태 타이머 복원 로직
  useEffect(() => {
    // 저장된 타이머 정보 가져오기
    const timers = JSON.parse(
      localStorage.getItem("orderStatusTimers") || "{}"
    );
    const now = new Date().getTime();

    // 각 타이머 검사 및 필요 시 재설정
    Object.entries(timers).forEach(([orderId, timerInfo]) => {
      const expiresAt = new Date(timerInfo.expiresAt).getTime();

      // 만료되지 않은 타이머만 재설정
      if (expiresAt > now) {
        // 남은 시간 계산 (밀리초 -> 분)
        const remainingMinutes = (expiresAt - now) / (60 * 1000);
        // 타이머 재설정
        scheduleOrderStatusUpdate(orderId, "배송중", remainingMinutes);
      }
    });
  }, []);

  return (
    <>
      <ScrollToTop />
      <GlobalStyles />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Root;
