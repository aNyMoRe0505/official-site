import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import styles from '../config/style';

const StyledButton = styled.button`
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ disabled }) => (disabled ? 'gray' : styles.mainColor)};
  color: white;
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 0;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  font-size: 14px;
  margin: 0 10px;
  :hover {
    opacity: 0.8;
  };
`;


function Button({
  className,
  label,
  type,
  onClick,
  loading,
}) {
  return (
    <StyledButton
      disabled={loading}
      onClick={() => {
        if (onClick) onClick();
      }}
      type={type}
      className={className}
    >
      {label}
    </StyledButton>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  className: '',
  type: 'button',
  onClick: null,
  loading: false,
};

export default Button;
