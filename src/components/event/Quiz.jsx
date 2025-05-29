import React, { useState } from "react";
import styled from "styled-components";
import theQuiett from "../../imgs/event/the_quiett.png";
import beenzino from "../../imgs/event/beenzino.png";
import owen from "../../imgs/event/owen.png";
import dok2 from "../../imgs/event/dok2.png";
import arm from "../../imgs/event/arm.png";
import hand from "../../imgs/event/hand.png";
import inarm from "../../imgs/event/inarm.png";
import shoulder from "../../imgs/event/shoulder.png";
import gucci from "../../imgs/event/gucci.png";
import chanel from "../../imgs/event/chanel.png";
import louis from "../../imgs/event/louis.png";
import hermes from "../../imgs/event/hermes.png";

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--dark-color);
`;

const QuizTitle = styled.div`
  color: var(--light-color);
  font-size: 8rem;
  font-weight: bold;
  padding: 0px 0px 152px;
  align-self: flex-start;
  @media screen and (max-width: 1300px) {
    color: var(--light-color);
    font-size: 6rem;
    font-weight: bold;
    align-self: flex-start;
  }
  @media screen and (max-width: 1024px) {
    font-size: 5rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 3rem;
    padding: 0px 0px 50px;
  }
  @media screen and (max-width: 402px) {
    font-size: 2rem;
  }
`;

const BlueBox = styled.div`
  background: #ace0ff;
  border-radius: 50px 0 0 50px;
  display: flex;
  justify-content: center;
  padding: 0 60px;
  @media screen and (max-width: 1300px) {
    padding: 0 15px;
  }
  @media screen and (max-width: 1024px) {
    padding: 0;
    height: auto;
  }
`;

const Question = styled.div`
  font-size: 6rem;
  font-weight: bold;
  padding-top: 80px;
  color: var(--dark-color);
  @media screen and (max-width: 1300px) {
    font-size: 5rem;
    padding: 80px 36px;
  }

  @media screen and (max-width: 1024px) {
    font-size: 3.5rem;
    padding: 80px 36px;
  }
  @media screen and (max-width: 767px) {
    font-size: 3rem;
    padding: 40px 30px;
  }
  @media screen and (max-width: 600px) {
    font-size: 2.2rem;
    padding: 40px 20px;
  }
  @media screen and (max-width: 480px) {
    padding: 40px 20px;
  }
  @media screen and (max-width: 402px) {
    font-size: 2rem;
    padding: 36px 10px;
  }
`;

const WhiteBox = styled.div`
  width: 100%;
  background: #fff;
  border-radius: 0 50px 50px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 90px;
  padding: 80px 0;
  @media screen and (max-width: 1300px) {
    gap: 50px;
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-bottom: 70px;
  }
  @media screen and (max-width: 767px) {
    padding: 40px 0 40px;
  }
  @media screen and (max-width: 450px) {
    gap: 30px;
  }
  @media screen and (max-width: 402px) {
    gap: 20px;
    padding-bottom: 40px;
  }
`;

const AllBox = styled.div`
  height: 100%;
  display: flex;
  padding-bottom: 100px;
  @media screen and (max-width: 1024px) {
    width: 100%;
    height: 100%;
  }
  @media screen and (max-width: 402px) {
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 5rem;
  @media screen and (max-width: 1300px) {
    font-size: 3.5rem;
  }
  @media screen and (max-width: 1024px) {
    font-weight: bold;
    font-size: 3rem;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    /* padding: 80px 0 0; */
  }
  @media screen and (max-width: 767px) {
    font-size: 2.2rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 402px) {
    font-weight: bold;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
  }
`;

const EachName = styled.div`
  position: relative;
  font-size: 3.2rem;
  line-height: 1;
  cursor: pointer;
  @media screen and (max-width: 1300px) {
    font-size: 2.2rem;
  }
  @media screen and (max-width: 1024px) {
    font-size: 2.2rem;
    line-height: 1;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.5rem;
  }
  @media screen and (max-width: 600px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 402px) {
  }
`;

const Picture = styled.div`
  width: 100%;
  object-fit: cover;
  overflow: hidden;
  border-radius: 16%;
  img {
    object-fit: cover;
    border-radius: 10%;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      scale: 1.05;
    }
    @media screen and (max-width: 1530px) {
      width: 100%;
      height: 100%;
    }
    @media screen and (max-width: 1300px) {
      width: 100%;
      height: 100%;
    }
    @media screen and (max-width: 1170px) {
      width: 80%;
      height: 100%;
    }

    @media screen and (max-width: 1024px) {
      width: 70%;
      height: 100%;
    }
  }
`;

const FirstBundle = styled.div`
  display: flex;
  gap: 20%;
  justify-content: center;
    @media screen and (max-width: 1024px) {
      gap: 10%;
  } 
`;

const SecondBundle = styled.div`
  display: flex;
  gap: 20%;
  justify-content: center;
  @media screen and (max-width: 1024px) {
      gap: 10%;
  } 
`;

const DetailBundle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  @media screen and (max-width: 1024px) {
  }
  @media screen and (max-width: 600px) {
    gap: 15px;
  }
  @media screen and (max-width: 402px) {
    gap: 10px;
  }
`;

const ThirdBundle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 70px;
  @media screen and (max-width: 1170px) {
    padding-left: 10%;
  }
  @media screen and (max-width: 1024px) {
    gap: 70px;
  }
  @media screen and (max-width: 767px) {
    gap: 50px;
  }
  @media screen and (max-width: 600px) {
    gap: 25px;
  }
  @media screen and (max-width: 402px) {
    gap: 30px;
  }
