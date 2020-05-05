import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { metaConverter } from '../../helper/article';

const StyledText = styled.p`
  margin: 30px 0 0;
  font-size: 18px;
  line-height: 1.6;
  font-weight: ${({ strong }) => (strong ? '400' : '300')};
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
  return (
    <StyledText className={className} strong={strong}>
      {metaConverter(meta, children)}
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