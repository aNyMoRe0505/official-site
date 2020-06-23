import {
  put,
  call,
} from 'redux-saga/effects';

import {
  FETCH_YOUTUBE_LIST_SUCCESS,
  FETCH_MORE_YOUTUBE_LIST_SUCCESS,
  UPDATE_YOUTUBE_LOADING,
} from '../actions/Youtube';

import { fetchYoutube } from '../helper/api';

export function* handleFetchYoutube({
  keyword,
  nextPageToken,
}) {
  try {
    yield put({
      type: UPDATE_YOUTUBE_LOADING,
      loading: true,
    });

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
    yield put({
      type: UPDATE_YOUTUBE_LOADING,
      loading: false,
    });
  }
}
