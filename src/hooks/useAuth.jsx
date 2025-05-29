import { useState, useEffect, createContext, useContext } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

// 인증 컨텍스트 생성
const AuthContext = createContext(null);

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChangeEvent, setAuthChangeEvent] = useState(null);

  // 인증 상태 변화 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // 로그인 상태가 변경되었을 때 이벤트 발생
      if (
        (currentUser === null && user !== null) ||
        (currentUser !== null && user === null)
      ) {
        // 로그인/로그아웃 이벤트 발생
        const event = new CustomEvent("auth-state-changed", {
          detail: {
            isLoggedIn: !!user,
            userId: user ? user.uid : null,
          },
        });
        window.dispatchEvent(event);
        setAuthChangeEvent(event);
      }

      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser]);

  // 단순히 현재 인증 상태 확인만을 위한 간단한 AuthContext
  const value = {
    currentUser,
    loading,
    isAuthenticated: !!currentUser,
    authChangeEvent,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 사용자 정의 훅
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth는 AuthProvider 내부에서만 사용할 수 있습니다");
  }
  return context;
};

export default useAuth;
