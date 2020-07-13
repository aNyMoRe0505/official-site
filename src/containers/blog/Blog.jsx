import React, {
  useEffect,
  useContext,
} from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { useBodyFetchMore } from '../../helper/hooks';
import {
  categories as categoryList,
  tags as tagList,
} from '../../config/blog';
import styles from '../../config/style';
import {
  FETCH_BLOG_REQUEST,
} from '../../actions/Blog';
import { DarkModeContext } from '../../config/context';

import Searcher from './Searcher';
import LoadingBox from '../../components/LoadingBox';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ArticleWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  margin: 30px 0 0;
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const ArticleAnimation = keyframes`
  0% {
    transform: translateY(50px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
`;

const ArticleBlockDark = css`
  color: white;
  background-color: rgb(38, 44, 60);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
`;

const ArticleBlock = styled(({ darkMode, ...rest }) => <Link {...rest} />)`
  width: 100%;
  display: flex;
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
  transition-property: transform, color, background-color;
  transition-timing-function: ease;
  animation-name: ${ArticleAnimation};
  animation-duration: 1s;
  animation-timing-function: ease;
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

const ArticleDescBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 15px;
  font-weight: 300;
  @media (max-width: 768px) {
    font-size: 13px;
  };
`;

const ArticlePublishTime = styled.p`
  margin: 0 0 10px;
  color: gray;
`;

const ArticleTitle = styled.p`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 18px;
  margin: 0 0 10px;
  @media (max-width: 768px) {
    font-size: 15px;
  };
`;

const ArticleDesc = styled.p`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 10px;
`;

const CategoryTagListWrapper = styled.div`
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
  font-size: 13px;
  color: white;
  background-color: ${({ actived }) => (actived ? styles.mainRed : styles.mainColor)};
`;

const ARTICLE_LIMIT = 6;

function Blog() {
  const darkMode = useContext(DarkModeContext);
  const {
    tags,
    keyword,
    categories,
  } = useSelector((state) => state.Blog.searcherParam); // 不拆開 影響不大 可讀性好一點
  const loading = useSelector((state) => state.Blog.loading);
  const page = useSelector((state) => state.Blog.page);
  const articleList = useSelector((state) => state.Blog.articleList);
  const reachingEnd = useSelector((state) => state.Blog.reachingEnd);

  const dispatch = useDispatch();

  useEffect(() => {
    const payload = {
      page: 0,
      limit: ARTICLE_LIMIT,
      keyword,
      categories,
      tags,
    };

    dispatch({
      type: FETCH_BLOG_REQUEST,
      payload,
    });
  }, [dispatch, keyword, categories, tags]);

  useBodyFetchMore(() => {
    if (!loading && !reachingEnd) {
      const payload = {
        page: page + 1,
        limit: ARTICLE_LIMIT,
        keyword,
        categories,
        tags,
      };

      dispatch({
        type: FETCH_BLOG_REQUEST,
        payload,
      });
    }
  });

  return (
    <Wrapper>
      <Searcher />
      {articleList.length ? (
        <ArticleWrapper>
          {articleList.map((article) => (
            <ArticleBlock darkMode={darkMode} to={`/blog/article/${article.id}`} key={`article-${article.id}`}>
              <ArticleCover src={article.cover} />
              <ArticleDescBlock>
                <ArticleTitle>{article.title}</ArticleTitle>
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
      ) : (
        <>{!loading && <p>查無文章</p>}</>
      )}
      <LoadingBox loadingStatus={loading} />
    </Wrapper>
  );
}

export default Blog;
