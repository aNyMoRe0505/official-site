/* eslint-disable prefer-destructuring */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { fromEvent } from 'rxjs';
import {
  filter,
  flatMap,
  takeUntil,
  withLatestFrom,
  tap,
} from 'rxjs/operators';

const Title = styled.h1`
  margin: 0 0 10px 0;
`;

const YouKuExampleWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 130px 0 0;
  height: 2000px;
`;

const VideoWrapper = styled.div`
  width: 100%;
  height: 360px;
  background-color: transparent;
`;

const VideoFixedStyle = css`
  position: fixed;
  right: 30px;
  bottom: 40px;
  width: 450px;
  height: 253px;
`;

const Video = styled.video`
  width: 640px;
  height: 360px;
  ${({ videoFixed }) => videoFixed && VideoFixedStyle}
`;

const valueValidator = (value, max, min) => Math.min(Math.max(value, min), max);

function YouKu() {
  const [videoFixed, setVideoFixed] = useState(false);
  const videoWrapRef = useRef();
  const videoRef = useRef();
  const refVideoFixedStatus = useRef(videoFixed);

  useEffect(() => {
    refVideoFixedStatus.current = videoFixed;
  }, [videoFixed]);

  useEffect(() => {
    const scroll = fromEvent(window, 'scroll');
    const scrollSubscriber = scroll.subscribe(() => {
      const { bottom } = videoWrapRef.current.getBoundingClientRect();
      if (bottom < 0) {
        setVideoFixed(true);
        videoRef.current.style.cursor = 'grab';
      } else {
        setVideoFixed(false);
        videoRef.current.style.cursor = 'default';
      }
    });

    const mouseDown = fromEvent(videoRef.current, 'mousedown');
    const mouseMove = fromEvent(window, 'mousemove');
    const mouseUp = fromEvent(window, 'mouseup');
    let originBottom = 0;
    let originRight = 0;

    const mouseDownSubscriber = mouseDown.pipe(
      filter(() => refVideoFixedStatus.current),
      tap(() => {
        originBottom = window.innerHeight - videoRef.current.getBoundingClientRect().bottom;
        originRight = window.innerWidth - videoRef.current.getBoundingClientRect().right;
        videoRef.current.style.cursor = 'grabbing';
      }),
      flatMap(() => mouseMove.pipe(
        takeUntil(mouseUp.pipe(
          tap(() => {
            videoRef.current.style.cursor = 'grab';
          }),
        )),
      )),
      withLatestFrom(mouseDown, (moveEvent, downEvent) => ({
        offsetX: moveEvent.clientX - downEvent.clientX,
        offsetY: moveEvent.clientY - downEvent.clientY,
      })),
    ).subscribe(({ offsetX, offsetY }) => {
      const rightMax = window.innerWidth - 450;
      const bottomMax = window.innerHeight - 253;
      const right = originRight - offsetX;
      const bottom = originBottom - offsetY;

      videoRef.current.style.right = `${valueValidator(right, rightMax, 0)}px`;
      videoRef.current.style.bottom = `${valueValidator(bottom, bottomMax, 0)}px`;
    });

    return () => {
      scrollSubscriber.unsubscribe();
      mouseDownSubscriber.unsubscribe();
    };
  }, []);

  return (
    <YouKuExampleWrap>
      <Title>優酷影片feature</Title>
      <VideoWrapper ref={videoWrapRef}>
        <Video videoFixed={videoFixed} ref={videoRef} controls>
          <source
            src="http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_stereo.ogg"
            type="video/ogg"
          />
        </Video>
      </VideoWrapper>
    </YouKuExampleWrap>
  );
}

export default YouKu;
