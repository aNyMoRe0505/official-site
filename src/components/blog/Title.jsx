import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledTitle = styled.h1`
  width: 100%;
  text-align: start;
  font-size: 30px;
  margin: 30px 0 0;
  line-height: 1.6;
  font-weight: ${({ strong }) => (strong ? '400' : '300')};
  @media (max-width: 768px) {
    font-size: 27px;
    margin: 15px 0 0;
  };
`;

function Title({
  children,
  strong,
}) {
  return (
    <StyledTitle strong={strong}>
      {children}
    </StyledTitle>
  );
}

Title.propTypes = {
  children: PropTypes.string.isRequired,
  strong: PropTypes.bool,
};

Title.defaultProps = {
  strong: false,
};

export default Title;
