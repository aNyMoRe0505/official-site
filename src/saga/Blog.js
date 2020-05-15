import {
  put,
} from 'redux-saga/effects';

import {
  CACHE_SEARCHER,
} from '../actions/Blog';

export function* handleCacheBlogSearcher({ params }) {
  yield put({ type: CACHE_SEARCHER, params });
}
