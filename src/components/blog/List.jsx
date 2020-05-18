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

const NumberDot = styled(Text)`
  width: auto;
  margin: 0 5px 0 0;
`;

const SmallMarginText = styled(Text)`
  margin: 0;
  flex: 1;
`;

function List({
  title,
  list,
  prefixType,
}) {
  return (
    <>
      {title && (
      <SubTitle strong>
        {title}
      </SubTitle>
      )}
      {list.map((i, index) => (
        <TextWrap key={i.text}>
          <NumberDot>{prefixType === 'NUMBER' ? `${index + 1}.` : '・'}</NumberDot>
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

List.propTypes = {
  title: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  prefixType: PropTypes.oneOf(['NUMBER', 'DOT']),
};

List.defaultProps = {
  title: '',
  prefixType: 'NUMBER',
};

export default List;
