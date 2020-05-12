import React, { useContext } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNight, defaultStyle } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { DarkModeContext } from '../../config/context';

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  margin: 30px 0 0;
  width: 100%;
  @media (max-width: 768px) {
    margin: 15px 0 0;
  };
`;

function Code({
  children,
}) {
  const darkMode = useContext(DarkModeContext);

  return (
    <StyledSyntaxHighlighter style={(darkMode && tomorrowNight) || defaultStyle} showLineNumbers language="javascript">
      {children}
    </StyledSyntaxHighlighter>
  );
}

Code.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Code;
