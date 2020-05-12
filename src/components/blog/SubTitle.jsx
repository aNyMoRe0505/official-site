import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { DarkModeContext } from '../../config/context';

const StyledSubTitle = styled.h1`
  width: 100%;
  text-align: start;
  font-size: 25px;
  margin: 30px 0 0;
  line-height: 1.6;
  font-weight: ${({ strong }) => (strong ? '500' : '300')};
  color: ${({ darkMode }) => (darkMode && 'white') || 'black'};
  transition-duration: 0.2s;
  transition-property: color;
  transition-timing-function: ease;
  @media (max-width: 768px) {
    font-size: 22px;
    margin: 15px 0 0;
  };
`;

function SubTitle({
  children,
  strong,
}) {
  const darkMode = useContext(DarkModeContext);

  return (
    <StyledSubTitle darkMode={darkMode} strong={strong}>
      {children}
    </StyledSubTitle>
  );
}

SubTitle.propTypes = {
  children: PropTypes.string.isRequired,
  strong: PropTypes.bool,
};

SubTitle.defaultProps = {
  strong: false,
};

export default SubTitle;
