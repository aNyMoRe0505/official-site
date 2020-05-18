import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import SubTitle from './SubTitle';
import Text from './Text';

const Wrapper = styled.div`
  width: 100%;
  margin: 30px 0 0;
  @media (max-width: 768px) {
    margin: 15px 0 0;
  };
  ${({ titleExist }) => !titleExist && 'margin: 10px 0px 0px'};
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

function List({
  title,
  list,
  prefixType,
}) {
  return (
    <Wrapper titleExist={!!title}>
      {title && (
      <Title strong>
        {title}
      </Title>
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
    </Wrapper>
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
