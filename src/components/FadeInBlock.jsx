import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { useScrollAnimation } from '../helper/hooks';

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

function FadeInBlock({ children }) {
  const [ref, actived] = useScrollAnimation();
  return (
    <FadeInAnimationWrap actived={actived} ref={ref}>
      {children}
    </FadeInAnimationWrap>
  );
}

FadeInBlock.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FadeInBlock;
