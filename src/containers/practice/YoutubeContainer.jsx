import React, { useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import YoutubeSearcher from '../../components/YoutubeSearcher';
import LoadingBox from '../../components/LoadingBox';

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

function YoutubeContainer() {
  const searchResult = useSelector((state) => state.Youtube.searchResult);
  const loading = useSelector((state) => state.Youtube.loading);
  const sentinelRef = useRef();

  return (
    <Wrapper>
      <YoutubeSearcher ref={sentinelRef} />
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
      <LoadingBox loadingStatus={loading} />
      <div ref={sentinelRef} />
    </Wrapper>
  );
}

export default YoutubeContainer;
