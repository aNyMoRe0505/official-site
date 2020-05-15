import {
  put,
  call,
} from 'redux-saga/effects';

import {
  FETCH_YOUTUBE_LIST_SUCCESS,
  FETCH_MORE_YOUTUBE_LIST_SUCCESS,
  CLEAR_YOUTUBE_RESULT,
} from '../actions/Youtube';

import { fetchYoutube } from '../helper/api';

export function* handleFetchYoutube({
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

export function* handleClearYoutubeResult() {
  yield put({ type: CLEAR_YOUTUBE_RESULT });
}
