import React, { useState, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useSelector } from 'react-redux';

import YoutubeSearcher from '../components/YoutubeSearcher';

const scale = keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ResultWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1260px;
  @media (max-width: 1330px) {
    max-width: 840px;
  }
`;

const YoutubeBlock = styled.a`
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 10px;
  text-decoration: none;
  color: black;
  text-align: center;
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  @media (max-width: 900px) {
    width: 100%;
    margin: 10px 0px;
  }
  :hover {
    opacity: 0.7;
  }
`;

const YoutubeCover = styled.img`
  width: 100%;
`;

const Title = styled.span`
  padding: 5px 0 0;
`;

const FetchMoreLoadingStyle = css`
  position: fixed;
  bottom: 25px;
  margin: 0;
`;

const LoadingBox = styled.div`
  width: 200px;
  height: 60px;
  margin: 10px;
  background-color: white;
  box-shadow: 0px 0px 25px #80808078;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  opacity: ${({ loadingStatus }) => (loadingStatus ? 1 : 0)};
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  ${({ fetchMoreLoading }) => fetchMoreLoading && FetchMoreLoadingStyle}
  animation: ${scale} 1s linear infinite;
`;

function YoutubeContainer() {
  const [loading, setLoading] = useState(false);
  const searchResult = useSelector((state) => state.Youtube.searchResult);

  const wrapSetLoading = useCallback((loadingStatus) => {
    setLoading(loadingStatus);
  }, []);

  return (
    <Wrapper>
      <YoutubeSearcher
        loading={loading}
        setLoading={wrapSetLoading}
      />
      {searchResult.length ? (
        <ResultWrapper>
          {searchResult.map((item) => (
            <YoutubeBlock
              rel="noopener noreferrer"
              target="_blank"
              href={`https://www.youtube.com/watch?v=${item.id}`}
              key={item.id}
            >
              <YoutubeCover alt="cover" src={item.cover} />
              <Title>
                {item.title.length > 20 ? `${item.title.slice(0, 20)}..` : item.title}
              </Title>
            </YoutubeBlock>
          ))}
        </ResultWrapper>
      ) : null}
      <LoadingBox
        fetchMoreLoading={!!searchResult.length}
        loadingStatus={loading}
      >
        Loading...
      </LoadingBox>
    </Wrapper>
  );
}

export default YoutubeContainer;
