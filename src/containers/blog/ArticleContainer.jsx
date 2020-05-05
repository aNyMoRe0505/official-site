import React from 'react';
import {
  useParams,
  Redirect,
} from 'react-router-dom';
import styled from 'styled-components';

import {
  articles,
} from '../../config/blog';

const Wrapper = styled.div`
  width: 100%;
  max-width: 750px;
  padding: 0 0 30px;
  @media (max-width: 768px) {
    padding: 0 0 15px;
  };
`;

function ArticleContainer() {
  const { articleId } = useParams();
  const targetArticle = articles.find((article) => article.id === parseInt(articleId, 10));

  if (!targetArticle) return <Redirect to="/blog" />;

  return (
    <Wrapper>
      <targetArticle.component />
    </Wrapper>
  );
}

export default ArticleContainer;
