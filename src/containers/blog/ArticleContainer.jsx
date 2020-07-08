import React, {
  useContext,
  useRef,
  useEffect,
} from 'react';
import {
  useParams,
  Redirect,
  useLocation,
} from 'react-router-dom';
import styled from 'styled-components';
import { DiscussionEmbed } from 'disqus-react';

import { useImageLoadCompleted } from '../../helper/hooks';

import PrevNextArticle from './PrevNextArticle';
import LoadingBox from '../../components/LoadingBox';

import {
  articles,
} from '../../config/blog';
import { DarkModeContext } from '../../config/context';
import styles from '../../config/style';

const ArticleWrapper = styled.div`
  width: 100%;
  max-width: 750px;
  padding: 0 0 30px;
  overflow: hidden;
  ${({ imageLoaded }) => !imageLoaded && 'height: 0px'};
  @media (max-width: 768px) {
    padding: 0 0 15px;
  };
`;

const ArticleRefWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

// 這邊如果沒設定背景disqus吃不到外面的background-color來改變theme
const DisqusContainer = styled.div`
  margin: 30px 0 0;
  width: 100%;
  background-color: ${({ darkMode }) => (darkMode && '#1e2330') || 'white'};
  @media (max-width: 768px) {
    margin: 15px 0 0;
  };
`;

const ProgressBar = styled.div`
  width: 2px;
  height: 0;
  background-color: ${styles.mainColor};
  z-index: 996;
  position: fixed;
  top: 0;
  left: 0;
  transition-property: opacity;
  transition-timing-function: ease-out;
  transition-duration: 0.5s;
`;

function ArticleContainer() {
  const articleRef = useRef();
  const progressRef = useRef();
  const { articleId } = useParams();
  const { pathname } = useLocation();
  const darkMode = useContext(DarkModeContext);
  const imageLoaded = useImageLoadCompleted();

  useEffect(() => {
    const scrollAndResize = () => {
      const { scrollTop } = document.documentElement;
      const { innerHeight } = window;
      const { height } = articleRef.current.getBoundingClientRect();

      const rate = (scrollTop / (height - innerHeight + 95)) * 100;

      progressRef.current.style.height = `${rate}%`;
      if (rate >= 100 || rate <= 0) {
        progressRef.current.style.opacity = 0;
      } else {
        progressRef.current.style.opacity = 1;
      }
    };

    scrollAndResize();

    window.addEventListener('resize', scrollAndResize);
    window.addEventListener('scroll', scrollAndResize);

    return () => {
      window.removeEventListener('resize', scrollAndResize);
      window.removeEventListener('scroll', scrollAndResize);
    };
  }, []);

  const targetArticle = articles.find((article) => article.id === parseInt(articleId, 10));

  if (!targetArticle) return <Redirect to="/blog" />;

  const prevArticle = articles.find((article) => article.id === parseInt(articleId, 10) - 1);
  const nextArticle = articles.find((article) => article.id === parseInt(articleId, 10) + 1);

  return (
    <>
      <LoadingBox loadingStatus={!imageLoaded} />
      <ProgressBar ref={progressRef} />
      <ArticleWrapper imageLoaded={imageLoaded}>
        <ArticleRefWrap ref={articleRef}>
          <targetArticle.component />
        </ArticleRefWrap>
        <PrevNextArticle
          targetArticle={targetArticle}
          prevArticle={prevArticle}
          nextArticle={nextArticle}
        />
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
