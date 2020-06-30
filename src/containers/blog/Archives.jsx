import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { groupBy } from '../../helper/helper';
import styles from '../../config/style';
import {
  articles,
  categories,
  tags,
} from '../../config/blog';

const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const SwitchrWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 20px 0;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 0px 4px #80808078;
  padding: 10px 5px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const SwitchButton = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  padding: 5px 10px;
  margin: 0 10px;
  color: ${({ actived }) => (actived && styles.mainColor) || 'gray'};
  font-size: 16px;
  transition-property: color;
  transition-timing-function: ease;
  transition-duration: 0.2s;
  position: relative;
  cursor: pointer;
  ::after {
    content: '';
    position: absolute;
    width: ${({ actived }) => (actived && '100%') || '0px'};
    height: 2px;
    left: 0px;
    bottom: 0px;
    background-color: ${styles.mainColor};
    transition-property: width;
    transition-timing-function: ease;
    transition-duration: 0.2s;
  };
  :hover {
    color: ${styles.mainColor};
    ::after {
      width: 100%;
    };
  };
  @media (max-width: 768px) {
    margin: 0 5px;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ArticleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.5s ease;
`;

const YearArticleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 0 15px 0;
`;

const Year = styled.p`
  color: ${styles.mainColor};
  font-size: 26px;
  margin: 0 0 15px 0;
`;

const ArticleBlock = styled(Link)`
  font-size: 16px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0px 0px 4px #80808078;
  margin: 0 0 10px 0;
  padding: 10px;
  color: black;
  text-decoration: none;
  transition-property: opacity;
  transition-timing-function: ease;
  transition-duration: 0.2s;
  :hover {
    opacity: 0.7;
  }
`;

const CategoryTag = styled(Link)`
  width: auto;
  height: 30px;
  padding: 0 8px;
  margin: 0 5px 5px;
  text-decoration: none;
  border-radius: 5px;
  color: white;
  background-color: ${styles.mainColor};
  display: flex;
  align-items: center;
  justify-content: center;
  transition-property: opacity;
  transition-timing-function: ease;
  transition-duration: 0.2s;
  :hover {
    opacity: 0.8;
  }
`;

const CategoryWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  animation: ${fadeIn} 0.5s ease;
`;

const TagWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  animation: ${fadeIn} 0.5s ease;
`;

const switchBtns = ['文章', '分類', '標籤'];

const groupedArticles = groupBy(articles, (article) => moment(article.date).format('YYYY'));

const contentGenerator = (tab) => {
  switch (tab) {
    case switchBtns[0]:
      return (
        <ArticleWrapper>
          {groupedArticles.map((groupArticle) => (
            <YearArticleWrapper key={groupArticle.key}>
              <Year>{groupArticle.key}</Year>
              {groupArticle.items.map((article) => (
                <ArticleBlock key={article.id} to={`/blog/article/${article.id}`}>
                  {`${moment(article.date).format('MM-DD')} ${article.title}`}
                </ArticleBlock>
              ))}
            </YearArticleWrapper>
          ))}
        </ArticleWrapper>
      );

    case switchBtns[1]:
      return (
        <CategoryWrapper>
          {Object.keys(categories).map((key) => (
            <CategoryTag to={`/blog/categoryArticle/${key}`} key={key}>
              {categories[key]}
            </CategoryTag>
          ))}
        </CategoryWrapper>
      );

    case switchBtns[2]:
      return (
        <TagWrapper>
          {Object.keys(tags).map((key) => (
            <CategoryTag to={`/blog/tagArticle/${key}`} key={key}>
              {tags[key]}
            </CategoryTag>
          ))}
        </TagWrapper>
      );

    default:
      return null;
  }
};

function Archives() {
  const [currentTab, setTab] = useState(switchBtns[0]);

  return (
    <Wrapper>
      <SwitchrWrapper>
        {switchBtns.map((text) => (
          <SwitchButton
            key={text}
            actived={text === currentTab}
            onClick={() => setTab(text)}
            type="button"
          >
            {text}
          </SwitchButton>
        ))}
      </SwitchrWrapper>
      {contentGenerator(currentTab)}
    </Wrapper>
  );
}

export default Archives;
