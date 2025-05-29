import styled from "styled-components";
import React from "react";
import guccibelt from "../../imgs/event/guccibelt.webp";
import chapsticklib from "../../imgs/event/chapsticklib.avif";
import shaver from "../../imgs/event/shaver.jpg";
import lakalib from "../../imgs/event/lakalib.jpeg";
import burberrywallet from "../../imgs/event/burberrywallet.webp";
import tamburinsperfume from "../../imgs/event/tamburinsperfume.jpg";
import pradabag from "../../imgs/event/pradabag.avif";
import salvatoreferragamo from "../../imgs/event/salvatoreferragamo.png";
import solgavitamin from "../../imgs/event/solgavitamin.png";
import { useNavigate } from "react-router-dom";

const TattooContents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 64px;
  padding: 200px 210px;

  @media screen and (max-width: 1500px) {
    padding: 200px 100px;
  }
  @media screen and (max-width: 1024px) {
    padding: 200px 50px;
  }

  @media screen and (max-width: 767px) {
    padding: 150px 30px;
    gap: 48px;
  }

  @media screen and (max-width: 402px) {
    padding: 100px 20px;
    gap: 32px;
  }
`;

const TattooTittle = styled.div`
  width: 100%;
  height: 42px;
  font-size: 5rem;

  @media screen and (max-width: 1024px) {
    font-size: 4rem;
  }

  @media screen and (max-width: 767px) {
    font-size: 3rem;
  }

  @media screen and (max-width: 402px) {
    font-size: 2.4rem;
  }
`;

const VideoTop = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 20px 20px 0 0;
  background: var(--event-color);
  gap: 10px;

  @media screen and (max-width: 1024px) {
    height: 35px;
  }

  @media screen and (max-width: 767px) {
    height: 30px;
  }

  @media screen and (max-width: 402px) {
    height: 26px;
  }
`;

const VideosContents = styled.div`
  width: 100%;
  height: 840px;
  display: flex;
  align-items: center;
  border-radius: 0 0 20px 20px;
  border: 1px solid var(--border-color);
  margin-bottom: 60px;

  @media screen and (max-width: 1024px) {
    flex-direction: column;
    height: auto;
  }

  @media screen and (max-width: 767px) {
    margin-bottom: 40px;
  }

  @media screen and (max-width: 402px) {
    margin-bottom: 30px;
  }
`;

const VideoContent = styled.div`
  width: 36%;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 0 0 0 20px;
  cursor: pointer;
  background: var(--border-color);
  

  video {
    transition: all 1s;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0 0 0 20px;

    @media screen and (max-width: 1024px) {
      height: 440px;
      border-radius: 20px 20px 0 0;
    }

    @media screen and (max-width: 767px) {
      height: 300px;
    }

    @media screen and (max-width: 402px) {
      height: 240px;
    }
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
    height: 500px;
  }
  @media screen and (max-width: 402px) {
    width: 100%;
    height: 300px;
  }
`;

const CommerceContent = styled.div`
  position: relative;
  width: 64%;

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const InfluencerName = styled.div`
  font-size: 6rem;
  font-weight: bold;
  margin-bottom: 40px;

  @media screen and (max-width: 1024px) {
    font-size: 4rem;
    margin-bottom: 30px;
  }

  @media screen and (max-width: 767px) {
    font-size: 3rem;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 402px) {
    font-size: 2.4rem;
    margin-bottom: 15px;
  }
`;

const QuoteSection = styled.div`
  font-size: 3rem;
  font-weight: 500;
  margin-bottom: 90px;

  @media screen and (max-width: 1024px) {
    font-size: 2rem;
    margin-bottom: 40px;
  }

  @media screen and (max-width: 767px) {
    font-size: 1.8rem;
    margin-bottom: 30px;
  }

  @media screen and (max-width: 402px) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
`;

const Bundles = styled.div`
  display: flex;
  gap: 30px;

  @media screen and (max-width: 1024px) {
    gap: 20px;
  }

  @media screen and (max-width: 767px) {
    gap: 24px;
  }
`;

const Picture = styled.div`
    width: 250px;
    height: 250px;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  overflow: hidden;
  display: inline-block;
  object-fit: cover;


  img {
    width:100%;
    object-fit: cover; 
    display: inline-block;
  }
  @media screen and (max-width: 1800px) {
    width: 200px;
  }

  @media screen and (max-width: 1560px) {
    width: 180px;
    height: 180px;
  } 
  @media screen and (max-width: 1250px) {
    width: 160px;
    height: 160px;
  } 
  @media screen and (max-width: 1150px) {
    width: 130px;
    height: 130px;
  } 

  @media screen and (max-width: 1025px) {
    width: 100%;
    height: 250px;
  } 

  @media screen and (max-width: 970px) {
    width: 200px;
    height: 200px;
  }

  @media screen and (max-width: 810px) {
    width: 150px;
    height: 150px;
  }

  @media screen and (max-width: 640px) {
    width: 120px;
    height: 120px;
  } 
  @media screen and (max-width: 550px) {
    width: 80px;
    height: 80px;
  } 
