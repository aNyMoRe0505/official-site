import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from '../config/style';

const Wrapper = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  @media (min-width: 768px) {
    :hover {
    >div {
      opacity: 1;
      pointer-events: auto;
    }
  }
  }
`;

const WrappedLink = styled(NavLink)`
  margin: 0 10px;
  padding: 0 20px;
  height: 40px;
  font-size: 16px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  text-decoration: none;
  transition-duration: 0.3s;
  transition-property: background-color, font-size, color;
  transition-timing-function: ease-in-out;
  :hover {
    background-color: ${styles.mainColor};
    color: white;
    font-size: 18px;
  }
`;

const DropdownWrappedLink = styled(WrappedLink)`
  :hover {
    background-color: ${styles.mainRed};
  }
`;

const MobileDropdownWrappedLink = styled(WrappedLink)`
  font-size: 12px;
  :hover {
    background-color: ${styles.mainRed};
    font-size: 14px;
  }
`;

const DropdownWrapper = styled.div`
  display: flex;
  opacity: 0;
  pointer-events: none;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 15px;
  background-color: white;
  width: 250px;
  position: absolute;
  top: 43px;
  right: 0;
  border-radius: 10px;
  box-shadow: 0px 0px 25px #80808078;
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  z-index: 999;
`;

const DropdownSpaceLine = styled.div`
  pointer-events: none;
  width: 100%;
  height: 3px;
  top: 40px;
  position: absolute;
  opacity: 0;
`;

const MobileDropdownWrapper = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: -15px 0 0 0;
  }
`;

export const MobileDropdownBtn = styled.button`
  display: none;
  @media (max-width: 768px) {
    display: block;
    width: 20px;
    height: 20px;
    border: none;
    outline: none;
    cursor: pointer;
    background-color: transparent;
    padding: 0;
    margin: 0 10px;
    :hover {
      opacity: 0.8
    };
    transform: ${({ status }) => (status ? 'rotate(135deg)' : 'rotate(0deg)')};
    transition-duration: 0.3s;
    transition-property: transform;
    transition-timing-function: ease-in-out;
    position: absolute;
    top: 10px;
    right: -26px;
  }
`;

function Link({
  onClick,
  to,
  name,
  exact,
  dropdown,
  className,
}) {
  const [openMobileDropdown, setMobileDropdown] = useState(false);

  return (
    <Wrapper>
      <WrappedLink
        exact={exact}
        className={className}
        onClick={() => {
          if (onClick) onClick();
          if (dropdown.length) setMobileDropdown(true);
        }}
        activeStyle={{
          backgroundColor: styles.mainColor,
          fontSize: 18,
          color: 'white',
        }}
        to={to}
      >
        {name}
      </WrappedLink>
      {dropdown.length ? (
        <>
          <MobileDropdownBtn
            status={openMobileDropdown}
            onClick={() => setMobileDropdown(!openMobileDropdown)}
          >
            <img style={{ width: '100%' }} alt="plus" src="https://img.icons8.com/ios/80/000000/plus.png" />
          </MobileDropdownBtn>
          {openMobileDropdown && (
            <MobileDropdownWrapper>
              {dropdown.map((dropdownLink, index) => (
                <MobileDropdownWrappedLink
                  key={`mobile-${dropdownLink.path}`}
                  onClick={() => {
                    if (onClick) onClick();
                  }}
                  exact
                  style={{
                    margin: index + 1 === dropdown.length ? '5px 0px 15px' : '5px 0px 0px',
                  }}
                  activeStyle={{
                    backgroundColor: styles.mainRed,
                    fontSize: 14,
                    color: 'white',
                  }}
                  to={`${to}${dropdownLink.path}`}
                >
                  {dropdownLink.name}
                </MobileDropdownWrappedLink>
              ))}
            </MobileDropdownWrapper>
          )}
          <DropdownSpaceLine />
          <DropdownWrapper>
            {dropdown.map((dropdownLink) => (
              <DropdownWrappedLink
                onClick={() => {
                  if (onClick) onClick();
                }}
                exact
                style={{ margin: '10px 0px' }}
                activeStyle={{
                  backgroundColor: styles.mainRed,
                  fontSize: 18,
                  color: 'white',
                }}
                key={`desktop-${dropdownLink.path}`}
                to={`${to}${dropdownLink.path}`}
              >
                {dropdownLink.name}
              </DropdownWrappedLink>
            ))}
          </DropdownWrapper>
        </>
      ) : null}
    </Wrapper>
  );
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  dropdown: PropTypes.arrayOf(PropTypes.shape({})),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Link.defaultProps = {
  dropdown: [],
  className: '',
  onClick: null,
};

export default Link;
