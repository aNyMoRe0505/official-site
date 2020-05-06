import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  margin: 30px 0 0;
  @media (max-width: 768px) {
    margin: 15px 0 0;
  };
`;

function Code({
  children,
}) {
  return (
    <StyledSyntaxHighlighter showLineNumbers language="javascript">
      {children}
    </StyledSyntaxHighlighter>
  );
}

Code.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Code;
