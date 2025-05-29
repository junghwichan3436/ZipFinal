import { useEffect } from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  padding: 20px 0;
  background: #fee500;
  color: var(--dark-color);
  border: none;
  font-family: "EHNormalTrial";
  cursor: pointer;
`;

const Kakao = () => {
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_K_JAVASCRIPT_KEY);
      console.log("Kakao SDK initialized");
    }

    // 새로고침 시 무조건 로그아웃
    window.Kakao.Auth.logout(() => {
      console.log("새로고침 시 자동 로그아웃 완료");
    });
  }, []);

  const handleKakaoLogin = () => {
    window.Kakao.Auth.login({
      scope: "profile_nickname",
      success: function (authObj) {
        console.log("카카오 로그인 성공", authObj);

        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function (res) {
            const nickname = res.kakao_account?.profile?.nickname;
            alert(`${nickname}님 반갑습니다!`);
          },
          fail: function (error) {
            console.error("사용자 정보 요청 실패", error);
          },
        });
      },
      fail: function (err) {
        console.error("카카오 로그인 실패", err);
      },
    });
  };

  return <Button onClick={handleKakaoLogin}>KAKAO LOGIN</Button>;
};

export default Kakao;
