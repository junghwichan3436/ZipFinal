import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import MypageSidebar from "../../../components/mypage/MypageSidebar";

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  /* padding: 0 3%; */
  min-height: calc(100vh - 200px);
  /* overflow-x: hidden; */
  width: 100%;
`;

const PageContent = styled.div`
  display: flex;
  gap: 40px;
  padding-bottom: 60px;
  /* align-items: flex-start; */
`;

// 메인 컨텐츠 영역
const MainContent = styled.div`
  flex: 1;
  padding-top: 40px;
`;

const Mypage = () => {
  return (
    <Container>
      <PageContent>
        <MypageSidebar />
        <MainContent>
          <Outlet />
        </MainContent>
      </PageContent>
    </Container>
  );
};

export default Mypage;
