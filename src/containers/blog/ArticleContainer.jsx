import React, {
  useContext,
  useRef,
  useEffect,
  useState,
} from 'react';
import {
  useParams,
  Redirect,
  useLocation,
  Link,
} from 'react-router-dom';
import styled from 'styled-components';
import { DiscussionEmbed } from 'disqus-react';

import PrevNextArticle from './PrevNextArticle';

import {
  articles,
  categories,
  tags,
} from '../../config/blog';
import { DarkModeContext } from '../../config/context';
import styles from '../../config/style';

const ArticleWrapper = styled.div`
  width: 100%;
  max-width: 750px;
  padding: 0 0 30px;
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

const TagCategoryWrapper = styled.div`
  width: 100%;
  margin: 30px 0 0;
  @media (max-width: 768px) {
    margin: 15px 0 0;
  };
`;

const TagCategoryInnerWrapper = styled.div`
  width: 100%;
  margin: 10px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const TagCategoryBlock = styled.div`
  width: 100%;
  margin: 10px 0 0 3px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

const TagCategory = styled(Link)`
  border-radius: 3px;
  border: 1px solid #b95ede;
  padding: 3px 5px;
  margin: 0 10px 10px 0;
  text-decoration: none;
  color: #b95ede;
  font-weight: 400;
`;

function ArticleContainer() {
  const articleRef = useRef();
  const progressRef = useRef();
  const disqusRef = useRef();
  const { articleId } = useParams();
  const { pathname } = useLocation();
  const darkMode = useContext(DarkModeContext);
  const [disqusLoaded, setDisqusLoaded] = useState(false);

  // disqus effect
  useEffect(() => {
    const scroll = () => {
      const { top } = disqusRef.current.getBoundingClientRect();
      const { innerHeight } = window;
      if (top < innerHeight && !disqusLoaded) setDisqusLoaded(true);
    };

    scroll();
    window.addEventListener('scroll', scroll);
    return () => window.removeEventListener('scroll', scroll);
  }, [disqusLoaded]);

  // progress bar effect
  useEffect(() => {
    const scrollAndResize = () => {
      const { scrollTop } = document.documentElement;
      const { innerHeight } = window;
      const { height } = articleRef.current.getBoundingClientRect();

      const rate = (scrollTop / (height - innerHeight + 95)) * 100; // 95 => padding-top

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
      <ProgressBar ref={progressRef} />
      <ArticleWrapper>
        <ArticleRefWrap ref={articleRef}>
          <targetArticle.component />
          <TagCategoryWrapper>
            {targetArticle.categoryIds.length ? (
              <TagCategoryInnerWrapper>
                <img
                  style={{ width: '35px' }}
                  src="https://img.icons8.com/nolan/64/opened-folder.png"
                  alt="category"
                />
                <TagCategoryBlock>
                  {targetArticle.categoryIds.map((id) => (
                    <TagCategory key={id} to={`/blog/categoryArticle/${id}`}>
                      {categories[id]}
                    </TagCategory>
                  ))}
                </TagCategoryBlock>
              </TagCategoryInnerWrapper>
            ) : null}
            {targetArticle.tagIds.length ? (
              <TagCategoryInnerWrapper>
                <img
                  style={{ width: '35px', marginRight: '5px' }}
                  src="https://img.icons8.com/nolan/64/tags.png"
                  alt="tags"
                />
                <TagCategoryBlock>
                  {targetArticle.tagIds.map((id) => (
                    <TagCategory key={id} to={`/blog/tagArticle/${id}`}>
                      {tags[id]}
                    </TagCategory>
                  ))}
                </TagCategoryBlock>
              </TagCategoryInnerWrapper>
            ) : null}
          </TagCategoryWrapper>
        </ArticleRefWrap>
        <PrevNextArticle
          targetArticle={targetArticle}
          prevArticle={prevArticle}
          nextArticle={nextArticle}
        />
        <DisqusContainer ref={disqusRef} darkMode={darkMode}>
          {disqusLoaded && (
            <DiscussionEmbed
              shortname="https-anymore0505-github-io-official-site"
              config={{
                url: `https://anymore0505.github.io/official-site${pathname}`,
                identifier: `${targetArticle.id}-${targetArticle.title}`,
                title: targetArticle.title,
                language: 'zh_TW',
              }}
            />
          )}
        </DisqusContainer>
      </ArticleWrapper>
    </>
  );
}

export default ArticleContainer;
