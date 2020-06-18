import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { debounce } from '../../helper/helper';

import background from '../../static/background.jpeg';

import {
  MainBlock,
  BlockTitleWrap,
  BlockTitle,
  StyledPlusMarkBtn,
  FadeIn,
  FadeOut,
} from './style';

const WorkWrapper = styled.div`
  width: 99%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  margin: 0 0 15px 0;
  ${({ status }) => (status && FadeIn) || FadeOut}
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const WorkBlock = styled.a`
  width: 100%;
  box-shadow: 0px 0px 4px #80808078;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 15px;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  color: black;
  background-color: white;
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
  :hover {
    opacity: 0.8;
  };
`;

const Cover = styled.div`
  width: 100%;
  height: 200px;
  background-image: url(${({ cover }) => cover});
  background-position: center;
  background-size: cover;
  margin: 0 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CoverMask = styled.div`
  width: calc(100% - 30px);
  height: 170px;
  background: hsla(0, 0%, 100%, .3);
  position: relative;
  overflow: hidden;
  z-index: 1;
  color: white;
  font-size: 40px;
  font-family: Papyrus;
  display: flex;
  align-items: center;
  box-shadow: 0 5px 17px rgba(0, 0, 0, 0.6);
  border-radius: 5px;
  justify-content: center;
  ::before {
    width: ${({ maskWidth }) => `${maskWidth}px`};
    height: ${({ maskHeight }) => `${maskHeight}px`};
    background-image: url(${({ cover }) => cover});
    background-position: center;
    background-size: cover;
    z-index: -1;
    content: '';
    filter: blur(10px);
    position: absolute;
  };
`;

const Desc = styled.p`
  font-size: 18px;
  font-weight: 300;
  margin: 0 0 15px;
  @media (max-width: 768px) {
    font-size: 15px;
  };
`;

const TagWrap = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  @media (max-width: 768px) {
    font-size: 15px;
  };
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #343eb9;
  width: auto;
  color: white;
  height: 30px;
  margin: 0 5px 5px;
  padding: 0 8px;
  font-size: 13px;
  border-radius: 5px;
`;

const works = [{
  id: 1,
  cover: background,
  needTitleInCover: true,
  name: "Paul's Blog",
  desc: '就是這個網站，原本只是想放點小東西，最後想說弄成部落格好了。',
  buildedWith: ['React', 'Redux', 'Webpack', 'Styled-Components'],
  link: 'https://github.com/aNyMoRe0505/official-site',
}, {
  id: 2,
  cover: 'https://www.homeruntaiwan.com/ogImage.jpg',
  needTitleInCover: false,
  name: 'Home Run Taiwan',
  desc: '主要負責利用 Apollo 開發 GraphQL API，會員、文章、分類...，並進行部分後台、前台前端開發。',
  buildedWith: ['React', 'Redux', 'Webpack', 'GraphQL', 'Apollo', 'Emotion', 'MySQL', 'Sequelize'],
  link: 'https://homeruntaiwan.com/',
}, {
  id: 3,
  cover: 'https://i.ytimg.com/vi/6eXxJASf5aI/maxresdefault.jpg',
  needTitleInCover: false,
  name: '中信棒球活動網站',
  desc: '棒球資格賽，中信辦現場直播的活動網站。',
  buildedWith: ['React', 'Webpack', 'Emotion'],
  link: 'https://2019baseball.homeruntaiwan.com/',
}];

function Works() {
  const [workExpanded, setWorkExpanded] = useState(true);
  const [coverContainerRect, setCoverContainerRect] = useState({});
  const coverContainerRef = useRef();

  useEffect(() => {
    setCoverContainerRect(coverContainerRef.current.getBoundingClientRect());

    const resize = () => {
      setCoverContainerRect(coverContainerRef.current.getBoundingClientRect());
    };
    const resizeWithDebounce = debounce(resize, 500);

    window.addEventListener('resize', resizeWithDebounce);

    return () => window.removeEventListener('resize', resizeWithDebounce);
  }, []);

  return (
    <MainBlock>
      <BlockTitleWrap>
        <BlockTitle>部分作品</BlockTitle>
        <StyledPlusMarkBtn
          status={workExpanded}
          onClick={() => setWorkExpanded(!workExpanded)}
        >
          <img style={{ width: '100%' }} alt="plus" src="https://img.icons8.com/ios/80/000000/plus.png" />
        </StyledPlusMarkBtn>
      </BlockTitleWrap>
      <WorkWrapper status={workExpanded}>
        {works.map((work) => (
          <WorkBlock
            href={work.link}
            rel="noopener noreferrer"
            target="_blank"
            key={work.id}
          >
            <Cover ref={coverContainerRef} cover={work.cover}>
              {work.needTitleInCover ? (
                <CoverMask
                  maskWidth={coverContainerRect.width || 0}
                  maskHeight={coverContainerRect.height || 0}
                  cover={work.cover}
                >
                  {work.name}
                </CoverMask>
              ) : null}
            </Cover>
            <Desc>
              {work.name}
            </Desc>
            <Desc>
              {work.desc}
            </Desc>
            <TagWrap>
              {work.buildedWith.map((tool) => (
                <Tag key={`${work.name}-${tool}`}>
                  {tool}
                </Tag>
              ))}
            </TagWrap>
          </WorkBlock>
        ))}
      </WorkWrapper>
    </MainBlock>
  );
}

export default Works;
