import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

/* --- 스타일 --- */
const Container = styled.div`
  width: 100%;
  background: var(--light-color);
  color: var(--dark-color);
`;
const Wrapper = styled.div`
  width: 100%;
  margin-top: 100px;
  @media screen and (max-width: 1024px) {
    margin-top: 50px;
  }
`;
const Item = styled.section`
  width: 100%;
  height: 80%;
  border-top: 1px solid var(--lightGray);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  position: relative;
  background: var(--light-color);

  &:last-child {
    border-bottom: 1px solid var(--lightGray);
  }
`;
const MainTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 100px 3% 0px;
`;
const Title = styled.h2`
  color: var(--dark-color);
  font-size: 10rem;
  letter-spacing: -4px;
  font-family: "EHNormalTrial";

  @media screen and (max-width: 1024px) {
    font-size: 7rem;
  }
  @media screen and (max-width: 768px) {
    font-size: 5rem;
    letter-spacing: -2px;
  }
`;
const Button = styled.button`
  font-size: 2rem;
  color: var(--light-color);
  background: var(--dark-color);
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  font-family: "EHNormalTrial";
  padding: 22px 50px;
  background: var(--dark-color);

  @media screen and (max-width: 1024px) {
    font-size: 1.6rem;
    padding: 20px 40px;
  }
  @media screen and (max-width: 767px) {
    font-size: 1.2rem;
    padding: 16px 24px;
  }
`;
const AccordionCard = styled.div`
  width: 100%;
  padding: 0 10%;
  margin: 50px 0;
`;
const CardTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 7rem;
  font-weight: 700;
  margin-bottom: 50px;
  span {
    font-family: "EHNormalTrial";
  }
  @media screen and (max-width: 1024px) {
    font-size: 5rem;
    margin-bottom: 30px;
  }
  @media screen and (max-width: 767px) {
    font-size: 4rem;
    margin-bottom: 30px;
  }
`;
const CardInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 80px;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    gap: 20px;
  }
`;
const LeftInfo = styled.aside`
  width: 50%;
  h4 {
    font-size: 3.6rem;
    font-weight: 600;
    line-height: 4.4rem;
  }
  p {
    margin: 20px 0 30px;
    font-size: 2rem;
    font-weight: 300;
    line-height: 3rem;
  }
  button {
    font-family: "EHNormalTrial";
    font-weight: 500;
    background: var(--dark-color);
    color: var(--light-color);
    padding: 18px 44px;
    border: none;
    cursor: pointer;
    text-transform: uppercase;
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    h4 {
      font-size: 3rem;
      line-height: 3.6rem;
      white-space: pre-line;
      margin-top: 20px;
    }
    p {
      margin: 20px 0 20px;
      white-space: pre-line;
      font-size: 1.6rem;
      line-height: 2.4rem;
    }
    button {
      display: none;
    }
  }
  @media screen and (max-width: 767px) {
    h4 {
      font-size: 2.2rem;
      line-height: 3rem;
    }
    p {
      margin: 10px 0 10px;
      font-size: 1.4rem;
      line-height: 2rem;
    }
    button {
      display: none;
    }
  }
`;
const RightInfo = styled.div`
  position: relative;
  width: 70%;
  padding-top: 26.625%;
  cursor: pointer;
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 1024px) {
    width: 100%;
    padding-top: 38.625%;
  }
`;

/* --- 출력 --- */
const RecentZip = () => {
  const navigate = useNavigate();
  const [starData, setStarData] = useState([]);

  useEffect(() => {
    fetch("/API/homeData.json")
      .then((response) => response.json())
      .then((data) => setStarData(data.starData));
  }, []);

  return (
    <Container>
      <MainTitle>
        <Title>Artist Zip</Title>
        <Button onClick={() => navigate("/star")}>More Zip</Button>
      </MainTitle>
      <Wrapper>
        {starData.map((item) => (
          <Item key={item.id}>
            <AccordionCard>
              <CardTitle>
                <span>{String(item.id).padStart(2, "0")}</span>
                <h3>{item.name}</h3>
              </CardTitle>
              <CardInfo>
                <LeftInfo>
                  <h4>
                    {item.title.split("\n").map((line, idx) => (
                      <React.Fragment key={idx}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </h4>
                  <p>{item.desc}</p>
                  <button onClick={() => navigate(`/star/${item.name}`)}>view zip</button>
                </LeftInfo>
                <RightInfo onClick={() => navigate(`/star/${item.name}`)}>
                  <video src={item.video} muted autoPlay loop></video>
                </RightInfo>
              </CardInfo>
            </AccordionCard>
          </Item>
        ))}
      </Wrapper>
    </Container>
  );
};

export default RecentZip;
