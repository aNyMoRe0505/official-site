import React, { useState, useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import { useParams, Redirect, Link } from 'react-router-dom';

import {
  categories,
  tags,
} from '../../config/blog';
import styles from '../../config/style';
import { DarkModeContext } from '../../config/context';
import {
  mockAPIGetArticleList,
} from '../../helper/api';

import LoadingBox from '../../components/LoadingBox';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.p`
  font-size: 26px;
  margin: 0 0 15px 0;  
  color: ${styles.mainColor};
`;

const ArticleBlockDark = css`
  color: white;
  background-color: rgb(38, 44, 60);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
`;

const ArticleBlock = styled(({ darkMode, ...rest }) => <Link {...rest} />)`
  width: 100%;
  max-width: 500px;
  display: flex;
  margin: 0 0 15px 0;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 5px;
  padding: 15px;
  text-decoration: none;
  box-shadow: 0px 0px 4px #80808078;
  cursor: pointer;
  color: black;
  background-color: white;
  transition-duration: 0.2s;
  transition-property: transform;
  transition-timing-function: ease;
  ${({ darkMode }) => darkMode && ArticleBlockDark}
  :hover {
    transform: scale(1.05);
  };
`;

const ArticleCover = styled.div`
  width: 100%;
  height: 170px;
  background-image: url(${({ src }) => src});
  background-position: center;
  background-size: cover;
  margin: 0 0 15px;
`;

const ArticleTitle = styled.p`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 18px;
  margin: 0;
`;

// 之後tag多把blog searcher tag filter拔掉

function TagCategoryArticle() {
  const darkMode = useContext(DarkModeContext);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    categoryId,
    tagId,
  } = useParams();

  useEffect(() => {
    let unmounted = false;
    if (categoryId || tagId) {
      const fetchArticles = async () => {
        if (!unmounted) setLoading(true);

        const payload = {};
        if (categoryId) payload.categories = [parseInt(categoryId, 10)];
        if (tagId) payload.tags = [parseInt(tagId, 10)];

        const { filteredArticles } = await mockAPIGetArticleList(payload);
        if (!unmounted) setArticles(filteredArticles);

        if (!unmounted) setLoading(false);
      };

      fetchArticles();
    }
    return () => { unmounted = true; };
  }, [categoryId, tagId]);

  const instance = categories[parseInt(categoryId, 10)] || tags[parseInt(tagId, 10)];
  if (!instance) return <Redirect to="/archives" />;

  return (
    <Wrapper>
      <Title>
        {instance}
      </Title>
      <LoadingBox loadingStatus={loading} />
      {articles.length ? (
        <>
          {articles.map((article) => (
            <ArticleBlock darkMode={darkMode} to={`/blog/article/${article.id}`} key={`article-${article.id}`}>
              <ArticleCover src={article.cover} />
              <ArticleTitle>{article.title}</ArticleTitle>
            </ArticleBlock>
          ))}
        </>
      ) : (
        <>{!loading && <p>查無文章</p>}</>
      )}
    </Wrapper>
  );
}

export default TagCategoryArticle;
