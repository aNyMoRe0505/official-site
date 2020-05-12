import React from 'react';
import {
  useParams,
  Redirect,
} from 'react-router-dom';
import styled from 'styled-components';

import {
  articles,
} from '../../config/blog';

const ArticleWrapper = styled.div`
  width: 100%;
  max-width: 750px;
  padding: 0 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 768px) {
    padding: 0 0 15px;
  };
`;

function ArticleContainer() {
  const { articleId } = useParams();
  const targetArticle = articles.find((article) => article.id === parseInt(articleId, 10));

  if (!targetArticle) return <Redirect to="/blog" />;

  return (
    <ArticleWrapper>
      <targetArticle.component />
    </ArticleWrapper>
  );
}

export default ArticleContainer;
