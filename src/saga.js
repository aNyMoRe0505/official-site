import {
  put,
  all,
  takeEvery,
  takeLatest,
  call,
  take,
  fork,
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
} from './actions/Blog';

import {
  NOTIFICATION_REQUESTED,
  NOTIFICATION_UPDATE,
  NOTIFICATION_REMOVE_REQUEST,
  NOTIFICATION_REMOVE_SUCCESS,
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

function* notificatioSaga() {
  const maxNotification = 3;
  const notificationDisplayTime = 4000;
  const notificationFadeOutTIme = 700;

  let pendingNotification = [];
  let activedNotification = [];
  let notificationId = 1;

  function* removeNotification({ notification }) {
    const targetNotification = activedNotification.find((a) => a.id === notification.id);
    if (targetNotification) {
      targetNotification.open = false;
      yield put({ type: NOTIFICATION_UPDATE, newActivedNotificationList: [...activedNotification] });
      activedNotification = activedNotification.filter((a) => a.id !== targetNotification.id);
      yield call(delay, notificationFadeOutTIme);

      yield put({ type: NOTIFICATION_UPDATE, newActivedNotificationList: [...activedNotification] });
      yield put({ type: NOTIFICATION_REMOVE_SUCCESS });
    }
  }

  function* displayNotification(notification) {
    const targetNotification = { ...notification };
    activedNotification = [targetNotification, ...activedNotification];

    yield put({ type: NOTIFICATION_UPDATE, newActivedNotificationList: [...activedNotification] });
    yield call(delay, notificationDisplayTime);
    yield put({ type: NOTIFICATION_REMOVE_REQUEST, notification: targetNotification });
  }

  function* notificationScheduler() {
    while (true) {
      const payload = yield take([
        NOTIFICATION_REQUESTED,
        NOTIFICATION_REMOVE_SUCCESS,
      ]);

      if (payload.type === NOTIFICATION_REQUESTED) {
        const newNoti = {
          id: notificationId,
          message: payload.message,
          open: true,
        };
        pendingNotification = [...pendingNotification, newNoti];
        notificationId += 1;
      }

      if (pendingNotification.length && activedNotification.length < maxNotification) {
        const [firstNotification, ...remainingNotification] = pendingNotification;
        pendingNotification = remainingNotification;
        yield fork(displayNotification, firstNotification);
        yield call(delay, 300);
      }
    }
  }

  yield all([
    notificationScheduler(),
    takeEvery(NOTIFICATION_REMOVE_REQUEST, removeNotification),
  ]);
}

export default function* rootSage() {
  yield all([
    takeEvery(FETCH_YOUTUBE_LIST, handleFetchYoutube),
    takeEvery(SAGA_CLEAR_YOUTUBE_RESULT, handleClearYoutubeResult),
    takeLatest(SAGA_CACHE_SEARCHER, handleCacheBlogSearcher),
    notificatioSaga(),
  ]);
}
