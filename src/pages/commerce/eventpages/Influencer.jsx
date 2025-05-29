import React from "react";
import ScrollButton from "../../../components/event/ScrollButton";
import styled from "styled-components";
import InfluencerBanner from "../../../components/event/InfluencerBanner";
import isabe01 from "../../../imgs/event/isabe01.jpg";
import isabe02 from "../../../imgs/event/isabe02.jpg";
import isabe03 from "../../../imgs/event/isabe03.jpg";
import isabe04 from "../../../imgs/event/isabe04.jpg";
import jungwon01 from "../../../imgs/event/jungwon01.jpg";
import jungwon02 from "../../../imgs/event/jungwon02.jpg";
import jungwon03 from "../../../imgs/event/jungwon03.jpg";
import leoj01 from "../../../imgs/event/leoj01.jpg";
import leoj02 from "../../../imgs/event/leoj02.jpg";
import leoj03 from "../../../imgs/event/leoj03.jpeg";
import leoj04 from "../../../imgs/event/leoj04.webp";
import isabeprofile from "../../../imgs/event/isabeprofile.jpg";
import jungwonprofile from "../../../imgs/event/jungwonprofile.webp";
import leojprofile from "../../../imgs/event/leojprofile.webp";
import blurimg from "../../../imgs/event/blurimage.png";
import blurimg02 from "../../../imgs/event/blurimage02.png";
import { useNavigate } from "react-router-dom";

const PageWrapper = styled.div`
  width: 100%;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BlurBackground = styled.div`
  width: 100%;
  background-image: url(${(props) => props.bgImage});
  background-size: cover;
  background-position: center;
  position: relative;
  padding: 80px 0;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(15px);
    z-index: 0;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  max-width: 1450px;
  background-color: var(--light-color);
  border-radius: 20px;
  display: flex;
  overflow: hidden;
  margin: 0 auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  position: relative;
  z-index: 1;
`;

const LeftContent = styled.div`
  width: 50%;
  padding: 70px 60px;
  display: flex;
  flex-direction: column;
`;

const RightContent = styled.div`
  width: 60%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Header = styled.div`
  margin-bottom: 30px;
`;

const SmallTitle = styled.div`
  font-size: 1.4rem;
  color: #888;
  margin-bottom: 15px;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-weight: bold;
  color: var(--dark-color);
  margin-top: 10px;
`;

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const ProductItem = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
`;

const ProductImage = styled.div`
  width: 100px;
  height: 100px;
  margin-right: 20px;
  background-color: #f9f9f9;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  &:hover {
    scale: 1.1;
  }
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.div`
  font-size: 1.4rem;
  color: #333;
  margin-bottom: 10px;
  cursor: pointer;
`;

const ProductPrice = styled.div`
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 1rem;
  cursor: pointer;
`;

const DetailButton = styled.a`
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    border-bottom: 1px solid var(--dark-color);
  }
`;
const Youtubesection = styled.div`
  width: 100%;
  height: 75%;
`;

const ProfileSection = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: var(--light-color);
  padding: 20px;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  z-index: 100;
`;
const ProfileDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProfilePicture = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProfileName = styled.div`
  font-size: 2.5rem;
  font-weight: bold;
  margin-right: 10px;
  cursor: pointer;
`;

const ProfileSocial = styled.div`
  font-size: 1.5rem;
  color: var(--border-color);
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }

  svg {
    margin-right: 5px;
  }
`;

const ProfileDescription = styled.div`
  font-size: 1.4rem;
  line-height: 1.6;
  color: var(--subTitle);

  a {
    color: var(--event-color);
    &:hover {
      border-bottom: 1px solid var(--event-color);
    }
  }
`;

const CampaignTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Footer = styled.div`
  width: 100%;
  background-color: var(--dark-color);
  color: var(--light-color);
  text-align: center;
  padding: 40px 0;

  h3 {
    font-size: 1.8rem;
    font-weight: normal;
    margin-bottom: 20px;
    line-height: 1.5;
  }

  button {
    background-color: var(--border-color);
    color: var(--light-color);
    padding: 8px 20px;
    cursor: pointer;
    border-radius: 50px;
    font-size: 1.5rem;

    &:hover {
      color: var(--dark-color);
    }
  }
