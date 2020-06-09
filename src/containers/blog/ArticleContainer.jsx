import React, { useContext } from 'react';
import {
  useParams,
  Redirect,
  useLocation,
} from 'react-router-dom';
import styled from 'styled-components';
import { DiscussionEmbed } from 'disqus-react';

import { useImageLoadCompleted } from '../../helper/hooks';

import LoadingBox from '../../components/LoadingBox';

import {
  articles,
} from '../../config/blog';
import { DarkModeContext } from '../../config/context';

const ArticleWrapper = styled.div`
  width: 100%;
  max-width: 750px;
  padding: 0 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  ${({ imageLoaded }) => !imageLoaded && 'height: 0px'};
  @media (max-width: 768px) {
    padding: 0 0 15px;
  };
`;

// 這邊如果沒設定背景disqus吃不到外面的background-color來改變theme
const DisqusContainer = styled.div`
  margin: 30px 0 0;
  width: 100%;
  background-color: ${({ darkMode }) => (darkMode && '#1e2330') || 'white'};
`;

function ArticleContainer() {
  const { articleId } = useParams();
  const { pathname } = useLocation();
  const darkMode = useContext(DarkModeContext);
  const imageLoaded = useImageLoadCompleted();

  const targetArticle = articles.find((article) => article.id === parseInt(articleId, 10));

  if (!targetArticle) return <Redirect to="/blog" />;


  return (
    <>
      <LoadingBox loadingStatus={!imageLoaded} />
      <ArticleWrapper imageLoaded={imageLoaded}>
        <targetArticle.component />
        <DisqusContainer darkMode={darkMode}>
          <DiscussionEmbed
            shortname="https-anymore0505-github-io-official-site"
            config={{
              url: `https://anymore0505.github.io/official-site${pathname}`,
              identifier: `${targetArticle.id}-${targetArticle.title}`,
              title: targetArticle.title,
              language: 'zh_TW',
            }}
          />
        </DisqusContainer>
      </ArticleWrapper>
    </>
  );
}

export default ArticleContainer;
