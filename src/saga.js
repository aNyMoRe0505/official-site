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
  FETCH_YOUTUBE_LIST,
} from './actions/Youtube';

export default function* rootSage() {
  yield all([
    takeEvery(FETCH_YOUTUBE_LIST, handleFetchYoutube),
    notificatioSaga(),
  ]);
}
