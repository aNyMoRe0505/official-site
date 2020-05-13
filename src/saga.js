import {
  put,
  all,
  takeEvery,
  takeLatest,
  call,
  take,
  fork,
} from 'redux-saga/effects';
import _ from 'lodash';

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
} from './actions/Blog';

import {
  NOTIFICATION_REQUESTED,
  NOTIFICATION_DISPLAYED,
  NOTIFICATION_HIDDEN,
} from './actions/Notification';

import { fetchYoutube } from './helper/api';

const delay = (ms) => new Promise((resolove) => setTimeout(resolove, ms));

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
  yield put({ type: CACHE_SEARCHER, params });
}

function* notificationSaga() {
  const maxNotification = 3;
  const notificationDisplayTime = 4000;

  let pendingNotifications = [];
  let activedNotification = [];

  function* displayNotification(notification) {
    if (activedNotification.length >= maxNotification) {
      throw new Error(`can't display more than ${maxNotification} at the same time`);
    }
    yield put({ type: NOTIFICATION_DISPLAYED, notification });
    activedNotification = [...activedNotification, notification];
    yield call(delay, notificationDisplayTime);
    yield put({ type: NOTIFICATION_HIDDEN, notification });
    activedNotification = _.without(activedNotification, notification);
  }

  function* notificationRequestsWatcher() {
    while (true) {
      const { notification } = yield take(NOTIFICATION_REQUESTED);
      pendingNotifications = [...pendingNotifications, notification];
    }
  }

  function* notificationScheduler() {
    while (true) {
      const canDisplayNotification = activedNotification.length < maxNotification && pendingNotifications.length;
      if (canDisplayNotification) {
        const [firstNotification, ...remainingNotification] = pendingNotifications;
        pendingNotifications = remainingNotification;
        yield fork(displayNotification, firstNotification);
        yield call(delay, 300);
      } else {
        yield call(delay, 50);
      }
    }
  }

  yield all([
    call(notificationRequestsWatcher),
    call(notificationScheduler),
  ]);
}

export default function* rootSage() {
  yield all([
    takeEvery(FETCH_YOUTUBE_LIST, handleFetchYoutube),
    takeEvery(SAGA_CLEAR_YOUTUBE_RESULT, handleClearYoutubeResult),
    takeLatest(SAGA_CACHE_SEARCHER, handleCacheBlogSearcher),
    notificationSaga(),
  ]);
}
