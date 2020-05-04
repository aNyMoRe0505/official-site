import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { useBodyFetchMore } from '../../helper/hooks';
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
  min-height: 230px;
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
`;

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

// TODO
// Article Detail structure
// Mock Pagination (fetch more)
// Mock Loading (when searching and fetchmore)

const ARTICLE_LIMIT = 10;

function Blog() {
  const [page, setPage] = useState(0);
  const [articleList, setArticleList] = useState([]);
  const [articleCachedList, setArticleCachedList] = useState([]);
  const [reachingEnd, setReachingEnd] = useState(false);

  // 分開拿才不會造成無意義的re render(shallow compared) (?為什麼array tags, categories 不會 應該也是比較ref..)
  const tags = useSelector((state) => state.Blog.searcherParam.tags);
  const keyword = useSelector((state) => state.Blog.searcherParam.keyword);
  const categories = useSelector((state) => state.Blog.searcherParam.categories);
  const loading = useSelector((state) => state.Blog.loading);

  const dispatch = useDispatch();

  const getArticleList = useCallback(async (currentPage = 0, cachedList = []) => {
    dispatch({ type: UPDATE_MOCK_LOADING_STATUS, status: true });
    await new Promise((res) => setTimeout(res, 1000));

    let filteredArticles = currentPage ? cachedList : articles;

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
      setArticleCachedList(filteredArticles);
    }
    filteredArticles = filteredArticles.slice(currentPage * ARTICLE_LIMIT, currentPage * ARTICLE_LIMIT + ARTICLE_LIMIT);

    dispatch({ type: UPDATE_MOCK_LOADING_STATUS, status: false });
    return filteredArticles;
  }, [dispatch, keyword, categories, tags]);

  useEffect(() => {
    let unMounted = false;
    setReachingEnd(false);
    setPage(0);
    const mockFetchArticles = async () => {
      // if articleList.length(?)
      setArticleList([]);
      const filteredArticles = await getArticleList();
      if (!unMounted) setArticleList(filteredArticles);
    };

    mockFetchArticles();
    return () => { unMounted = true; };
  }, [getArticleList]);

  useBodyFetchMore(async () => {
    if (reachingEnd) return;
    setPage(page + 1);
    const nextPageArticles = await getArticleList(page + 1, articleCachedList);
    if (nextPageArticles.length) {
      setArticleList([
        ...articleList,
        ...nextPageArticles,
      ]);
    } else {
      setReachingEnd(true);
    }
  }, loading);

  return (
    <Wrapper>
      <Searcher />
      {articleList.length ? (
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
