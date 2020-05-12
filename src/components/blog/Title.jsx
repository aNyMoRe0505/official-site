import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { DarkModeContext } from '../../config/context';

const StyledTitle = styled.h1`
  width: 100%;
  text-align: start;
  font-size: 30px;
  margin: 30px 0 0;
  line-height: 1.6;
  font-weight: ${({ strong }) => (strong ? '500' : '300')};
  color: ${({ darkMode }) => (darkMode && 'white') || 'black'};
  transition-duration: 0.2s;
  transition-property: color;
  transition-timing-function: ease;
  @media (max-width: 768px) {
    font-size: 27px;
    margin: 15px 0 0;
  };
`;

function Title({
  children,
  strong,
}) {
  const darkMode = useContext(DarkModeContext);

  return (
    <StyledTitle darkMode={darkMode} strong={strong}>
      {children}
    </StyledTitle>
  );
}

Title.propTypes = {
  children: PropTypes.string.isRequired,
  strong: PropTypes.bool,
};

Title.defaultProps = {
  strong: false,
};

export default Title;