`;

const EventButton = styled.div`
  width: fit-content;
  height: 60px;
  padding: 30px;
  margin: 100px auto;
  color: var(--dark-color);
  background: var(--border-color);
  border-radius: 50px 50px;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  cursor: pointer;
  @media screen and (max-width: 402px) {
    font-size: 1.3rem;
    height: 50px;
    padding: 20px;
    margin: 0px auto;
  }
  &:hover {
    color: var(--light-color);
    transition: all 0.3s;
  }
`;

const CheckIcon = styled.span`
  position: absolute;
  width: 50px;
  height: 50px;
  font-size: 2rem;
  z-index: 10;
  display: flex;
  justify-content: flex-start;
  transform: translate(-10px,-50px);
  @media screen and (max-width: 1300px) {
    transform: translate(-10px,-35px);
    /* font-size: 2rem; */
    width: 40px;
    height: 40px;
  }
  @media screen and (max-width: 767px) {
    transform: translate(-6px, -25px);
    width: 25px;
    height: 25px;
  }
  @media screen and (max-width: 600px) {
    transform: translate(-4px, -15px);
    width: 16px;
    height: 16px;
  }
`;

const quizData = [
  {
    question: "Q1",
    title: "박재범에게 타투이스트를 소개시켜준 인물은?",
    name1: "A. 더 콰이엇 ",
    name2: "B. 빈지노 ",
    name3: "C. 오왼  ",
    name4: "D. 도끼 ",
    picture1: theQuiett,
    picture2: beenzino,
    picture3: owen,
    picture4: dok2,
  },
  {
    question: "Q2",
    title: "영상에서 모니카가 마지막타투를 한 부위는?",
    name1: "A. 손 ",
    name2: "B. 어깨 ",
    name3: "C. 팔 ",
    name4: "D. 팔안쪽 ",
    picture1: hand,
    picture2: shoulder,
    picture3: arm,
    picture4: inarm,
  },
  {
    question: "Q3",
    title: "영상에서 PH-1이 새긴 명품 브랜드 로고는?",
    name1: "A. 루이비통",
    name2: "B. 샤넬 ",
    name3: "C. 구찌 ",
    name4: "D. 에르메스 ",
    picture1: louis,
    picture2: chanel,
    picture3: gucci,
    picture4: hermes,
  },
];

const Quiz = () => {
  const [selectedOptions, setSelectedOptions] = useState(
    Array(quizData.length).fill(-1)
  );

  const handleOptionClick = (quizIndex, optionIndex) => {
    const updated = [...selectedOptions];
    updated[quizIndex] = optionIndex;
    setSelectedOptions(updated);
  };
  return (
    <Container>
      <QuizTitle>
        WHAT'S IN THEIR BAG?
        <br />
        퀴즈 챌린지
      </QuizTitle>
      {quizData.map((item, index) => (
        <React.Fragment key={index}>
          <AllBox>
            <BlueBox>
              <Question>{item.question}</Question>
            </BlueBox>
            <WhiteBox>
              <Title>{item.title}</Title>
              <ThirdBundle>
                <FirstBundle>
                  <DetailBundle>
                    <EachName onClick={() => handleOptionClick(index, 0)}>
                      {item.name1}{" "}
                      {selectedOptions[index] === 0 && (
                        <CheckIcon><img src="/img/check.png" alt="check" /></CheckIcon>
                      )}
                    </EachName>
                    <Picture onClick={() => handleOptionClick(index, 0)}>
                      <img src={item.picture1} alt={item.name1} />
                    </Picture>
                  </DetailBundle>
                  <DetailBundle>
                    <EachName onClick={() => handleOptionClick(index, 1)}>
                      {item.name2}{" "}
                      {selectedOptions[index] === 1 && (
                        <CheckIcon><img src="/img/check.png" alt="check" /></CheckIcon>
                      )}
                    </EachName>
                    <Picture onClick={() => handleOptionClick(index, 1)}>
                      <img src={item.picture2} alt={item.name2} />
                    </Picture>
                  </DetailBundle>
                </FirstBundle>
                <SecondBundle>
                  <DetailBundle>
                    <EachName onClick={() => handleOptionClick(index, 2)}>
                      {item.name3}{" "}
                      {selectedOptions[index] === 2 && (
                        <CheckIcon><img src="/img/check.png" alt="check" /></CheckIcon>
                      )}
                    </EachName>
                    <Picture onClick={() => handleOptionClick(index, 2)}>
                      <img src={item.picture3} alt={item.name3} />
                    </Picture>
                  </DetailBundle>
                  <DetailBundle>
                    <EachName onClick={() => handleOptionClick(index, 3)}>
                      {item.name4}{" "}
                      {selectedOptions[index] === 3 && (
                        <CheckIcon><img src="/img/check.png" alt="check" /></CheckIcon>
                      )}
                    </EachName>
                    <Picture onClick={() => handleOptionClick(index, 3)}>
                      <img src={item.picture4} alt={item.name4} />
                    </Picture>
                  </DetailBundle>
                </SecondBundle>
              </ThirdBundle>
            </WhiteBox>
          </AllBox>
        </React.Fragment>
      ))}
      <EventButton onClick={() => alert("이벤트에 참여해주셔서 감사합니다! 당첨결과는 8월 15일 카톡으로 알려드립니다")}>
        이벤트 참여하기
      </EventButton>
    </Container>
  );
};

export default Quiz;
