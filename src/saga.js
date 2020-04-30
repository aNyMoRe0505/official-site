import {
  put,
  all,
  takeEvery,
  takeLatest,
  call,
} from 'redux-saga/effects';

import {
  FETCH_YOUTUBE_LIST,
  FETCH_YOUTUBE_LIST_SUCCESS,
  FETCH_MORE_YOUTUBE_LIST_SUCCESS,
  SAGA_CLEAR_YOUTUBE_RESULT,
  CLEAR_YOUTUBE_RESULT,
} from './actions/Youtube';

import {
  SAGA_CACHE_SEARCHER,
  CACHE_SEARCHER,
  UPDATE_MOCK_LOADING_STATUS,
} from './actions/Blog';

import { fetchYoutube } from './helper/api';

function* handleFetchYoutube({
  keyword,
  nextPageToken,
  callback,
}) {
  try {
    const {
      list,
      token,
    } = yield call(fetchYoutube, keyword, nextPageToken);

    yield put({
      type: nextPageToken ? FETCH_MORE_YOUTUBE_LIST_SUCCESS : FETCH_YOUTUBE_LIST_SUCCESS,
      list,
      nextPageToken: token,
    });
  } catch (error) {
    alert(error);
  } finally {
    callback();
  }
}

function* handleClearYoutubeResult() {
  yield put({ type: CLEAR_YOUTUBE_RESULT });
}

function* handleCacheBlogSearcher({ params }) {
  yield put({ type: UPDATE_MOCK_LOADING_STATUS, status: true });
  // yield new Promise((res) => setTimeout(res, 1000));
  yield put({ type: CACHE_SEARCHER, params });
  yield put({ type: UPDATE_MOCK_LOADING_STATUS, status: false });
}

export default function* rootSage() {
  yield all([
    takeEvery(FETCH_YOUTUBE_LIST, handleFetchYoutube),
    takeEvery(SAGA_CLEAR_YOUTUBE_RESULT, handleClearYoutubeResult),
    takeLatest(SAGA_CACHE_SEARCHER, handleCacheBlogSearcher),
  ]);
}
