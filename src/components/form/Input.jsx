import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StyledLabel = styled.span`
  font-size: 16px;
`;

const StyledInput = styled.input`
  flex: 1;
  font-size: 16px;
  padding: 7px;
  outline: none;
  border-width: 0 0 2px 0px;
  border-style: solid;
  border-color: gray;
  border-radius: 0px;
  :focus {
    border-color: #5896c1;
  };
  transition-duration: 0.3s;
  transition-property: border-color;
  transition-timing-function: ease-in-out;
`;

function Input({
  label,
  register,
  name,
  type,
}) {
  return (
    <InputWrapper>
      {label && (
        <StyledLabel>{`${label}：`}</StyledLabel>
      )}
      <StyledInput
        type={type}
        ref={register}
        name={name}
      />
    </InputWrapper>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  register: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
};

Input.defaultProps = {
  label: '',
  type: 'text',
};

export default Input;
