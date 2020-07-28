import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SubTitle from './SubTitle';
import Text from './Text';

import { ARTICLE_META_TYPE } from '../../helper/article';

const Wrapper = styled.div`
  width: 100%;
  margin: 30px 0 0;
  @media (max-width: 768px) {
    margin: 15px 0 0;
  };
`;

const TextWrap = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 10px 0 0;
  width: 100%;
`;

const Title = styled(SubTitle)`
  margin: 0;
`;

const NumberDot = styled(Text)`
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
    <Wrapper>
      <Title strong>
        參考資料
      </Title>
      {list.map((i, index) => (
        <TextWrap key={i.text}>
          <NumberDot>{`${index + 1}.`}</NumberDot>
          <SmallMarginText
            meta={[{
              start: 0,
              end: i.text.length - 1,
              type: ARTICLE_META_TYPE.LINK,
              url: i.url,
            }]}
          >
            {i.text}
          </SmallMarginText>
        </TextWrap>
      ))}
    </Wrapper>
  );
}

Reference.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Reference;
