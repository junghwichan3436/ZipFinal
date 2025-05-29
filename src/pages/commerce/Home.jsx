import React from "react";
/*--- 컴포넌트 ---*/
import MainBanner from "../../components/home/MainBanner";
import SlideBanner from "../../components/home/SlideBanner";
import BeautyPick from "../../components/home/BeautyPick";
import Category from "../../components/home/Category";
import StylePick from "../../components/home/StylePick";
import RollingBanner from "../../components/home/RollingBanner";
import RecentZip from "../../components/home/RecentZip";

const Home = () => {
  return (
    <>
      <MainBanner />
      <SlideBanner />
      <BeautyPick />
      <StylePick />
      <Category />
      <RollingBanner />
      <RecentZip />
    </>
  );
};

export default Home;
