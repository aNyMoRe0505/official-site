import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SubTitle from './SubTitle';
import Text from './Text';

const TextWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 10px 0 0;
  width: 100%;
`;

const Number = styled(Text)`
  width: auto;
  margin: 0 5px 0 0;
`;

const SmallMarginText = styled(Text)`
  margin: 0;
  flex: 1;
`;

function Reference({
  list,
}) {
  return (
    <>
      <SubTitle strong>
        參考資料
      </SubTitle>
      {list.map((i, index) => (
        <TextWrap key={i.text}>
          <Number>{`${index + 1}.`}</Number>
          <SmallMarginText
            meta={i.meta || []}
          >
            {i.text}
          </SmallMarginText>
        </TextWrap>
      ))}
    </>
  );
}

Reference.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Reference;
