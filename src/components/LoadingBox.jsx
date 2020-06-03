import React, { memo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import PropTypes from 'prop-types';

const scale = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
`;

const AnimationStyle = css`
  animation: ${scale} 1s linear infinite;
`;

const StyledLoadingBox = styled.div`
  width: 200px;
  height: ${({ loadingStatus }) => (loadingStatus ? '60px' : 0)};
  margin: 10px;
  background-color: white;
  box-shadow: 0px 0px 25px #80808078;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  opacity: ${({ loadingStatus }) => (loadingStatus ? 1 : 0)};
  transition-duration: 0.3s;
  transition-property: opacity, height;
  transition-timing-function: ease-in-out;
  ${({ loadingStatus }) => loadingStatus && AnimationStyle}
`;

function LoadingBox({
  loadingStatus,
}) {
  return (
    <StyledLoadingBox loadingStatus={loadingStatus}>
      Loading..
    </StyledLoadingBox>
  );
}

LoadingBox.propTypes = {
  loadingStatus: PropTypes.bool,
};

LoadingBox.defaultProps = {
  loadingStatus: false,
};

export default memo(LoadingBox);
