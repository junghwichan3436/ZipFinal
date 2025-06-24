// stores/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const useAuthStore = create(
  persist(
    (set, get) => ({
      // 상태
      user: null,
      userProfile: null,
      isLoading: true,
      isAuthenticated: false,

      // Firebase 인증 상태 리스너 설정
      initializeAuth: () => {
        return onAuthStateChanged(auth, async (firebaseUser) => {
          set({ isLoading: true });

          if (firebaseUser) {
            try {
              // Firebase에서 사용자 프로필 정보 가져오기
              const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
              const userProfile = userDoc.exists() ? userDoc.data() : null;

              set({
                user: {
                  uid: firebaseUser.uid,
                  email: firebaseUser.email,
                  emailVerified: firebaseUser.emailVerified,
                },
                userProfile,
                isAuthenticated: true,
                isLoading: false,
              });
            } catch (error) {
              console.error("사용자 프로필 로드 실패:", error);
              set({
                user: {
                  uid: firebaseUser.uid,
                  email: firebaseUser.email,
                  emailVerified: firebaseUser.emailVerified,
                },
                userProfile: null,
                isAuthenticated: true,
                isLoading: false,
              });
            }
          } else {
            // 로그아웃 상태
            set({
              user: null,
              userProfile: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }
        });
      },

      // 사용자 정보 설정
      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      // 사용자 프로필 설정
      setUserProfile: (profile) => set({ userProfile: profile }),

      // 사용자 프로필 업데이트 (부분 업데이트)
      updateUserProfile: (updates) =>
        set((state) => ({
          userProfile: state.userProfile
            ? { ...state.userProfile, ...updates }
            : updates,
        })),

      // 선호 아티스트 업데이트
      updateFavoriteArtists: (favoriteArtists) =>
        set((state) => ({
          userProfile: state.userProfile
            ? { ...state.userProfile, favoriteArtists }
            : { favoriteArtists },
        })),

      // 로그아웃
      clearUser: () =>
        set({
          user: null,
          userProfile: null,
          isAuthenticated: false,
        }),

      // 로딩 상태 설정
      setLoading: (loading) => set({ isLoading: loading }),

      // 사용자 프로필 새로고침
      refreshUserProfile: async () => {
        const { user } = get();
        if (!user?.uid) return;

        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          if (userDoc.exists()) {
            set({ userProfile: userDoc.data() });
          }
        } catch (error) {
          console.error("프로필 새로고침 실패:", error);
        }
      },

      // 편의 getter 함수들
      getFavoriteArtists: () => {
        const { userProfile } = get();
        return userProfile?.favoriteArtists || [];
      },

      getUserName: () => {
        const { userProfile } = get();
        return userProfile?.name || userProfile?.username || "사용자";
      },
    }),
    {
      name: "auth-storage", // localStorage 키
      partialize: (state) => ({
        // 지속할 상태만 선택 (민감한 정보 제외)
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
