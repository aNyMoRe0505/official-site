import React, { useEffect, useRef, memo } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ImgWrapper = styled.div`
  width: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin: 30px 0 0;
  border: 1px solid black;
  @media (max-width: 768px) {
    margin: 15px 0 0;
  };
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

const MagnifierBlock = styled.div`
  position: absolute;
  width: 100px;
  height: 100px;
  border: 1px solid gray;
  background-color: #80808066;
  top: 0;
  left: 0;
  display: none;
`;

const ResultWrapper = styled.div`
  display: none;
  width: 200px;
  height: 200px;
  border-radius: 100%;
  position: absolute;
  overflow: hidden;
  border: 1px solid black;
  top: 0;
  left: 380px;
`;

const ResultImg = styled.img`
  width: 700px;
  position: absolute;
  top: 0;
  left: 0;
`;

function ProductMagnifier({
  blockMode,
}) {
  const oriImgWrapRef = useRef();
  const resultWrapRef = useRef();
  const resultImgRef = useRef();
  const blockRef = useRef();

  useEffect(() => {
    const oriWrapperElement = oriImgWrapRef.current;
    const resultWrapElement = resultWrapRef.current;
    const resultImgElement = resultImgRef.current;
    const blockElement = blockRef.current;

    const mouseLeave = () => {
      resultWrapElement.style.display = 'none';
      blockElement.style.display = 'none';
    };

    const mouseMove = (event) => {
      resultWrapElement.style.display = 'block';

      const rect = oriWrapperElement.getBoundingClientRect();

      const left = event.clientX - rect.left;
      const top = event.clientY - rect.top;

      if (
        left < 0
        || left > rect.width
        || top < 0
        || top > rect.height
      ) {
        mouseLeave();
        return;
      }

      let blockLeft = left - 50;
      let blockTop = top - 50;

      if (blockMode) {
        blockLeft = Math.min(rect.width - 102, Math.max(0, blockLeft));
        blockTop = Math.min(rect.height - 102, Math.max(0, blockTop));

        blockElement.style.display = 'block';
        blockElement.style.left = `${blockLeft}px`;
        blockElement.style.top = `${blockTop}px`;
      } else {
        resultWrapElement.style.left = `${left - 100}px`;
        resultWrapElement.style.top = `${top - 100}px`;
      }

      const percentLeft = blockLeft / rect.width;
      const percentTop = blockTop / rect.height;

      resultImgElement.style.left = `${0 - percentLeft * resultImgElement.width}px`;
      resultImgElement.style.top = `${0 - percentTop * resultImgElement.height}px`;
    };

    oriWrapperElement.addEventListener('mousemove', mouseMove);
    oriWrapperElement.addEventListener('mouseleave', mouseLeave);

    return () => {
      oriWrapperElement.removeEventListener('mouseenter', mouseMove);
      oriWrapperElement.removeEventListener('mouseleave', mouseLeave);
    };
  }, [blockMode]);

  return (
    <ImgWrapper ref={oriImgWrapRef}>
      <MagnifierBlock ref={blockRef} />
      <Img src="https://autos.yahoo.com.tw/p/r/w644/bike-trim/March2019/c81054f52c893134912033056beba46c.jpeg" />
      <ResultWrapper ref={resultWrapRef}>
        <ResultImg src="https://autos.yahoo.com.tw/p/r/w644/bike-trim/March2019/c81054f52c893134912033056beba46c.jpeg" ref={resultImgRef} />
      </ResultWrapper>
    </ImgWrapper>
  );
}

ProductMagnifier.propTypes = {
  blockMode: PropTypes.bool,
};

ProductMagnifier.defaultProps = {
  blockMode: false,
};

export default memo(ProductMagnifier);
