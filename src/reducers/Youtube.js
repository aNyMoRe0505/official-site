import {
  FETCH_YOUTUBE_LIST_SUCCESS,
  CLEAR_YOUTUBE_RESULT,
  FETCH_MORE_YOUTUBE_LIST_SUCCESS,
  UPDATE_YOUTUBE_LOADING,
} from '../actions/Youtube';

export default (
  state = {
    searchResult: [],
    nextPageToken: '',
    loading: false,
  },
  action,
) => {
  switch (action.type) {
    case UPDATE_YOUTUBE_LOADING:
      return {
        ...state,
        loading: action.loading,
      };

    case FETCH_YOUTUBE_LIST_SUCCESS:
      return {
        ...state,
        searchResult: action.list,
        nextPageToken: action.nextPageToken,
      };

    case FETCH_MORE_YOUTUBE_LIST_SUCCESS:
      return {
        ...state,
        searchResult: [
          ...state.searchResult,
          ...action.list,
        ],
        nextPageToken: action.nextPageToken,
      };

    case CLEAR_YOUTUBE_RESULT:
      return {
        ...state,
        searchResult: [],
        nextPageToken: '',
      };

    default:
      return state;
  }
};
