import React, { useState, useEffect, forwardRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { FETCH_YOUTUBE_LIST, CLEAR_YOUTUBE_RESULT } from '../actions/Youtube';
import { useBodyFetchMore } from '../helper/hooks';

import searchIcon from '../static/searchIcon.png';

const Wrapper = styled.div`
  width: 100%;
  background-color: #ff3f3f;
  height: 80px;
  padding: 10px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputWrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  background-color: transparent;
  border-width: 0px 0px 1px 0px;
  border-radius: 0px;
  border-style: solid;
  border-color: white;
  outline: none;
  font-size: 16px;
  padding: 10px;
  color: white;
`;

const SearchButton = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  background-image: url(${searchIcon});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  right: 6px;
  bottom: 5px;
  outline: none;
`;

const YoutubeSearcher = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const nextPageToken = useSelector((state) => state.Youtube.nextPageToken);
  const loading = useSelector((state) => state.Youtube.loading);

  const handleSubmit = () => {
    if (!keyword) {
      alert('請輸入關鍵字！');
      return;
    }

    dispatch({ type: CLEAR_YOUTUBE_RESULT });
    dispatch({
      type: FETCH_YOUTUBE_LIST,
      keyword,
      nextPageToken: '',
    });
  };

  useEffect(() => () => dispatch({ type: CLEAR_YOUTUBE_RESULT }), [dispatch]);

  useBodyFetchMore(() => {
    if (nextPageToken && keyword && !loading) {
      dispatch({
        type: FETCH_YOUTUBE_LIST,
        keyword,
        nextPageToken,
      });
    }
  }, ref);

  return (
    <Wrapper>
      <InputWrapper>
        <Input
          onChange={(e) => setKeyword(e.target.value)}
          type="text"
          value={keyword}
        />
        <SearchButton
          disabled={loading}
          onClick={handleSubmit}
          type="button"
        />
      </InputWrapper>
    </Wrapper>
  );
});

export default YoutubeSearcher;
