import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import moment from 'moment';

import {
  articles,
  categories as categoryList,
  tags as tagList,
} from '../../config/blog';
import styles from '../../config/style';


import Searcher from './Searcher';

import gogoro from '../../static/gogoro.png';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ArticleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 30px 0 0;
`;

const ArticleBlock = styled(Link)`
  width: 100%;
  max-width: 750px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-shadow: 0px 0px 4px #80808078;
  border-radius: 5px;
  margin: 0 0 20px 0;
  transition-property: transform;
  transition-timing-function: ease-in-out;
  transition-duration: 0.3s;
  text-decoration: none;
  color: black;
  cursor: pointer;
  :hover {
    transform: scale(1.05);
  };
  @media (max-width: 768px) {
    flex-direction: column;
  };
`;

const ArticleCover = styled.img`
  width: 200px;
`;

const ArticleDescBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 15px;
  font-size: 18px;
  font-weight: 300;
  @media (max-width: 768px) {
    align-items: center;
    font-size: 15px;
  };
`;

const ArticlePublishTime = styled.p`
  margin: 0 0 10px;
  color: gray;
`

const ArticleDesc = styled.p`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 10px;
  @media (max-width: 768px) {
    justify-content: center;
  };
`;

const CategoryTagListWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
`;

const CategoryTagBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: 30px;
  padding: 0 8px;
  margin: 0 5px 5px;
  border-radius: 5px;
  font-size: 16px;
  color: white;
  background-color: ${({ actived }) => (actived ? styles.mainRed : styles.mainColor)};
`;

function Blog() {
  const {
    keyword,
    categories,
    tags,
  } = useSelector((state) => state.Blog.searcherParam);

  const articleList = useMemo(() => {
    let filteredArticles = articles;
    if (keyword) filteredArticles = filteredArticles.filter((article) => article.title.includes(keyword));
    if (categories.length) {
      filteredArticles = filteredArticles
        .filter((article) => article.categoryIds
          .some((categoryId) => ~categories.findIndex((category) => category === categoryId)));
    }
    if (tags.length) {
      filteredArticles = filteredArticles
        .filter((article) => article.tagIds
          .some((tagId) => ~tags.findIndex((tag) => tag === tagId)));
    }

    filteredArticles = filteredArticles.sort((a, b) => {
      if (a.date > b.date) return -1;
      if (b.date > a.date) return 1;
      return 0;
    });

    return filteredArticles;
  }, [keyword, categories, tags]);

  return (
    <Wrapper>
      <Searcher />
      <ArticleWrapper>
        {articleList.map((article) => (
          <ArticleBlock to="/" key={`article-${article.id}`}>
            <ArticleCover src={gogoro} alt="articleCover" />
            <ArticleDescBlock>
              <ArticleDesc>{article.title}</ArticleDesc>
              <ArticleDesc>{article.description}</ArticleDesc>
              <ArticlePublishTime>{moment(article.date).format('YYYY-MM-DD')}</ArticlePublishTime>
              {article.categoryIds.length ? (
                <CategoryTagListWrapper>
                  {article.categoryIds.map((categoryId) => (
                    <CategoryTagBtn key={`category-${categoryId}`}>
                      {categoryList[categoryId]}
                    </CategoryTagBtn>
                  ))}
                </CategoryTagListWrapper>
              ) : null}
              {article.tagIds.length ? (
                <CategoryTagListWrapper>
                  {article.tagIds.map((tagId) => (
                    <CategoryTagBtn actived key={`tag-${tagId}`}>
                      {tagList[tagId]}
                    </CategoryTagBtn>
                  ))}
                </CategoryTagListWrapper>
              ) : null}
            </ArticleDescBlock>
          </ArticleBlock>
        ))}
      </ArticleWrapper>
    </Wrapper>
  );
}

export default Blog;
