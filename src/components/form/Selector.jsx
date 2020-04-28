import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StyledSelector = styled.select`
  flex: 1;
  font-size: 16px;
  border: none;
  height: 40px;
  outline: none;
`;

const StyledLabel = styled.span`
  font-size: 16px;
`;

function Selector({
  register,
  label,
  name,
  options,
}) {
  return (
    <SelectorWrapper>
      {label && (
        <StyledLabel>{`${label}：`}</StyledLabel>
      )}
      <StyledSelector
        ref={register}
        name={name}
      >
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.name}
          </option>
        ))}
      </StyledSelector>
    </SelectorWrapper>
  );
}

Selector.propTypes = {
  label: PropTypes.string,
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

Selector.defaultProps = {
  label: '',
};

export default Selector;
