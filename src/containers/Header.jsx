import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

import hamburger from '../static/hamburger.png';

import Link from '../components/Link';

const StyledLink = styled(Link)`
  @media (max-width: 768px) {
    margin-bottom: ${({ dropdown }) => (dropdown.length ? '0px' : '15px')};
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
  position: fixed;
  top: ${({ hiding }) => (hiding && '-70px') || 0};
  pointer-events: ${({ hiding }) => (hiding && 'none') || 'auto'};
  z-index: 999;
  transition-property: top;
  transition-duration: 0.5s;
  transition-timing-function: ease;
`;

const LogoLink = styled(RouterLink)`
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
  @media (max-width: 768px) {
    display: none;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  @media (max-width: 768px) {
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
    transform: ${({ menuShowed }) => (menuShowed ? 'rotate(90deg)' : 'rotate(0deg)')};
    transition-duration: 0.3s;
    transition-property: transform;
    transition-timing-function: linear;
  }
`;

const MobileMenuWrapper = styled.div`
  display: none;
  @media (max-width: 768px) {
    width: 100%;
    height: calc(100vh - 70px);
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background-color: white;
    position: fixed;
    top: 70px;
    opacity: ${({ menuShowed }) => (menuShowed ? 1 : 0)};
    right: ${({ menuShowed }) => (menuShowed ? 0 : '-100%')};
    transition-duration: 0.3s;
    transition-property: right, opacity;
    transition-timing-function: ease-in-out;
    overflow: auto;
    z-index: 999;
  }
`;

const links = [{
  path: '/',
  name: 'About',
  exact: true,
  dropdown: [],
}, {
  path: '/blog',
  name: 'Blog',
  exact: false,
  dropdown: [],
}, {
  path: '/archives',
  name: 'Archives',
  exact: true,
  dropdown: [],
}, {
  path: '/practice',
  name: 'Practice',
  exact: false,
  dropdown: [{
    path: '/calendar',
    name: 'Calendar',
  }, {
    path: '/youtube',
    name: 'Youtube',
  }, {
    path: '/hook-form',
    name: 'Hook Form',
  }, {
    path: '/indexTool',
    name: 'Index Tool',
  }, {
    path: '/slide',
    name: 'Slide',
  }, {
    path: '/notification',
    name: 'Notification',
  }, {
    path: '/rxjs',
    name: 'RxJS',
  }],
}, {
  path: '/heyhey',
  name: '???',
  exact: true,
  dropdown: [],
}];

function Header() {
  const [showMobileMenu, setMobileMenu] = useState(false);
  const [headerHiding, setHeaderHiding] = useState(false);

  useEffect(() => {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

    const scrolling = () => {
      const currentScrollTop = document.documentElement.scrollTop || document.body.scrollTop;

      if (Math.abs(currentScrollTop - scrollTop) > 200) {
        if (currentScrollTop > scrollTop) {
          setHeaderHiding(true);
        } else {
          setHeaderHiding(false);
        }
        scrollTop = currentScrollTop;
      }
    };

    window.addEventListener('scroll', scrolling);

    return () => window.removeEventListener('scroll', scrolling);
  }, []);

  return (
    <HeaderWrapper hiding={headerHiding}>
      <LogoLink onClick={() => setMobileMenu(false)} to="/">
        <Logo src="https://img.icons8.com/ios/100/000000/circled-p.png" alt="logo" />
      </LogoLink>
      <LinkWrapper>
        {links.map((link) => (
          <StyledLink
            exact={link.exact}
            dropdown={link.dropdown}
            name={link.name}
            key={link.path}
            to={link.path}
          />
        ))}
      </LinkWrapper>
      <HamburgerButton
        menuShowed={showMobileMenu}
        onClick={() => setMobileMenu(!showMobileMenu)}
        type="button"
      >
        <Logo src={hamburger} alt="hamburger" />
      </HamburgerButton>
      <MobileMenuWrapper
        menuShowed={showMobileMenu}
      >
        {links.map((link) => (
          <StyledLink
            exact={link.exact}
            dropdown={link.dropdown}
            name={link.name}
            onClick={() => setMobileMenu(false)}
            key={`mobile-${link.path}`}
            to={link.path}
          />
        ))}
      </MobileMenuWrapper>
    </HeaderWrapper>
  );
}

export default Header;
