import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const activedStyle = css`
  opacity: 1;
  pointer-events: auto;
`;

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #06060675;
  z-index: 999;
  opacity: 0;
  pointer-events: none;
  transition-property: opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  ${({ actived }) => actived && activedStyle};
`;

const Outer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 997;
`;

const Box = styled.div`
  width: 500px;
  min-height: 250px;
  max-height: 500px;
  padding: 25px;
  border-radius: 5px;
  background-color: white;
  position: relative;
  overflow: auto;
  z-index: 998;
`;

function LightBox({ children, actived, close }) {
  useEffect(() => {
    if (actived) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [actived]);

  return (
    <Wrapper actived={actived}>
      <Box>
        {children}
      </Box>
      <Outer onClick={close} />
    </Wrapper>
  );
}

LightBox.propTypes = {
  children: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
  actived: PropTypes.bool.isRequired,
};

export default LightBox;
