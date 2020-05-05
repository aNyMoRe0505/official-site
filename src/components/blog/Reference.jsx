import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { ARTICLE_META_TYPE } from '../../helper/article';

import SubTitle from './SubTitle';
import Text from './Text';

const SmallMarginText = styled(Text)`
  margin: 10px 0 0;
`;

function Reference({
  list,
}) {
  return (
    <>
      <SubTitle strong>
        參考資料
      </SubTitle>
      {list.map((i) => (
        <SmallMarginText
          key={i.url}
          meta={[{
            start: i.start,
            end: i.end,
            type: ARTICLE_META_TYPE.LINK,
            url: i.url,
          }]}
        >
          {i.name}
        </SmallMarginText>
      ))}
    </>
  );
}

Reference.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Reference;
