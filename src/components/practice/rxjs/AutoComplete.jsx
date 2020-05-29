import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { fromEvent, from } from 'rxjs';
import {
  map,
  switchMap,
  debounceTime,
} from 'rxjs/operators';

const dropdownKeywords = [
  'React',
  'Redux',
  'Apollo',
  'Webpack',
  'Git',
  'React Hook',
  'GraphQL',
];

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Title = styled.h1`
  margin: 0 0 10px 0;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  height: 40px;
  border-radius: 5px;
  font-size: 18px;
  padding: 0 10px;
`;

const DropdownWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 45px;
  left: 0;
  border-radius: 5px;
  box-shadow: 0px 0px 25px #80808078;
  text-align: center;
  background-color: white;
  z-index: 990;
`;

const Keyword = styled.p`
  margin: 5px 0;
  cursor: pointer;
`;

const mockKeywordAPI = async (keyword) => {
  if (!keyword) return [];
  const filterdKeywords = dropdownKeywords.filter((hotKeyword) => hotKeyword.includes(keyword));
  await new Promise((resolve) => setTimeout(resolve, 200));
  return filterdKeywords;
};

function AutoComplete() {
  const inputRef = useRef();
  const [focus, setFocus] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [hotKeywords, setHotKeywords] = useState([]);

  useEffect(() => {
    const inputEvent = fromEvent(inputRef.current, 'input');
    const subscriber = inputEvent.pipe(
      debounceTime(500),
      map((e) => e.target.value),
      switchMap((value) => from(mockKeywordAPI(value))),
    ).subscribe(async (filterdKeywords) => {
      setHotKeywords(filterdKeywords);
      setFocus(true);
    });

    return () => subscriber.unsubscribe();
  }, []);

  return (
    <Wrapper>
      <Title>AutoComplete (R, A, W, G)</Title>
      <InputWrapper>
        <Input
          onBlur={() => setFocus(false)}
          ref={inputRef}
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
        />
        {focus && hotKeywords.length ? (
          <DropdownWrapper>
            {hotKeywords.map((hotKeyword) => (
              <Keyword
                onMouseDown={() => {
                  setKeyword(hotKeyword);
                }}
                key={hotKeyword}
              >
                {hotKeyword}
              </Keyword>
            ))}
          </DropdownWrapper>
        ) : null}
      </InputWrapper>
    </Wrapper>
  );
}

export default AutoComplete;
