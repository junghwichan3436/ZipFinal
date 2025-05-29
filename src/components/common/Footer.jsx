import { useState, useEffect } from "react";
import { useMatch, Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  color: var(--light-color);
  background: var(--dark-color);
  padding: 100px 3% 40px 3%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
  z-index: 1;
`;
const FooterLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media screen and (max-width: 767px) {
    gap: 40px;
  }
`;
const Fnb = styled.nav``;
const FooterFnb = styled.ul`
  display: flex;
  gap: 16px;
  li {
    cursor: pointer;
  }
  @media screen and (max-width: 767px) {
  }
`;
const Address = styled.address`
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 10px;
  p {
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;
const AddressList = styled.ul`
  display: flex;
  gap: 10px;
  li {
    font-size: 1.2rem;
  }
  @media screen and (max-width: 767px) {
    flex-direction: column;
    li {
      &:nth-child(even) {
        display: none;
      }
    }
  }
`;
const FooterRight = styled.div``;
const HeaderLogoImg = styled.img`
  width: 90px;
`;

const Footer = () => {
  const [filterCheck, setFilterCheck] = useState(false);
  const navigate = useNavigate();
  const commerceMatch = useMatch("/");
  const detailMatch = useMatch("/detail/:itemName");
  const loginMatch = useMatch("/login");
  const signUpMatch = useMatch("/signup");
  const eventMatch = useMatch("/event");
  const promotionMatch = useMatch("/event/:promotion");
  const cartMatch = useMatch("/cart");
  const filterCategoryMatch = useMatch("/filtercategory/:categoryName");
  const searchMatch = useMatch("/search/:name");
  const mypageMatch = useMatch("/mypage");
  const mypageMatch02 = useMatch("/mypage/:name");
  const starMatch = useMatch("/star");
  const starDetailMatch = useMatch("/star/:starName");
  const filterFunc = () => {
    if (
      commerceMatch ||
      detailMatch ||
      filterCategoryMatch ||
      loginMatch ||
      signUpMatch ||
      eventMatch ||
      cartMatch ||
      searchMatch ||
      mypageMatch ||
      mypageMatch02 ||
      starMatch ||
      starDetailMatch ||
      promotionMatch
    ) {
      setFilterCheck(true);
    } else {
      setFilterCheck(false);
    }
  };
  useEffect(() => {
    filterFunc();
  }, [
    commerceMatch,
    detailMatch,
    filterCategoryMatch,
    loginMatch,
    signUpMatch,
    eventMatch,
    mypageMatch,
    mypageMatch02,
    searchMatch,
    starMatch,
    starDetailMatch,
    promotionMatch,
  ]);

  return (
    <Container>
      <FooterLeft>
        <Fnb>
          {filterCheck ? (
            <FooterFnb>
              <li onClick={() => navigate("/filtercategory/style")}>Style</li>
              <li onClick={() => navigate("/filtercategory/beauty")}>Beauty</li>
              <li onClick={() => navigate("/filtercategory/artist")}>Artist</li>
              <li onClick={() => navigate("/event")}>Promotion</li>
            </FooterFnb>
          ) : (
            <FooterFnb>
              <li>OTT</li>
            </FooterFnb>
          )}
        </Fnb>
        <Address>
          <AddressList>
            <li>COMPANY: ZIP.</li>
            <li>|</li>
            <li>OWNER: JAEGI JUNG</li>
            <li>|</li>
            <li>TEL: 02 - 1234- 5678</li>
          </AddressList>
          <p>
            <span>ADDRESS: Gangnam-gu, Seoul</span>
            <span>COPYRIGHT © ZIP. ALL RIGHTS RESERVED.</span>
          </p>
        </Address>
      </FooterLeft>
      <FooterRight>
        <Link to="/">{/* <HeaderLogoImg src="/img/Logo.png" /> */}</Link>
      </FooterRight>
    </Container>
  );
};

export default Footer;
