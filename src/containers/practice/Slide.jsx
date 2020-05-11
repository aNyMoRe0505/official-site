/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

import Button from '../../components/Button';

const imagesArray = [
  'https://i.imgur.com/4AiXzf8.jpg',
  'https://i.imgur.com/Jvh1OQm.jpg',
  'https://i.imgur.com/pqggrK0.jpg',
  'https://i.imgur.com/pIUsuyE.jpg',
  'https://i.imgur.com/lVlPvCB.gif',
  'https://i.imgur.com/0LINzxs.jpeg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/6/66/An_up-close_picture_of_a_curious_male_domestic_shorthair_tabby_cat.jpg',
  'https://nenow.in/wp-content/uploads/2020/04/cat-image-2-600x375.jpg',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ0cAAuK4C4v8g58Wv_KbdNnxWY3V5tO_ZHCw2fmDf10gmeIJTt&usqp=CAU',
];

// const IMAGE_WIDTH = 200;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SlideWrapper = styled.div`
  width: 100%;
  max-width: 615px;
  height: 200px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  position: absolute;
  transform: ${({ translateXValue }) => `translateX(${translateXValue}px)`};
  transition-duration: 0.5s;
  transition-property: transform;
  transition-timing-function: ease-in-out;
  ${({ customStyle }) => customStyle && customStyle}
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
  z-index: 999;
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

const slideToShowDecider = (width) => {
  if (width >= 768) return 3;
  if (width < 768 && width > 414) return 2;
  return 1;
};

// TODO
// touch drag event, infinite scroll..

function Slide() {
  const [slideToShow, setSlideToShow] = useState(slideToShowDecider(document.body.clientWidth || document.documentElement.clientWidth));
  const [currentIndex, setIndex] = useState(0);
  const slideWrapperRef = useRef();
  const [slideRect, setSlideRect] = useState();

  useEffect(() => {
    setSlideRect(slideWrapperRef.current.getBoundingClientRect());

    const resizing = () => {
      setIndex(0);
      const clientWidth = document.body.clientWidth || document.documentElement.clientWidth;
      const showValue = slideToShowDecider(clientWidth);
      setSlideToShow(showValue);
      setSlideRect(slideWrapperRef.current.getBoundingClientRect());
    };

    window.addEventListener('resize', resizing);
    return () => window.removeEventListener('resize', resizing);
  }, []);

  const slideWidth = slideRect?.width ?? 0;

  return (
    <Wrapper>
      <SlideWrapper ref={slideWrapperRef} slideToShow={slideToShow}>
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
        {imagesArray.map((image, index) => (
          <Image
            customStyle={css`
              @media (max-width: 768px) {
                width: ${`${slideWidth / 2}px`};
              };
              @media (max-width: 414px) {
                width: ${`${slideWidth}px`};
              };
            `}
            translateXValue={(index - currentIndex) * ((slideWidth / slideToShow) + 5)}
            key={`${image}-${index}`}
            src={image}
          />
        ))}
        <ArrowBtn
          disabled={currentIndex + slideToShow >= imagesArray.length}
          onClick={() => {
            const nextShowNum = currentIndex + slideToShow * 2;
            if (nextShowNum > imagesArray.length) {
              // 多顯示幾張扣回去
              setIndex(currentIndex + slideToShow - (nextShowNum - imagesArray.length));
              return;
            }
            setIndex(currentIndex + slideToShow);
          }}
          isNext
          label="＞"
        />
      </SlideWrapper>
      <DotWrapper>
        {Array.from(new Array(Math.ceil(imagesArray.length / slideToShow))).map((_, index) => (
          <Dot
            onClick={() => {
              const indexTotalShowNum = index * slideToShow + slideToShow;
              if (indexTotalShowNum > imagesArray.length) {
                setIndex(index * slideToShow - (indexTotalShowNum - imagesArray.length));
                return;
              }
              setIndex(index * slideToShow);
            }}
            isCurrent={() => {
              const indexTotalShowNum = index * slideToShow + slideToShow;
              if (indexTotalShowNum > imagesArray.length) {
                return currentIndex === index * slideToShow - (indexTotalShowNum - imagesArray.length);
              }
              return index * slideToShow === currentIndex;
            }}
            type="button"
            key={`Dot-${index}`}
          />
        ))}
      </DotWrapper>
    </Wrapper>
  );
}

export default Slide;
