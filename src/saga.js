import {
  all,
  takeEvery,
} from 'redux-saga/effects';

import {
  handleFetchYoutube,
} from './saga/Youtube';
import {
  notificatioSaga,
} from './saga/Notification';
import {
  handleFetchBlog,
} from './saga/Blog';

import {
  FETCH_YOUTUBE_LIST,
} from './actions/Youtube';
import {
  FETCH_BLOG_REQUEST,
} from './actions/Blog';

export default function* rootSage() {
  yield all([
    takeEvery(FETCH_YOUTUBE_LIST, handleFetchYoutube),
    notificatioSaga(),
    takeEvery(FETCH_BLOG_REQUEST, handleFetchBlog),
  ]);
}
