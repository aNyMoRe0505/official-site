import {
  put,
  all,
  takeEvery,
  call,
  take,
  fork,
  select,
} from 'redux-saga/effects';

import {
  NOTIFICATION_REQUESTED,
  NOTIFICATION_UPDATE,
  NOTIFICATION_REMOVE_REQUEST,
  NOTIFICATION_REMOVE,
  NOTIFICATION_UPDATE_PENDING,
} from '../actions/Notification';

const delay = (ms) => new Promise((resolove) => setTimeout(resolove, ms));

export function* notificatioSaga() {
  const maxNotification = 3;
  const notificationDisplayTime = 4000;
  const notificationFadeOutTime = 500;

  let notificationId = 1;

  function* notificationScheduler() {
    const activedNotification = yield select((state) => state.Notification.activedNotification);
    const pendingNotification = yield select((state) => state.Notification.pendingNotification);
    // 檢查通知數量
    if (pendingNotification.length && activedNotification.length < maxNotification) {
      const [firstNotification, ...remainPendingNotification] = pendingNotification;
      const newPendingNotificationList = remainPendingNotification;
      yield put({ type: NOTIFICATION_UPDATE_PENDING, newPendingNotificationList });

      const newActivedNotificationList = [firstNotification, ...activedNotification];
      yield put({ type: NOTIFICATION_UPDATE, newActivedNotificationList });
      // 最多顯示4秒
      yield call(delay, notificationDisplayTime);
      // 移除
      yield put({ type: NOTIFICATION_REMOVE_REQUEST, notification: firstNotification });
    }
  }

  function* handleRemoveNotification({ notification }) {
    const activedNotification = yield select((state) => state.Notification.activedNotification);
    // 檢查還存不存在 (手動先刪除了 => notificationScheduler的 remove request還是會打)
    const targetNotification = activedNotification.find((ac) => ac.id === notification.id);
    if (targetNotification) {
      // 將 open 設成 true 讓前端執行 fadeout 動畫, 同個 ref 所以可直接更新
      targetNotification.open = false;
      yield put({ type: NOTIFICATION_UPDATE, newActivedNotificationList: [...activedNotification] });
      // 動畫執行完成後才將空間清出
      yield call(delay, notificationFadeOutTime);
      yield put({ type: NOTIFICATION_REMOVE, notification: targetNotification });
      // remove 後要檢查是否有 pending的通知 有的話顯示
      yield fork(notificationScheduler);
    }
  }

  function* handleNotificationRequest() {
    while (true) {
      const { message } = yield take(NOTIFICATION_REQUESTED);
      const pendingNotification = yield select((state) => state.Notification.pendingNotification);
      const newRequestedNotification = {
        id: notificationId,
        message,
        open: true,
      };
      notificationId += 1;
      // 將通知排程
      const newPendingNotificationList = [...pendingNotification, newRequestedNotification];
      yield put({ type: NOTIFICATION_UPDATE_PENDING, newPendingNotificationList });
      // 執行 schedule 去顯示通知
      yield fork(notificationScheduler);
      // 避免太多request進來 噴的速度太快 用 call 來造成間格, 在300毫秒之後才會繼續監聽 NOTIFICATION_REQUESTED
      yield call(delay, 300);
    }
  }

  yield all([
    handleNotificationRequest(),
    takeEvery(NOTIFICATION_REMOVE_REQUEST, handleRemoveNotification),
  ]);
}
