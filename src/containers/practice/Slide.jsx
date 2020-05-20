/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

import Button from '../../components/Button';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SlideWrapper = styled.div`
  width: 100%;
  max-width: 1210px;
  height: 240px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
`;

const Block = styled.div`
  width: ${({ width }) => width}px;
  height: 240px;
  position: absolute;
  color: white;
  font-size: 60px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #282c35;
  transform: ${({ translateXValue }) => `translateX(${translateXValue}px)`};
  transition-duration: 0.5s;
  transition-property: transform;
  transition-timing-function: ease-in-out;
`;

const PrevStyle = css`
  left: 0px;
`;
const NextStyle = css`
  right: 0px;
`;

const ArrowBtn = styled(Button)`
  width: 25px;
  height: 25px;
  border-radius: 100%;
  font-size: 12px;
  position: absolute;
  z-index: 990;
  ${({ isNext }) => (isNext && NextStyle) || PrevStyle}
`;

const DotWrapper = styled.div`
  margin: 5px 0 0 ;
`;

const Dot = styled.button`
  padding: 0;
  margin: 0 5px;
  width: 10px;
  height: 10px;
  cursor: pointer;
  border: none;
  outline: none;
  border-radius: 100%;
  background-color: ${({ isCurrent }) => (isCurrent() && 'black') || 'gray'};
  :hover {
    opacity: 0.8;
  };
`;

const FunctionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0 0;
`;

const SettingWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0 0;
`;

const Input = styled.input`
  width: 40px;
  font-size: 16px;
  height: 40px;
  outline: none;
  border-radius: 5px;
  border-width: 1px;
`;

const slideToShowDecider = (width) => {
  if (width > 768) return 3;
  if (width <= 768 && width > 414) return 2;
  return 1;
};

const defaultGap = 5;
const defaultBlockArray = Array.from(new Array(10));

function Slide() {
  const [slideToShow, setSlideToShow] = useState(slideToShowDecider(document.body.clientWidth || document.documentElement.clientWidth));
  const [currentIndex, setIndex] = useState(0);
  const sliderRef = useRef();
  const [rect, setRect] = useState({});
  const [gap, setGap] = useState(defaultGap);
  const [blockArray, setBlockArray] = useState(defaultBlockArray);

  useEffect(() => {
    setRect(sliderRef.current.getBoundingClientRect());
    const resizing = () => {
      setIndex(0);
      const clientWidth = document.body.clientWidth || document.documentElement.clientWidth;
      const showValue = slideToShowDecider(clientWidth);
      setSlideToShow(showValue);
      setRect(sliderRef.current.getBoundingClientRect());
    };

    window.addEventListener('resize', resizing);
    return () => window.removeEventListener('resize', resizing);
  }, []);

  const sliderWrapperWidth = rect.width || 0;
  const blockWidth = (sliderWrapperWidth - gap * (slideToShow - 1)) / slideToShow;

  return (
    <Wrapper>
      <SlideWrapper ref={sliderRef} slideToShow={slideToShow}>
        {sliderWrapperWidth && (
          <>
            <ArrowBtn
              disabled={currentIndex - slideToShow < 0}
              onClick={() => {
                const currentShowNum = currentIndex + slideToShow;
                if (currentShowNum % slideToShow !== 0) {
                  setIndex(currentIndex - (currentShowNum % slideToShow));
                  return;
                }
                setIndex(currentIndex - slideToShow);
              }}
              label="＜"
            />
            {blockArray.map((_, index) => (
              <Block
                width={blockWidth}
                translateXValue={(index - currentIndex) * (blockWidth + gap)}
                key={`block-${index}`}
              >
                {index + 1}
              </Block>
            ))}
            <ArrowBtn
              disabled={currentIndex + slideToShow >= blockArray.length}
              onClick={() => {
                const nextShowNum = currentIndex + slideToShow * 2;
                if (nextShowNum > blockArray.length) {
                  // 多顯示幾張扣回去
                  setIndex(currentIndex + slideToShow - (nextShowNum - blockArray.length));
                  return;
                }
                setIndex(currentIndex + slideToShow);
              }}
              isNext
              label="＞"
            />
          </>
        )}
      </SlideWrapper>
      <DotWrapper>
        {blockArray.length > slideToShow && Array.from(new Array(Math.ceil(blockArray.length / slideToShow))).map((_, index) => (
          <Dot
            onClick={() => {
              const indexTotalShowNum = index * slideToShow + slideToShow;
              if (indexTotalShowNum > blockArray.length) {
                setIndex(index * slideToShow - (indexTotalShowNum - blockArray.length));
                return;
              }
              setIndex(index * slideToShow);
            }}
            isCurrent={() => {
              const indexTotalShowNum = index * slideToShow + slideToShow;
              if (indexTotalShowNum > blockArray.length) {
                return currentIndex === index * slideToShow - (indexTotalShowNum - blockArray.length);
              }
              return index * slideToShow === currentIndex;
            }}
            type="button"
            key={`Dot-${index}`}
          />
        ))}
      </DotWrapper>
      <FunctionWrapper>
        <SettingWrap>
          <Input
            min="0"
            type="number"
            id="slideGap"
            defaultValue={gap}
          />
          <Button
            onClick={() => {
              const { value } = document.getElementById('slideGap');
              setGap(parseInt(value, 10));
            }}
            label="更新間距"
            type="button"
          />
        </SettingWrap>
        <SettingWrap>
          <Button
            onClick={() => {
              const newArray = Array.from(new Array(blockArray.length + 1));
              setBlockArray(newArray);
              setIndex(0);
            }}
            label="增加BLOCK"
            type="button"
          />
          <Button
            disabled={blockArray.length <= slideToShow}
            onClick={() => {
              const newArray = Array.from(new Array(blockArray.length - 1));
              setBlockArray(newArray);
              setIndex(0);
            }}
            label="減少BLOCK"
            type="button"
          />
        </SettingWrap>
      </FunctionWrapper>
    </Wrapper>
  );
}

export default Slide;
