import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  padding-top: 60px;

  @media screen and (max-width: 1024px) {
    padding-top: 40px;
  }
  @media screen and (max-width: 767px) {
    padding-top: 30px;
  }
  @media screen and (max-width: 402px) {
    padding-top: 30px;
  }
`;

const TattooContents = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 100px 15%;
`;

const TattooTittle = styled.div`
  width: 100%;
  font-size: 5rem;

  @media screen and (max-width: 1024px) {
    font-size: 4rem;
  }
  @media screen and (max-width: 767px) {
    font-size: 2rem;
  }
  @media screen and (max-width: 402px) {
    font-size: 2rem;
  }
`;

const TattooVideos = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1024px) {
    gap: 40px;
  }
  @media screen and (max-width: 767px) {
    gap: 30px;
  }
  @media screen and (max-width: 402px) {
    gap: 30px;
  }
`;

const VideoTop = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  border-radius: 20px 20px 0 0;
  background: var(--dark-color);
  gap: 10px;

  @media screen and (max-width: 1024px) {
    height: 35px;
    gap: 8px;
  }
  @media screen and (max-width: 767px) {
    height: 30px;
    border-radius: 0;
    gap: 6px;
  }
  @media screen and (max-width: 402px) {
    height: 30px;
    border-radius: 0;
    gap: 6px;
  }
`;

const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--light-color);

  @media screen and (max-width: 1024px) {
    width: 11px;
    height: 11px;
  }
  @media screen and (max-width: 767px) {
    width: 10px;
    height: 10px;
  }
  @media screen and (max-width: 402px) {
    width: 10px;
    height: 10px;
  }

  &:first-child {
    margin-left: 15px;
    background: var(--event-color);
  }
`;

const ContentTitle = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #ace0ff;
  margin-bottom: 20px;

  @media screen and (max-width: 1024px) {
    font-size: 1.7rem;
    font-weight: 600;
    margin-bottom: 15px;
  }
  @media screen and (max-width: 767px) {
    font-size: 1rem;
    margin-bottom: 6px;
  }
  @media screen and (max-width: 402px) {
    font-size: 1rem;
    margin-bottom: 6px;
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
    margin-bottom: 15px;
  }
  @media screen and (max-width: 402px) {
    font-size: 2rem;
    margin-bottom: 15px;
  }
`;

const QuoteSection = styled.div`
  width: 90%;
  font-size: 1.8rem;
  line-height: 3rem;
  margin-bottom: 30px;

  @media screen and (max-width: 1024px) {
    width: 100%;
    font-size: 1.6rem;
    line-height: 2.7rem;
    margin-bottom: 25px;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    font-size: 1.2rem;
    line-height: 1.3rem;
    margin-bottom: 15px;
  }
  @media screen and (max-width: 402px) {
    width: 100%;
    font-size: 1rem;
    line-height: 1.3rem;
    margin-bottom: 15px;
  }
`;

const VideosContent = styled.div`
  /* position: relative; */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 0 20px 20px;
  border: 1px solid var(--dark-color);
  margin-bottom: 60px;

  @media screen and (max-width: 1024px) {
    margin-bottom: 40px;
  }
  @media screen and (max-width: 402px) {
    height: 100%;
    margin-bottom: 30px;
    border-radius: 0;
  }
  @media screen and (max-width: 767px) {
    height: 100%;
    margin-bottom: 30px;
    border-radius: 0;
  }
`;

const AllContent = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 40px;
  width: 100%;
  height: 100%;
  padding: 50px;

  @media screen and (max-width: 1024px) {
    padding: 40px;
    gap: 30px;
  }
  @media screen and (max-width: 767px) {
    padding: 20px;
    gap: 20px;
    flex-direction: column-reverse;
  }
  @media screen and (max-width: 402px) {
    padding: 20px;
    gap: 20px;
    flex-direction: column-reverse;
  }
`;

const RightContent = styled.div`
  width: 52%;
  height: 443px;
  cursor: pointer;

  video {
    transition: all 1s;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 1px solid #000;
  }

  @media screen and (max-width: 1024px) {
    height: 380px;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 402px) {
    width: 100%;
    height: 200px;
    margin-bottom: 20px;
  }
`;

const LeftContent = styled.div`
  position: relative;
  width: 48%;

  @media screen and (max-width: 1024px) {
    width: 48%;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
  }
  @media screen and (max-width: 402px) {
    width: 100%;
  }
