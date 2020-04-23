import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import logo from '../static/logo.png';
import hamburger from '../static/hamburger.png';

import Link from './Link.jsx';

const StyledLink = styled(Link)`
  @media (max-width: 767px) {
    margin-bottom: ${({ dropdown }) => dropdown.length ? '0px' : '15px'};
  }
`;

const HeaderWrapper = styled.header`
  width: 100%;
  /* why should set min-height (?) */
  min-height: 70px; 
  height: 70px;
  background-color: white;
  box-shadow: 0px 0px 25px #80808078;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 40px;
`;

const LogoLink = styled(NavLink)`
  width: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  width: 100%;
`;

const LinkWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 767px) {
    display: none;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  @media (max-width: 767px) {
    width: 40px;
    border: none;
    cursor: pointer;
    outline: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 10px;
    transform: ${({ menuShowed }) => menuShowed ? 'rotate(90deg)' : 'rotate(0deg)'};
    transition-duration: 0.3s;
    transition-property: transform;
    transition-timing-function: linear;
  }
`;

const MobileMenuWrapper = styled.div`
  display: none;
  @media (max-width: 767px) {
    width: 100%;
    height: calc(100vh - 70px);
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: white;
    position: absolute;
    top: 70px;
    opacity: ${({ menuShowed }) => menuShowed ? 1 : 0};
    right: ${({ menuShowed }) => menuShowed ? 0 : '-100%'};
    transition-duration: 0.3s;
    transition-property: right, opacity;
    transition-timing-function: ease-in-out;
    z-index: 999;
  }
`;

const links = [{
  path: '/',
  name: 'Home',
  dropdown: [],
}, {
  path: '/practice',
  name: 'Practice',
  dropdown: [{
    path: '/calendar',
    name: 'Calendar',
  }],
}, {
  path: '/heyhey',
  name: '???',
  dropdown: [],
}];

function Header() {
  const [showMobileMenu, setMobileMenu] = useState(false);

  return (
    <HeaderWrapper>
      <LogoLink onClick={() => setMobileMenu(false)} to="/">
        <Logo src={logo} alt="logo" />
      </LogoLink>
      <LinkWrapper>
        {links.map(link => (
          <StyledLink
            dropdown={link.dropdown}
            name={link.name}
            key={link.path}
            to={link.path} />
        ))}
      </LinkWrapper>
      <HamburgerButton
        menuShowed={showMobileMenu}
        onClick={() => setMobileMenu(!showMobileMenu)}
        type="button">
        <Logo src={hamburger} alt="hamburger" />
      </HamburgerButton>
      <MobileMenuWrapper
        menuShowed={showMobileMenu}>
        {links.map(link => (
          <StyledLink
            dropdown={link.dropdown}
            menuShowed={showMobileMenu}
            name={link.name}
            onClick={() => setMobileMenu(false)}
            key={link.path}
            to={link.path} />
        ))}
      </MobileMenuWrapper>
    </HeaderWrapper>
  )
}

export default Header;
