import {
  CACHE_SEARCHER,
  BEFORE_ARTICLE_SEARCH,
  AFTER_ARTICLE_SEARCH_COMPLETED,
  BEFORE_ARTICLE_FETCH_MORE_SEARCH,
  AFTER_ARTICLE_FETCH_MORE_SEARCH_COMPLETED,
} from '../actions/Blog';

export default (
  state = {
    searcherParam: {
      keyword: '',
      categories: [],
      tags: [],
    },
    loading: false,
    page: 0,
    articleList: [],
    articleCachedList: [],
    reachingEnd: false,
  },
  action,
) => {
  switch (action.type) {
    case BEFORE_ARTICLE_FETCH_MORE_SEARCH:
      return {
        ...state,
        loading: true,
        page: state.page + 1,
      };

    case AFTER_ARTICLE_FETCH_MORE_SEARCH_COMPLETED:
      return {
        ...state,
        loading: false,
        articleList: [
          ...state.articleList,
          ...action.list,
        ],
        reachingEnd: action.reachingEnd,
      };

    case BEFORE_ARTICLE_SEARCH:
      return {
        ...state,
        loading: true,
        reachingEnd: false,
        page: 0,
        articleList: [],
        articleCachedList: [],
      };

    case AFTER_ARTICLE_SEARCH_COMPLETED:
      return {
        ...state,
        loading: false,
        articleList: action.list,
        articleCachedList: action.cacheList,
        reachingEnd: action.reachingEnd,
      };

    case CACHE_SEARCHER:
      return {
        ...state,
        searcherParam: action.params,
      };

    default:
      return state;
  }
};
