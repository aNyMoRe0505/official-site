import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const Textarea = styled.textarea`
  height: 200px;
  width: 100%;
  max-width: 100%;
  font-size: 16px;
  outline: none;
`;

function IndexTool() {
  const [selectedText, setSelectedText] = useState('');
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  const handleSelection = () => {
    const text = window.getSelection().toString();
    setSelectedText(text);
    const activeEl = document.activeElement;
    setStart(activeEl.selectionStart);
    setEnd(activeEl.selectionEnd - 1);
  };

  return (
    <Wrapper>
      <Textarea defaultValue="反白字體後告知該反白字的index資訊(給BLOG用)" onMouseUp={handleSelection} />
      <p>
        所選擇字：
        {selectedText}
      </p>
      <p>
        start:
        {selectedText && start}
      </p>
      <p>
        end:
        {selectedText && end}
      </p>
    </Wrapper>
  );
}

export default IndexTool;
