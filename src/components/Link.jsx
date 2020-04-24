import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

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
  transition-property: background-color, font-size;
  transition-timing-function: ease-in-out;
  :hover {
    background-color: #b75e5e;
    color: white;
    font-size: 18px;
  }
`;

const DropdownWrappedLink = styled(WrappedLink)`
  :hover {
    background-color: rgb(234, 79, 79);
    color: white;
    font-size: 18px;
  }
`;

const MobileDropdownWrappedLink = styled(WrappedLink)`
  font-size: 12px;
  :hover {
    background-color: rgb(234, 79, 79);
    color: white;
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
  }
`;

function Link({
  onClick,
  to,
  name,
  dropdown,
  className,
}) {
  return (
    <Wrapper>
      <WrappedLink
        className={className}
        onClick={() => {
          if (onClick) onClick();
        }}
        exact={!dropdown.length}
        activeStyle={{
          backgroundColor: '#b75e5e',
          fontSize: 18,
          color: 'white',
        }}
        to={to}
      >
        {name}
      </WrappedLink>
      {dropdown.length ? (
        <>
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
                  backgroundColor: 'rgb(234, 79, 79)',
                  fontSize: 14,
                  color: 'white',
                }}
                to={`${to}${dropdownLink.path}`}
              >
                {dropdownLink.name}
              </MobileDropdownWrappedLink>
            ))}
          </MobileDropdownWrapper>
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
                  backgroundColor: 'rgb(234, 79, 79)',
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
