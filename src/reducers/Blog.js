import {
  CACHE_SEARCHER,
  UPDATE_MOCK_LOADING_STATUS,
} from '../actions/Blog';

export default (
  state = {
    searcherParam: {
      keyword: '',
      categories: [],
      tags: [],
    },
    loading: false,
  },
  action,
) => {
  switch (action.type) {
    case CACHE_SEARCHER:
      return {
        ...state,
        searcherParam: action.params,
      };

    case UPDATE_MOCK_LOADING_STATUS:
      return {
        ...state,
        loading: action.status,
      };

    default:
      return state;
  }
};
