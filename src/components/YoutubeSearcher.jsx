import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { FETCH_YOUTUBE_LIST, SAGA_CLEAR_YOUTUBE_RESULT } from '../actions/Youtube';
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

function YoutubeSearcher({
  setLoading,
  loading,
}) {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const nextPageToken = useSelector((state) => state.Youtube.nextPageToken);

  const handleSubmit = () => {
    if (!keyword) {
      alert('請輸入關鍵字！');
      return;
    }

    setLoading(true);

    dispatch({ type: SAGA_CLEAR_YOUTUBE_RESULT });
    dispatch({
      type: FETCH_YOUTUBE_LIST,
      keyword,
      nextPageToken: '',
      callback: () => setLoading(false),
    });
  };

  useEffect(() => () => dispatch({ type: SAGA_CLEAR_YOUTUBE_RESULT }), [dispatch]);

  useBodyFetchMore(() => {
    if (nextPageToken && keyword) {
      setLoading(true);
      dispatch({
        type: FETCH_YOUTUBE_LIST,
        keyword,
        nextPageToken,
        callback: () => setLoading(false),
      });
    }
  }, loading);

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
}

YoutubeSearcher.propTypes = {
  setLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default YoutubeSearcher;
