import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { fromEvent } from 'rxjs';
import { map, takeUntil, concatAll } from 'rxjs/operators';


const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const DragBlock = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Title = styled.h1`
  margin: 0 0 10px 0;
`;

const DragedBox = styled.div`
  width: 250px;
  height: 150px;
  background-color: #282c35;
  border-radius: 5px;
  position: absolute;
  transform: translate(0px, 60px);
`;

function RxJS() {
  const dragBox = useRef();

  useEffect(() => {
    const { body } = document;
    const mouseDown = fromEvent(dragBox.current, 'mousedown');
    const mouseMove = fromEvent(body, 'mousemove');
    const mouseUp = fromEvent(body, 'mouseup');

    let initialX = 0;
    let initialY = 0;
    let originX = 0;
    let originY = 0;

    mouseDown.subscribe((event) => {
      const { x, y } = dragBox.current.getBoundingClientRect();
      originX = x - 25;
      originY = y - 155 + 60;
      initialX = event.clientX;
      initialY = event.clientY;
    });

    mouseDown.pipe(
      map(() => mouseMove.pipe(
        takeUntil(mouseUp),
      )),
      concatAll(),
      map((event) => ({
        offsetX: event.clientX - initialX,
        offsetY: event.clientY - initialY,
      })),
    ).subscribe(({ offsetX, offsetY }) => {
      dragBox.current.style.transform = `translate(${originX + offsetX}px, ${originY + offsetY}px)`;
    });
  }, []);

  return (
    <Wrapper>
      <DragBlock>
        <Title>拖拉</Title>
        <DragedBox ref={dragBox} />
      </DragBlock>
    </Wrapper>
  );
}

export default RxJS;