`;

const Pick = styled.div`
  font-size: 1.6rem;
  color: var(--border-color);
  cursor: pointer;

  @media screen and (max-width: 1024px) {
    font-size: 1.3rem;
  }

  @media screen and (max-width: 767px) {
    font-size: 1.1rem;
  }

  @media screen and (max-width: 402px) {
    font-size: 1rem;
  }
`;

const Goods = styled.div`
  font-size: 2.2rem;
  font-weight: bold;
  cursor: pointer;

  @media screen and (max-width: 1024px) {
    font-size: 1.4rem;
  }

  @media screen and (max-width: 767px) {
    font-size: 1.2rem;
  }

  @media screen and (max-width: 402px) {
    font-size: 1.1rem;
  }
`;

const TattooVideos = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 1024px) {
  }
`;


const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--light-color);
  &:first-child {
    margin-left: 30px;
    background: var(--dark-color);
  }
  @media screen and (max-width: 1024px) {
  }
`;

const ContentTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--event-color);
  margin-bottom: 20px;
  @media screen and (max-width: 1024px) {
    font-size: 1.7rem;
    font-weight: 600;
    margin-bottom: 5px;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 6%;
  @media screen and (max-width: 1024px) {
  }
`;

const Line = styled.div`
  border: 1px solid var(--dark-color);
  @media screen and (max-width: 1024px) {
  }
`;

const Bundle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media screen and (max-width: 1024px) {
  }
`;



const DetailBundle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media screen and (max-width: 1024px) {
  }
`;


const tattooData = [
  {
    title: "EVERYDAY TOTEM:",
    name: "박재범 JAY PARK",
    quote: "JAY’S WAY: 무심한 듯 확실한 취향",
    picture1: guccibelt,
    picture2: chapsticklib,
    picture3: shaver,
    pick: "JAYPARK PICK",
    content1: "구찌 벨트",
    content2: "찹스틱 립밤",
    content3: "브라운 쉐이버",
    videoId: "YNYsnknpuig",
  },
  {
    title: "EVERYDAY TOTEM:",
    name: "모니카 MONIKA",
    quote: "“모든 선택에 태도가 담긴 사람, 모니카.”",
    picture1: tamburinsperfume,
    picture2: burberrywallet,
    picture3: lakalib,
    pick: "MORNIKA PICK",
    content1: "템버린즈 카모 향수",
    content2: "버버리 반지갑 스몰 체크 바이폴드 지갑",
    content3: "라카 본딩 글로우 립스틱",
    videoId: "pFVSsNlL2kQ"
  },
  {
    title: "EVERYDAY TOTEM:",
    name: "박준원 PH-1",
    quote: "“PH-1의 무드를 완성하는 작은 취향들.”",
    picture1: pradabag,
    picture2: solgavitamin,
    picture3: salvatoreferragamo,
    pick: "PH-1 PICK",
    content1: "프라다 나일론 크로스백",
    content2: "솔가 비타민d 3",
    content3: "살바토레 페레가모 향수",
    videoId: "tfabmoB__24"
  },
];

const WhatInBag = ({ bundleRefs }) => {
  const navigate = useNavigate();
  const YouTubeEmbed = ({ videoId }) => (
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;  block;"
        allowFullScreen
      />
  );
  return (
    <>
      <TattooContents>
        <TattooTittle>WHAT’S IN MY BAG</TattooTittle>
        <TattooVideos>
          {tattooData.map((item, index) => (
            <React.Fragment key={index}>
              <VideoTop>
                <Circle />
                <Circle />
                <Circle />
              </VideoTop>
              <VideosContents>
                <VideoContent>
                  <YouTubeEmbed videoId={item.videoId} />
                </VideoContent>
                <CommerceContent>
                  <Content>
                    <ContentTitle>{item.title}</ContentTitle>
                    <InfluencerName>{item.name}</InfluencerName>
                    <QuoteSection>{item.quote}</QuoteSection>
                    <Bundles>
                      <Bundle onClick={() => navigate(`/detail/${item.content1}`)}
                        ref={bundleRefs[index]}
                      >
                        <Picture >
                          <img src={item.picture1} alt={item} />
                        </Picture>
                        <DetailBundle>
                          <Pick>{item.pick}</Pick>
                          <Goods>{item.content1}</Goods>
                          <Line />
                        </DetailBundle>
                      </Bundle>
                      <Bundle onClick={() => navigate(`/detail/${item.content2}`)}>
                        <Picture>
                          <img src={item.picture2} alt={item} />
                        </Picture>
                        <DetailBundle>
                          <Pick>{item.pick}</Pick>
                          <Goods>{item.content2}</Goods>
                          <Line />
                        </DetailBundle>
                      </Bundle>
                      <Bundle onClick={() => navigate(`/detail/${item.content3}`)}>
                        <Picture>
                          <img src={item.picture3} alt={item} />
                        </Picture>
                        <DetailBundle>
                          <Pick>{item.pick}</Pick>
                          <Goods>{item.content3}</Goods>
                          <Line />
                        </DetailBundle>
                      </Bundle>
                    </Bundles>
                  </Content>
                </CommerceContent>
              </VideosContents>
            </React.Fragment>
          ))}
        </TattooVideos>
      </TattooContents>
    </>
  );
};

export default WhatInBag;
