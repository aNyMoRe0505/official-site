import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledButton = styled.button`
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5896c1;
  color: white;
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  font-size: 16px;
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
}) {
  return (
    <StyledButton
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
};

Button.defaultProps = {
  className: '',
  type: 'button',
  onClick: null,
};

export default Button;
