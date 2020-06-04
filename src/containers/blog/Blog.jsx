import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { useBodyFetchMore, useUnmounted } from '../../helper/hooks';
import {
  articles,
  categories as categoryList,
  tags as tagList,
} from '../../config/blog';
import styles from '../../config/style';
import {
  UPDATE_MOCK_LOADING_STATUS,
} from '../../actions/Blog';


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

const ArticleBlock = styled(Link)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  border-radius: 5px;
  padding: 15px;
  text-decoration: none;
  box-shadow: 0px 0px 4px #80808078;
  color: black;
  cursor: pointer;
  background-color: white;
  transition-duration: 0.2s;
  transition-property: transform;
  transition-timing-function: ease;
  animation-name: ${ArticleAnimation};
  animation-duration: 1s;
  animation-timing-function: ease;
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

const ARTICLE_LIMIT = 9;

function Blog() {
  const [page, setPage] = useState(0);
  const [articleList, setArticleList] = useState([]);
  const [articleCachedList, setArticleCachedList] = useState([]);
  const [reachingEnd, setReachingEnd] = useState(false);
  const unmounted = useUnmounted();

  const tags = useSelector((state) => state.Blog.searcherParam.tags);
  const keyword = useSelector((state) => state.Blog.searcherParam.keyword);
  const categories = useSelector((state) => state.Blog.searcherParam.categories);
  const loading = useSelector((state) => state.Blog.loading);

  const dispatch = useDispatch();

  const getArticleList = useCallback(async (currentPage = 0, cachedList = []) => {
    dispatch({ type: UPDATE_MOCK_LOADING_STATUS, status: true });
    await new Promise((res) => setTimeout(res, 500));

    let filteredArticles = currentPage ? cachedList : articles;
    let caching = [];

    if (!currentPage) {
      // 非fetch more才要重新整個filter
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
      // 快取起來, fetch more時直接以快取的array做slice
      caching = filteredArticles;
    }

    filteredArticles = filteredArticles.slice(currentPage * ARTICLE_LIMIT, currentPage * ARTICLE_LIMIT + ARTICLE_LIMIT);

    dispatch({ type: UPDATE_MOCK_LOADING_STATUS, status: false });
    return {
      caching,
      filteredArticles,
    };
  }, [dispatch, keyword, categories, tags]);

  useEffect(() => {
    const mockFetchArticles = async () => {
      setReachingEnd(false);
      setPage(0);
      setArticleList([]);
      const { filteredArticles, caching } = await getArticleList();
      if (!unmounted.current) {
        setArticleCachedList(caching);
        setArticleList(filteredArticles);
      }
    };

    mockFetchArticles();
  }, [getArticleList, unmounted]);

  useBodyFetchMore(async () => {
    setPage(page + 1);
    const { filteredArticles: nextPageArticles } = await getArticleList(page + 1, articleCachedList);
    if (!unmounted.current) {
      if (nextPageArticles.length) {
        setArticleList([
          ...articleList,
          ...nextPageArticles,
        ]);
      } else {
        setReachingEnd(true);
      }
    }
  }, loading || reachingEnd);

  return (
    <Wrapper>
      <Searcher />
      {articleList.length ? (
        <ArticleWrapper>
          {articleList.map((article) => (
            <ArticleBlock to={`/blog/article/${article.id}`} key={`article-${article.id}`}>
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
      <LoadingBox loadingStatus={loading}>
        Loading...
      </LoadingBox>
    </Wrapper>
  );
}

export default Blog;