`;

const Influencer = () => {
  const navigate = useNavigate();

  const InfluencerClick = () => {
    navigate("/mypage");
  };
  const YouTubeEmbed = ({ videoId }) => (
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );

  const onClick = () => {
    window.location.href =
      "https://twoslashfour.com/product/%EC%83%A4%EC%9D%B4%EB%8B%9D-%EB%B8%8C%EB%A1%9C%EC%9A%B0-%EC%BB%AC%EB%9F%AC-%EC%B9%B4%EB%9D%BC3-colors/72/?srsltid=AfmBOoqc0VshEui1wg7zGiRI3dvdRCtiVvztCxDA_GMxkkbW43gIKGLT";
  };
  const onClick1 = () => {
    window.location.href =
      "https://twoslashfour.com/product/detail.html?product_no=73&cate_no=1&display_group=6";
  };
  const onClick2 = () => {
    window.location.href =
      "https://twoslashfour.com/product/%EC%9D%B4%EB%A0%88%EC%9D%B4%EC%A7%95-%ED%8E%98%EC%9D%B4%EC%8A%A4-%ED%81%90%EB%B8%8C/53/?srsltid=AfmBOooC3z66YDgCQQm1q7szVqMrSga8UrP4pya5In28cP1-auIDkiDh";
  };
  const onClick3 = () => {
    window.location.href =
      "https://twoslashfour.com/product/detail.html?product_no=46&cate_no=71&display_group=1";
  };
  const onClick4 = () => {
    window.location.href =
      "https://doingwhat.co.kr/product/%EB%91%90%EC%9E%89%EC%99%93-%EC%8A%A4%ED%82%A8%ED%86%A4-%ED%95%84%ED%84%B0-%EB%A1%9C%EC%85%98-spf-30-pa/23/";
  };
  const onClick5 = () => {
    window.location.href =
      "https://doingwhat.co.kr/product/%EB%91%90%EC%9E%89%EC%99%93-%EB%B3%BC%EB%A5%A8-%EC%8A%A4%ED%83%80%EC%9D%BC%EB%A7%81-%EC%97%90%EC%84%BC%EC%8A%A4/22/";
  };
  const onClick6 = () => {
    window.location.href =
      "https://doingwhat.co.kr/product/%EB%91%90%EC%9E%89%EC%99%93-%EB%82%B4%EC%B6%94%EB%9F%B4-%EC%98%A4%EC%9D%BC-%EC%BB%A8%ED%8A%B8%EB%A1%A4-%ED%8E%98%EC%9D%B4%ED%8D%BC/25/category/43/display/1/";
  };
  const onClick7 = () => {
    window.location.href = "https://www.kurly.com/goods/1000205965";
  };
  const onClick8 = () => {
    window.location.href =
      "https://www.oliveyoung.co.kr/store/goods/getGoodsDetail.do?goodsNo=A000000164840";
  };
  const onClick9 = () => {
    window.location.href =
      "https://dalba.co.kr/goods/goods_view.php?goodsNo=1000000100";
  };
  const onClick10 = () => {
    window.location.href =
      "https://www.amoremall.com/kr/ko/product/detail?onlineProdSn=55930&srsltid=AfmBOopp_fi0j445EDg21BL8Ppwziel_ryL8mI3cfKd7tkgNjK6pR1di&onlineProdCode=110090000121";
  };
  const productImages = [
    isabe01,
    isabe02,
    isabe03,
    isabe04,
    jungwon01,
    jungwon02,
    jungwon03,
    leoj01,
    leoj02,
    leoj03,
    leoj04,
  ];

  const profileImage = [isabeprofile, jungwonprofile, leojprofile];

  const bgImage1 = blurimg;
  const bgImage2 = blurimg02;
  const bgImage3 = blurimg;

  return (
    <PageWrapper>
      <InfluencerBanner />
      <ScrollButton />
      <BlurBackground bgImage={bgImage1}>
        <CardContainer>
          <LeftContent>
            <Header>
              <SmallTitle>Top Influencer Picks</SmallTitle>
              <Title>이사배 PICK</Title>
            </Header>
            <ProductList>
              <ProductItem>
                <ProductImage onClick={onClick}>
                  <img src={productImages[0]} alt="Lipstick Set" />
                </ProductImage>
                <ProductInfo>
                  <ProductName onClick={onClick}>
                    샤이닝 브로우 컬러 카라(3 Colors)
                  </ProductName>
                  <ProductPrice onClick={onClick}>KRW 15,300</ProductPrice>
                  <DetailButton onClick={onClick}>자세히</DetailButton>
                </ProductInfo>
              </ProductItem>
              <ProductItem>
                <ProductImage onClick={onClick1}>
                  <img src={productImages[1]} alt="Eyeshadow Palette" />
                </ProductImage>
                <ProductInfo>
                  <ProductName onClick={onClick1}>
                    페이드 브로우 파우더 듀오 (3 Colors)
                  </ProductName>
                  <ProductPrice onClick={onClick1}>KRW 18,000</ProductPrice>
                  <DetailButton onClick={onClick1}>자세히</DetailButton>
                </ProductInfo>
              </ProductItem>
              <ProductItem>
                <ProductImage onClick={onClick2}>
                  <img src={productImages[2]} alt="Face Mist" />
                </ProductImage>
                <ProductInfo>
                  <ProductName onClick={onClick2}>
                    이레이징 페이스 큐브
                  </ProductName>
                  <ProductPrice onClick={onClick2}>KRW 26,600</ProductPrice>
                  <DetailButton onClick={onClick2}>자세히</DetailButton>
                </ProductInfo>
              </ProductItem>
              <ProductItem>
                <ProductImage onClick={onClick3}>
                  <img src={productImages[3]} alt="Eyeshadow Palette 2" />
                </ProductImage>
                <ProductInfo>
                  <ProductName onClick={onClick3}>
                    올오버 페이스 브러쉬{" "}
                  </ProductName>
                  <ProductPrice onClick={onClick3}>KRW 18,000</ProductPrice>
                  <DetailButton onClick={onClick3}>자세히</DetailButton>
                </ProductInfo>
              </ProductItem>
            </ProductList>
          </LeftContent>
          <RightContent>
            <Youtubesection>
              <YouTubeEmbed videoId="o9NZ9x2Oxdk" />
            </Youtubesection>
            <ProfileSection>
              <ProfileHeader>
                <ProfilePicture>
                  <a href="http://instagram.com/risabae_art/" target="_blank">
                    <img src={profileImage[0]} alt="lisabe Profile" />
                  </a>
                </ProfilePicture>
                <ProfileDetail>
                  <ProfileName>
                    <a href="http://instagram.com/risabae_art/" target="_blank">
                      RISABAE
                    </a>
                  </ProfileName>
                  <ProfileSocial>
                    <a href="http://instagram.com/risabae_art/" target="_blank">
                      {" "}
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                        alt="Instagram"
                        style={{
                          width: "10px",
                          height: "10px",
                          marginRight: "4px",
                        }}
                      />
                      instagram.com/Risabae_art
                    </a>
                  </ProfileSocial>
                </ProfileDetail>
              </ProfileHeader>
              <CampaignTitle>FADE OUT, LOOK CLEAR</CampaignTitle>
              <ProfileDescription>
                눈썹 컬러 힘을 빼고 밝힐수록, 더 선명해지는 브로우 메이크업 룩을
                완성해보세요! 눈썹 톤을 자연스럽게 잡아주는
                <a href="https://twoslashfour.com/product/detail.html?product_no=73&cate_no=1&display_group=6">
                  #페이드브로우파우더듀오
                </a>{" "}
                와 은은한 반짝임의 블론드 펄이 믹스된{" "}
                <a href="https://twoslashfour.com/product/%EC%83%A4%EC%9D%B4%EB%8B%9D-%EB%B8%8C%EB%A1%9C%EC%9A%B0-%EC%BB%AC%EB%9F%AC-%EC%B9%B4%EB%9D%BC3-colors/72/?srsltid=AfmBOoqc0VshEui1wg7zGiRI3dvdRCtiVvztCxDA_GMxkkbW43gIKGLT">
                  #샤이닝브로우컬러카라{" "}
                </a>
                로 어둡고 진한 눈썹을 한번의 터치로 자연스럽게 밝혀보세요!
              </ProfileDescription>
            </ProfileSection>
          </RightContent>
        </CardContainer>
      </BlurBackground>
      <BlurBackground bgImage={bgImage2}>
        <CardContainer>
          <RightContent>
            <YouTubeEmbed videoId="nJzpph-wzGA" />
          </RightContent>
          <LeftContent>
            <Header>
              <SmallTitle>Top Influencer Picks</SmallTitle>
              <Title>관리는 하고 살자 PICK</Title>
            </Header>
            <ProductList>
              <ProductItem>
                <ProductImage onClick={onClick4}>
                  <img src={productImages[4]} alt="Lipstick Set" />
                </ProductImage>
                <ProductInfo>
                  <ProductName onClick={onClick4}>
                    두잉왓 스킨톤 필터 로션[SPF 30 PA++]
                  </ProductName>
                  <ProductPrice onClick={onClick4}>KRW 26,900</ProductPrice>
                  <DetailButton onClick={onClick4}>자세히</DetailButton>
                </ProductInfo>
              </ProductItem>
              <ProductItem>
                <ProductImage onClick={onClick5}>
                  <img src={productImages[5]} alt="Eyeshadow Palette" />
                </ProductImage>
                <ProductInfo>
                  <ProductName onClick={onClick5}>
                    두잉왓 볼륨 스타일링 에센스
                  </ProductName>
                  <ProductPrice onClick={onClick5}>KRW 12,900</ProductPrice>
                  <DetailButton onClick={onClick5}>자세히</DetailButton>
                </ProductInfo>
              </ProductItem>
              <ProductItem>
                <ProductImage onClick={onClick6}>
                  <img src={productImages[6]} alt="Face Mist" />
                </ProductImage>
                <ProductInfo>
                  <ProductName onClick={onClick6}>
                    두잉왓 내추럴 오일 컨트롤 페이퍼
                  </ProductName>
                  <ProductPrice onClick={onClick6}>KRW 3,900</ProductPrice>
                  <DetailButton onClick={onClick6}>자세히</DetailButton>
                </ProductInfo>
              </ProductItem>
            </ProductList>
            <ProfileHeader style={{ marginTop: "20px" }}>
              <ProfilePicture>
                <a
                  href="https://www.instagram.com/jung__won.k/"
                  target="/blank"
                >
                  <img src={profileImage[1]} alt="jungwon Profile" />
                </a>
              </ProfilePicture>
              <ProfileDetail>
                <ProfileName>
                  <a
                    href="https://www.instagram.com/jung__won.k/"
                    target="/blank"
                  >
                    관리는 하고 살자
                  </a>
                </ProfileName>
                <ProfileSocial>
                  <a
                    href="https://www.instagram.com/jung__won.k/"
                    target="/blank"
                  >
                    <a href="http://instagram.com/risabae_art/" target="_blank">
                      {" "}
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                        alt="Instagram"
                        style={{
                          width: "10px",
                          height: "10px",
                          marginRight: "4px",
                        }}
                      />
                      instagram.com/jung__won.k
                    </a>
                  </a>
                </ProfileSocial>
              </ProfileDetail>
            </ProfileHeader>
            <CampaignTitle>FADE OUT, LOOK CLEAR</CampaignTitle>
            <ProfileDescription>
              원래 내 피부인 것처럼 자연스럽게! <br />
              꾸민듯 안꾸민듯 아무도 모르게 , 두잉왓 스킨톤 필터 로션
            </ProfileDescription>
          </LeftContent>
        </CardContainer>
      </BlurBackground>
      <BlurBackground bgImage={bgImage3}>
        <CardContainer>
          <LeftContent>
            <Header>
              <SmallTitle>Top Influencer Picks</SmallTitle>
              <Title>레오제이 PICK</Title>
            </Header>
            <ProductList>
              <ProductItem>
                <ProductImage onClick={onClick7}>
                  <img src={productImages[7]} alt="Lipstick Set" />
                </ProductImage>
                <ProductInfo>
                  <ProductName onClick={onClick7}>
                    투쿨포스쿨 픽싱누드 쿠션
                  </ProductName>
                  <ProductPrice onClick={onClick7}>KRW 28,800</ProductPrice>
                  <DetailButton onClick={onClick7}>자세히</DetailButton>
                </ProductInfo>
              </ProductItem>
              <ProductItem>
                <ProductImage onClick={onClick8}>
                  <img src={productImages[8]} alt="Eyeshadow Palette" />
                </ProductImage>
                <ProductInfo>
                  <ProductName onClick={onClick8}>
                    필리밀리 아이브러시 프로컬렉션
                  </ProductName>
                  <ProductPrice onClick={onClick8}>KRW 22,800</ProductPrice>
                  <DetailButton onClick={onClick8}>자세히</DetailButton>
                </ProductInfo>
              </ProductItem>
              <ProductItem>
                <ProductImage onClick={onClick9}>
                  <img src={productImages[9]} alt="Face Mist" />
                </ProductImage>
                <ProductInfo>
                  <ProductName onClick={onClick9}>
                    화이트 트러플 더블 세럼 앤 크림
                  </ProductName>
                  <ProductPrice onClick={onClick9}>KRW 78,000</ProductPrice>
                  <DetailButton onClick={onClick9}>자세히</DetailButton>
                </ProductInfo>
              </ProductItem>
              <ProductItem>
                <ProductImage onClick={onClick10}>
                  <img src={productImages[10]} alt="Eyeshadow Palette 2" />
                </ProductImage>
                <ProductInfo>
                  <ProductName onClick={onClick10}>
                    페이드 브로우 파우더 듀오 (3 Colors)
                  </ProductName>
                  <ProductPrice onClick={onClick10}>KRW 20,000</ProductPrice>
                  <DetailButton onClick={onClick10}>자세히</DetailButton>
                </ProductInfo>
              </ProductItem>
            </ProductList>
          </LeftContent>
          <RightContent>
            <Youtubesection>
              <YouTubeEmbed videoId="cGBoGj7TJdc" />
            </Youtubesection>
            <ProfileSection>
              <ProfileHeader>
                <ProfilePicture>
                  <a
                    href="https://www.instagram.com/leojmakeup/?hl=ko"
                    target="/blank"
                  >
                    <img src={profileImage[2]} alt="leoj Profile" />
                  </a>
                </ProfilePicture>
                <ProfileDetail>
                  <ProfileName>
                    <a
                      href="https://www.instagram.com/leojmakeup/?hl=ko"
                      target="/blank"
                    >
                      LeoJ Makeup
                    </a>
                  </ProfileName>
                  <ProfileSocial>
                    <a
                      href="https://www.instagram.com/leojmakeup/?hl=ko"
                      target="/blank"
                    >
                      <a
                        href="http://instagram.com/risabae_art/"
                        target="_blank"
                      >
                        {" "}
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                          alt="Instagram"
                          style={{
                            width: "10px",
                            height: "10px",
                            marginRight: "4px",
                          }}
                        />
                        instagram.com/leojmakeup
                      </a>
                    </a>
                  </ProfileSocial>
                </ProfileDetail>
              </ProfileHeader>
              <CampaignTitle>FADE OUT, LOOK CLEAR</CampaignTitle>
              <ProfileDescription>
                투쿨포스쿨 픽싱 누드핏 쿠션 “얇게, 하지만 완벽하게. 하루 종일
                무너짐 없이.” 메이크업 아티스트이자 뷰티 인플루언서 레오제이가
                직접 제작에 참여한 쿠션. 누구보다 피부 표현에 진심인 그가 선택한
                픽싱력, 밀착력, 커버력을 모두 갖춘 베이스의 완성.
              </ProfileDescription>
            </ProfileSection>
          </RightContent>
        </CardContainer>
      </BlurBackground>
      <Footer>
        <h3>
          이제 ZIP에서
          <br />
          당신도 인플루언서 상품을 판매해보세요
        </h3>
        <button onClick={InfluencerClick}>입점하러 가기</button>
      </Footer>
    </PageWrapper>
  );
};

export default Influencer;
