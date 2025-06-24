import { useState, useEffect, createContext, useContext } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import useAuthStore from "../components/shorts/stores/authStore"; // Zustand 스토어 추가

// 인증 컨텍스트 생성
const AuthContext = createContext(null);

// AuthProvider 컴포넌트
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authChangeEvent, setAuthChangeEvent] = useState(null);

  // Zustand 스토어 액션들 가져오기
  const {
    setUser,
    setUserProfile,
    clearUser,
    setLoading: setZustandLoading,
  } = useAuthStore();

  // 인증 상태 변화 감지
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setZustandLoading(true); // Zustand 로딩 시작

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

      if (user) {
        // 로그인된 경우: Zustand에 사용자 정보 저장
        const userInfo = {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
        };

        setUser(userInfo);

        // Firebase에서 사용자 프로필 정보 가져오기
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            const userProfile = userDoc.data();
            setUserProfile(userProfile);
          }
        } catch (error) {
          console.error("사용자 프로필 로드 실패:", error);
        }
      } else {
        // 로그아웃된 경우: Zustand 초기화
        clearUser();
      }

      setCurrentUser(user);
      setLoading(false);
      setZustandLoading(false); // Zustand 로딩 완료
    });

    return unsubscribe;
  }, [currentUser, setUser, setUserProfile, clearUser, setZustandLoading]);

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
