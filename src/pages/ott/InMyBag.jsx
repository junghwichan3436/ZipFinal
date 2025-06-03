import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  padding: 0 3%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--ott-bg-color);
  color: var(--light-color);
`;

const Title = styled.div`
  display: flex;
  align-items: end;
  gap: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid #3c3c3c;
  h4 {
    font-size: 6rem;
    font-family: "EHNormalTrial";
  }
  p {
    line-height: 1.2;
    b {
      font-family: "EHNormalTrial";
    }
  }
`;

const Category = styled.ul`
  display: flex;
  li {
    padding: 14px 20px;
    border: 1px solid var(--light-color);
    cursor: pointer;
  }
`;

const InMyBag = () => {
  return (
    <Container>
      <Title>
        <h4>BAG ZIP</h4>
        <p>
          당신이 좋아하는 연예인의 취향을 인마이백으로
          <br />
          <b>BAG ZIP</b>에서
        </p>
      </Title>
      <Category>
        <li>ALL</li>
        <li>ACTOR</li>
        <li>MUSICIAN</li>
        <li>SPORTS</li>
      </Category>
    </Container>
  );
};

export default InMyBag;
