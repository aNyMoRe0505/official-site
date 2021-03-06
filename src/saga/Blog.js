import {
  put,
  call,
  select,
} from 'redux-saga/effects';

import {
  BEFORE_ARTICLE_SEARCH,
  AFTER_ARTICLE_SEARCH_COMPLETED,
} from '../actions/Blog';

import { mockAPIGetArticleList } from '../helper/api';

export function* handleFetchBlog({
  payload,
}) {
  const key = JSON.stringify(payload);
  const apiCachedObj = yield select((state) => state.Blog.apiCachedList);
  const fetchMoreCachedList = yield select((state) => state.Blog.fetchMoreCachedList);
  const loading = yield select((state) => state.Blog.loading);

  if (loading) return;

  let list = [];
  let cacheList = [];
  let reachingEnd = false;
  let newAPICachedObj = {};

  const fetchingPayload = payload.page ? { ...payload, fetchMoreCachedList } : payload;
  const fetchMore = !!payload.page;

  yield put({ type: BEFORE_ARTICLE_SEARCH, fetchMore });

  if (apiCachedObj[key]) {
    list = apiCachedObj[key].articles;
    cacheList = apiCachedObj[key].fetcMoreCached;
    reachingEnd = apiCachedObj[key].reachingEnd;
    newAPICachedObj = apiCachedObj;
  } else {
    const {
      caching: fetchMoreCacheList,
      filteredArticles,
    } = yield call(mockAPIGetArticleList, fetchingPayload);

    list = filteredArticles;
    cacheList = fetchMoreCacheList;
    reachingEnd = payload.limit ? filteredArticles.length < payload.limit : true;

    newAPICachedObj = {
      ...apiCachedObj,
      [key]: {
        articles: list,
        fetcMoreCached: cacheList,
        reachingEnd,
      },
    };
  }

  yield put({
    type: AFTER_ARTICLE_SEARCH_COMPLETED,
    list,
    cacheList,
    reachingEnd,
    apiCached: newAPICachedObj,
    fetchMore,
  });
}
