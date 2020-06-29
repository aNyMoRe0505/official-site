import {
  CACHE_SEARCHER,
  BEFORE_ARTICLE_SEARCH,
  AFTER_ARTICLE_SEARCH_COMPLETED,
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
    fetchMoreCachedList: [],
    reachingEnd: false,
    apiCachedList: {},
  },
  action,
) => {
  switch (action.type) {
    case BEFORE_ARTICLE_SEARCH: {
      if (!action.fetchMore) {
        return {
          ...state,
          loading: true,
          reachingEnd: false,
          page: 0,
          articleList: [],
          fetchMoreCachedList: [],
        };
      }
      return {
        ...state,
        loading: true,
        page: state.page + 1,
      };
    }

    case AFTER_ARTICLE_SEARCH_COMPLETED:
      return {
        ...state,
        loading: false,
        articleList: action.fetchMore ? [
          ...state.articleList,
          ...action.list,
        ] : action.list,
        fetchMoreCachedList: action.cacheList,
        reachingEnd: action.reachingEnd,
        apiCachedList: action.apiCached,
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
