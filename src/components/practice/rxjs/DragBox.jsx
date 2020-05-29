/* eslint-disable no-param-reassign */
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { fromEvent } from 'rxjs';
import {
  flatMap,
  takeUntil,
  withLatestFrom,
  tap,
  delay,
} from 'rxjs/operators';

const Wrapper = styled.div`
  width: 100%;
  margin: 20px 0 0;
  position: relative;
`;

const Box = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 5px;
  background-color: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 18px;
  position: absolute;
  cursor: grab;
  top: 0;
  left: 0;
  transform: translate(0px, 0px);
  z-index: ${({ zIndex }) => zIndex};
`;

const boxArray = ['red', 'orange', 'yellow', 'green', 'blue', 'black', 'gray'];

function DragBox() {
  const firstRef = useRef();

  useEffect(() => {
    const { x: rectX, y: rectY } = firstRef.current.getBoundingClientRect();
    const allDragBox = document.getElementsByClassName('dragBox');

    const mouseDown = fromEvent(allDragBox[0], 'mousedown');
    const mouseMove = fromEvent(window, 'mousemove');
    const mouseUp = fromEvent(window, 'mouseup');

    const mouseDownEvent = mouseDown.pipe(
      tap(() => {
        allDragBox[0].style.cursor = 'grabbing';
      }),
      flatMap(() => mouseMove.pipe(
        takeUntil(mouseUp.pipe(
          tap(() => {
            allDragBox[0].style.cursor = 'grab';
          }),
        )),
      )),
      withLatestFrom(mouseDown, (moveEvent, downEvent) => ({
        x: moveEvent.clientX - downEvent.offsetX - rectX,
        y: moveEvent.clientY - downEvent.offsetY - rectY,
      })),
    );

    const subscribedEvent = [];

    Array.from(allDragBox).forEach((element, index) => {
      const event = mouseDownEvent.pipe(
        delay(0 + 100 * index),
      ).subscribe(({ x, y }) => {
        element.style.transform = `translate(${x}px, ${y}px)`;
      });
      subscribedEvent.push(event);
    });

    return () => {
      subscribedEvent.forEach((event) => {
        event.unsubscribe();
      });
    };
  }, []);

  return (
    <Wrapper>
      {boxArray.map((color, index) => (
        <Box
          color={color}
          ref={(index === 0 && firstRef) || null}
          className="dragBox"
          zIndex={boxArray.length - index}
          key={`dragBox-${index + 1}`}
        >
          Drag Me
        </Box>
      ))}
    </Wrapper>
  );
}

export default DragBox;
