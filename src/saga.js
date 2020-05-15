import {
  all,
  takeEvery,
  takeLatest,
} from 'redux-saga/effects';

import {
  handleFetchYoutube,
  handleClearYoutubeResult,
} from './saga/Youtube';
import {
  handleCacheBlogSearcher,
} from './saga/Blog';
import {
  notificatioSaga,
} from './saga/Notification';

import {
  FETCH_YOUTUBE_LIST,
  SAGA_CLEAR_YOUTUBE_RESULT,
} from './actions/Youtube';

import {
  SAGA_CACHE_SEARCHER,
} from './actions/Blog';


export default function* rootSage() {
  yield all([
    takeEvery(FETCH_YOUTUBE_LIST, handleFetchYoutube),
    takeEvery(SAGA_CLEAR_YOUTUBE_RESULT, handleClearYoutubeResult),
    takeLatest(SAGA_CACHE_SEARCHER, handleCacheBlogSearcher),
    notificatioSaga(),
  ]);
}
