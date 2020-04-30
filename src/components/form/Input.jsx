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
  border-color: ${({ error }) => (error ? styles.mainRed : 'gray')};
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
  error,
}) {
  return (
    <InputWrapper className={className}>
      {error && (
        <span style={{ color: styles.mainRed }}>！</span>
      )}
      {label && (
        <StyledLabel labelStyle={labelStyle}>{`${label}：`}</StyledLabel>
      )}
      <StyledInput
        error={!!error}
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
  register: PropTypes.func,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  labelStyle: PropTypes.arrayOf(PropTypes.string),
  error: PropTypes.shape({}),
};

Input.defaultProps = {
  label: '',
  type: 'text',
  defaultValue: '',
  className: '',
  register: null,
  labelStyle: null,
  error: null,
};

export default Input;