`;

const HashtagWrap = styled.div`
  /* height: 100%; */
  display: flex;
  color: var(--light-color);
  gap: 10px;
  margin-bottom: 40px;
  flex-wrap: wrap;

  span {
    padding: 14px 20px;
    border-radius: 50px;
    background: var(--dark-color);

    @media screen and (max-width: 1024px) {
      padding: 10px 15px;
      font-size: 1.14rem;
    }
    @media screen and (max-width: 767px) {
      padding: 6px 10px;
      font-size: 0.9rem;
      border-radius: 30px;
    }
    @media screen and (max-width: 402px) {
      padding: 6px 10px;
      font-size: 0.9rem;
      border-radius: 30px;
    }
  }

  @media screen and (max-width: 1024px) {
    margin-bottom: 30px;
    gap: 8px;
  }
  @media screen and (max-width: 767px) {
    margin-bottom: 20px;
    gap: 6px;
  }
  @media screen and (max-width: 402px) {
    margin-bottom: 20px;
    gap: 6px;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;

  @media screen and (max-width: 1024px) {
  }
  @media screen and (max-width: 402px) {
  }
`;

const ClickButton = styled.div`
  width: 430px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  padding: 16px 0;
  border: 2px solid var(--dark-color);
  color: var(--dark-color);
  font-size: 2rem;
  font-weight: 600;
  gap: 10px;
  cursor: pointer;
  transition: all 0.5s;

  span {
    transition: all 0.3s;
  }

  &:hover {
    background: var(--event-color);
    border: 2px solid var(--event-color);

    span {
      transform: translateX(10px);

      @media screen and (max-width: 767px) {
        transform: translateX(5px);
      }
      @media screen and (max-width: 402px) {
        transform: translateX(5px);
      }
    }
  }

  @media screen and (max-width: 1024px) {
    width: 290px;
    padding: 14px 0;
    font-size: 1.4rem;
    gap: 8px;
  }
  @media screen and (max-width: 767px) {
    width: 100%;
    padding: 8px 0;
    font-size: 0.8rem;
    gap: 5px;
    border-radius: 30px;
  }
  @media screen and (max-width: 402px) {
    width: 100%;
    padding: 8px 0;
    font-size: 0.8rem;
    gap: 5px;
    border-radius: 30px;
  }
`;

const tattooData = [
  {
    title: "TATTOOED THOUGHTS:",
    name: "박재범 JAY PARK",
    quote:
      '"그의 타투는 자유에 대한 선언이었다." 몸에 새기는 건, 지워지지 않는 말. 그는 아무 말도 하지 않아도, 이미 수많은 문장을 새겼다. 타투는 그에게 반항이 아니라 해방이었고, 스타일이 아니라 생존의 증명이었다. 박재범의 몸은, 그가 살아온 기록이다."',
    tags: ["GQ KOREA", "박재범", "JAY PARK", "사자", "치카노"],
    button: "지금, 그의 가방 속까지 들여다보고 싶다면",
    videoId: "sWHCnmBAMjc"
  },
  {
    title: "TATTOOED THOUGHTS:",
    name: "모니카 MONIKA",
    quote:
      '"그녀의 타투는 말보다 강했다."  단 한 번의 동작,  단 한 줄의 문장. 모니카는 침묵으로 말하고,  몸 위에 의지를 새긴다. 그녀의 타투는 장식이 아닌 다짐이다. 모든 움직임엔 이유가 있고, 그녀의 타투엔 철학이 있다.',
    tags: ["GQ KOREA", "모니카", "MONIKA", "TATTOO", "사슴"],
    button: "지금, 그의 가방 속까지 들여다보고 싶다면",
    videoId: "VMf52LL18Ts"
  },
  {
    title: "TATTOOED THOUGHTS:",
    name: "박준원 PH-1",
    quote:
      '"그의 타투는 흐름 위에 새긴 방향이었다." 겉으로는 가볍고 편안하지만, 그는 언제나 선을 알고 있었다. PH-1의 타투는 멋이 아니라 스스로를 잃지 않기 위한 표식. 흔들리지 않기 위해 그는 몸 위에 흐름을 새겼다.',
    tags: ["GQ KOREA", "ph-1", "박준원", "낙서타투", "태극기"],
    button: "지금, 그의 가방 속까지 들여다보고 싶다면",
    videoId: "-RSp0fyjsx4"
  },
];

const Introduce = ({ bundleRefs }) => {
  const YouTubeEmbed = ({ videoId }) => (
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${videoId}`}
      title="YouTube video"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  );
  const handleScrollTo = (index) => {
    const target = bundleRefs[index]?.current;
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.scrollY;
      const headerOffset = 400; // 고정된 헤더 높이만큼 조정 (예: 100px)

      window.scrollTo({
        top: offsetTop - headerOffset,
        behavior: "smooth",
      });
    }
  };

  const HashtagList = ({ tags }) => (
    <HashtagWrap>
      {tags.map((tag, index) => (
        <span key={index}>#{tag}</span>
      ))}
    </HashtagWrap>
  );

  return (
    <>
      <Wrapper />
      <TattooContents>
        <TattooTittle>INTRODUCE TATTOO</TattooTittle>
        <TattooVideos>
          {tattooData.map((item, index) => (
            <div key={index}>
              <VideoTop>
                <Circle />
                <Circle />
                <Circle />
              </VideoTop>
              <VideosContent>
                <AllContent>
                  <LeftContent>
                    <Content>
                      <ContentTitle>{item.title}</ContentTitle>
                      <InfluencerName>{item.name}</InfluencerName>
                      <QuoteSection>{item.quote}</QuoteSection>
                      <HashtagList tags={item.tags} />
                      <ClickButton onClick={() => handleScrollTo(index)}>
                        {item.button}{" "}
                        <span className="fas fa-angle-right"></span>
                      </ClickButton>
                    </Content>
                  </LeftContent>
                  <RightContent>
                  <YouTubeEmbed videoId={item.videoId}/>
                  </RightContent>
                </AllContent>
              </VideosContent>
            </div>
          ))}
        </TattooVideos>
      </TattooContents>
    </>
  );
};

export default Introduce;
