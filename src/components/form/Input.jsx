import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import styles from '../../config/style';

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const StyledLabel = styled.span`
  font-size: 16px;
  ${({ labelStyle }) => labelStyle && labelStyle}
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
    border-color: ${styles.mainColor};
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
  defaultValue,
  className,
  labelStyle,
}) {
  return (
    <InputWrapper className={className}>
      {label && (
        <StyledLabel labelStyle={labelStyle}>{`${label}：`}</StyledLabel>
      )}
      <StyledInput
        defaultValue={defaultValue}
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
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  labelStyle: PropTypes.arrayOf(PropTypes.string),
};

Input.defaultProps = {
  label: '',
  type: 'text',
  defaultValue: '',
  className: '',
  labelStyle: null,
};

export default Input;
