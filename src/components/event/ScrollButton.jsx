import React from 'react'
import styled from 'styled-components'
import { Link,useLocation } from 'react-router-dom'


const ButtonContents = styled.div`
  display: flex;
  width: 100%;
  height: 80px;

  @media screen and (max-width: 1024px) {
    height: 70px;
  }
  @media screen and (max-width: 402px) {
    height: 60px;
  }
`

const IntroduceLinkButton = styled(Link)`
  width: 100%;
  border: 1px solid var(--dark-color);
  background: var(--light-color);
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  font-family: "EHNormalTrial";
  cursor: pointer;
  display: flex;

  background: ${({ selected }) =>
      selected ? 'var(--dark-color)' : 'var(--light-color)'};
    color: ${({ selected }) =>
      selected ? 'var(--light-color)' : 'var(--dark-color)'};
  

  @media screen and (max-width: 1024px) {
    font-size: 1.8rem;
  }
  @media screen and (max-width: 402px) {
    font-size: 1.5rem;
  }

  &:hover {
    background: var(--dark-color);
    color: var(--light-color);
    transition: 0.3s;
  }

`

const InfluencerLinkButton = styled(Link)`
  width: 100%;
  border: 1px solid var(--dark-color);
  background: var(--light-color);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  font-family: "EHNormalTrial";
  text-decoration: none;
  color: var(--dark-color);
  cursor: pointer;
  background: ${({ selected }) =>
      selected ? 'var(--dark-color)' : 'var(--light-color)'};
    color: ${({ selected }) =>
      selected ? 'var(--light-color)' : 'var(--dark-color)'};
  

  @media screen and (max-width: 1024px) {
    font-size: 1.8rem;
  }
  @media screen and (max-width: 402px) {
    font-size: 1.5rem;
  }

  &:hover {
    background: var(--dark-color);
    color: var(--light-color);
    transition: 0.3s;
  }
`

const ScrollButton = () => {
  const location = useLocation()
  return (
    <ButtonContents>
      <IntroduceLinkButton to="/event"  selected={location.pathname === '/event'}>
        INTROUDUCE TATTOO
      </IntroduceLinkButton>
      <InfluencerLinkButton to="/event/promotion" selected={location.pathname === '/event/promotion'}>INFLUENCER</InfluencerLinkButton>
    </ButtonContents>
  )
}

export default ScrollButton