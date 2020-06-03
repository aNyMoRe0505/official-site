import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { useAnimation } from '../helper/hooks';

const FadeInAnimationWrap = styled.div`
  width: 100%;
  transform: translateX(100px);
  opacity: 0;
  transition-property: transform, opacity;
  transition-timing-function: ease;
  transition-duration: 1s;
  ${({ actived }) => actived && css`
    transform: translateX(0px);
    opacity: 1;
  `};
`;

function FadeInBlock({ children, defaultStatus }) {
  const [ref, actived] = useAnimation();

  return (
    <FadeInAnimationWrap actived={defaultStatus || actived} ref={ref}>
      {children}
    </FadeInAnimationWrap>
  );
}

FadeInBlock.propTypes = {
  children: PropTypes.node.isRequired,
  defaultStatus: PropTypes.bool,
};

FadeInBlock.defaultProps = {
  defaultStatus: false,
};

export default FadeInBlock;
