import React from 'react';
import styled from 'styled-components';

import YouKu from '../../components/practice/rxjs/YouKu';
import DragBox from '../../components/practice/rxjs/DragBox';
import AutoComplete from '../../components/practice/rxjs/AutoComplete';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

function RxJS() {
  return (
    <Wrapper>
      <AutoComplete />
      <DragBox />
      <YouKu />
    </Wrapper>
  );
}

export default RxJS;
