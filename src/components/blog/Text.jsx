import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { DarkModeContext } from '../../config/context';
import { metaConverter } from '../../helper/article';

const StyledText = styled.p`
  width: 100%;
  text-align: start;
  margin: 30px 0 0;
  font-size: 18px;
  line-height: 1.6;
  font-weight: ${({ strong }) => (strong ? '500' : '300')};
  color: ${({ darkMode }) => (darkMode && 'white') || 'black'};
  transition-duration: 0.2s;
  transition-property: color;
  transition-timing-function: ease;
  @media (max-width: 768px) {
    font-size: 15px;
    margin: 15px 0 0;
  };
`;

function Text({
  children,
  strong,
  meta,
  className,
}) {
  const darkMode = useContext(DarkModeContext);

  return (
    <StyledText darkMode={darkMode} className={className} strong={strong}>
      {metaConverter(meta, children, darkMode)}
    </StyledText>
  );
}

Text.propTypes = {
  children: PropTypes.string.isRequired,
  strong: PropTypes.bool,
  meta: PropTypes.arrayOf(PropTypes.shape({})),
  className: PropTypes.string,
};

Text.defaultProps = {
  className: '',
  strong: false,
  meta: [],
};

export default Text;
