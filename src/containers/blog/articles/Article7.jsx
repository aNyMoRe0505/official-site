import React, { memo } from 'react';

import Text from '../../../components/blog/Text';
import Title from '../../../components/blog/Title';
import Code from '../../../components/blog/Code';
import List from '../../../components/blog/List';
import Reference from '../../../components/blog/Reference';

import { ARTICLE_META_TYPE } from '../../../helper/article';

function Article7() {
  return (
    <>
      <Title>
        用 redux-saga 製作通知系統
      </Title>
      <Text
        meta={[{
          start: 33,
          end: 34,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout',
        }]}
      >
        為了更理解 redux-saga，在 survey 的時候偶然看到這篇 stackoverflow 上的問題
      </Text>
      <Text>
        下面某個回答有提到用 redux-saga 製作通知系統，於是我就想說自己也來做一個，分享我覺得怎麼寫會更合適
      </Text>
      <Text>
        另外我覺得那篇討論串蠻值得去看的，有空可以去仔細看完～
      </Text>
      <Text
        meta={[{
          start: 27,
          end: 34,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://anymore0505.github.io/official-site/practice/notification',
        }]}
      >
        首先提一下這個通知系統有什麼功能和思考方向，成品放在 practice 裡面，可以自己去玩玩看
      </Text>
      <List
        title="主要功能"
        list={[{
          text: '顯示發起的通知',
        }, {
          text: '一個通知最多顯示4秒',
        }, {
          text: '自動將通知移除',
        }, {
          text: '可以顯示多個通知，但最多3個',
        }, {
          text: '如果目前顯示的通知為3個，後續發起的通知可以列隊延遲顯示',
        }]}
      />
      <Text
        meta={[{
          start: 6,
          end: 12,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/38574266#38574266',
        }]}
      >
        首先先來看看原文中的程式碼如何達成以上功能
      </Text>
      <Code>
        {`function* toastSaga() {

// Some config constants
const MaxToasts = 3;
const ToastDisplayTime = 4000;


// Local generator state: you can put this state in Redux store
// if it's really important to you, in my case it's not really
let pendingToasts = []; // A queue of toasts waiting to be displayed
let activeToasts = []; // Toasts currently displayed


// Trigger the display of a toast for 4 seconds
function* displayToast(toast) {
    if ( activeToasts.length >= MaxToasts ) {
        throw new Error("can't display more than " + MaxToasts + " at the same time");
    }
    activeToasts = [...activeToasts,toast]; // Add to active toasts
    yield put(events.toastDisplayed(toast)); // Display the toast (put means dispatch)
    yield call(delay,ToastDisplayTime); // Wait 4 seconds
    yield put(events.toastHidden(toast)); // Hide the toast
    activeToasts = _.without(activeToasts,toast); // Remove from active toasts
}

// Everytime we receive a toast display request, we put that request in the queue
function* toastRequestsWatcher() {
    while ( true ) {
        // Take means the saga will block until TOAST_DISPLAY_REQUESTED action is dispatched
        const event = yield take(Names.TOAST_DISPLAY_REQUESTED);
        const newToast = event.data.toastData;
        pendingToasts = [...pendingToasts,newToast];
    }
}


// We try to read the queued toasts periodically and display a toast if it's a good time to do so...
function* toastScheduler() {
    while ( true ) {
        const canDisplayToast = activeToasts.length < MaxToasts && pendingToasts.length > 0;
        if ( canDisplayToast ) {
            // We display the first pending toast of the queue
            const [firstToast,...remainingToasts] = pendingToasts;
            pendingToasts = remainingToasts;
            // Fork means we are creating a subprocess that will handle the display of a single toast
            yield fork(displayToast,firstToast);
            // Add little delay so that 2 concurrent toast requests aren't display at the same time
            yield call(delay,300);
        }
        else {
            yield call(delay,50);
        }
    }
}

// This toast saga is a composition of 2 smaller "sub-sagas" (we could also have used fork/spawn effects here, the difference is quite subtile: it depends if you want toastSaga to block)
yield [
    call(toastRequestsWatcher),
    call(toastScheduler)
  ]
}`}
      </Code>
      <List
        prefixType="DOT"
        title="toastRequestsWatcher"
        list={[{
          meta: [{
            start: 5,
            end: 27,
            type: ARTICLE_META_TYPE.BLOCK,
          }],
          text: '監聽每次 TOAST_DISPLAY_REQUESTED 請求',
        }, {
          meta: [{
            start: 18,
            end: 30,
            type: ARTICLE_META_TYPE.BLOCK,
          }],
          text: '將該次請求通知排進第10行定義好的 pendingToasts(列隊的通知)',
        }]}
      />
      <List
        prefixType="DOT"
        title="toastScheduler"
        list={[{
          meta: [{
            start: 27,
            end: 38,
            type: ARTICLE_META_TYPE.BLOCK,
          }, {
            start: 48,
            end: 56,
            type: ARTICLE_META_TYPE.BLOCK,
          }],
          text: '每50毫秒檢查一次目前有沒有列隊中的通知和目前通知 (activeToasts) 是否小於3 (MaxToasts)',
        }, {
          meta: [{
            start: 23,
            end: 34,
            type: ARTICLE_META_TYPE.BLOCK,
          }],
          text: '如果達成條件，將第一個列隊中的通知取出顯示 (displayToast)',
        }, {
          text: '顯示之後延遲300毫秒並免通知出現速度過快',
        }]}
      />
      <List
        prefixType="DOT"
        title="displayToast"
        list={[{
          meta: [{
            start: 6,
            end: 19,
            type: ARTICLE_META_TYPE.BLOCK,
          }, {
            start: 34,
            end: 45,
            type: ARTICLE_META_TYPE.BLOCK,
          }],
          text: '負責處理從 toastScheduler 發起的通知，將該通知排進 activeToasts 讓前端顯示',
        }, {
          text: '4秒後將該通知移除',
        }]}
      />
      <Text
        meta={[{
          start: 29,
          end: 51,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        以上的程式碼可以正常的運作，只要在前端 dispatch TOAST_DISPLAY_REQUESTED 即可，但我覺得有幾個缺點
      </Text>
      <List
        prefixType="DOT"
        list={[{
          text: '在20行更新 store 裡的 activeToasts，讓前端可以拿到顯示，既然都已經存在 store 了，何必在11行又定義一次，還要注意兩邊有沒有 sync',
        }, {
          text: '16 ~ 18行應該可以不用，已經在40 ~ 41行判斷過了',
        }, {
          text: '使用者無法主動關閉通知，一定要等4秒',
        }, {
          text: '沒辦法讓通知有 fadeout 的效果',
        }, {
          meta: [{
            start: 9,
            end: 22,
            type: ARTICLE_META_TYPE.BLOCK,
          }],
          text: '最大的問題應該是 toastScheduler，toastScheduler 並沒有監聽任何 action，而是持續每隔50毫秒檢查一次，如果在 while 內下 console 會發現該部分會一直執行',
        }]}
      />
      <Text>
        於是根據以上所列的缺點，我將程式碼改為以下這樣
      </Text>
      <Code>
        {`function* notificatioSaga() {
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
}`}
      </Code>
      <List
        prefixType="DOT"
        title="參數部分 2 ~ 6行"
        list={[{
          meta: [{
            start: 3,
            end: 25,
            type: ARTICLE_META_TYPE.BLOCK,
          }],
          text: '多了 notificationFadeOutTime，因為前端設定 fadeOut 的秒數為500毫秒，我想讓動畫執行完後在將通知空間移除',
        }, {
          meta: [{
            start: 3,
            end: 16,
            type: ARTICLE_META_TYPE.BLOCK,
          }],
          text: '還有 notificationId，用來辨別使用者主動關閉了哪一個通知',
        }]}
      />
      <List
        prefixType="DOT"
        title="handleNotificationRequest"
        list={[{
          meta: [{
            start: 5,
            end: 26,
            type: ARTICLE_META_TYPE.BLOCK,
          }],
          text: '監聽每次 NOTIFICATION_REQUESTED 事件',
        }, {
          text: '將列隊中的通知從 store 取出，將該通知排程',
        }, {
          meta: [{
            start: 17,
            end: 18,
            type: ARTICLE_META_TYPE.BLOCK,
          }, {
            start: 20,
            end: 26,
            type: ARTICLE_META_TYPE.BLOCK,
          }, {
            start: 28,
            end: 31,
            type: ARTICLE_META_TYPE.BLOCK,
          }],
          text: '可以發現46 ~ 50行通知包含了id、message、open，open是拿來判斷是否執行 fadeout 動畫的依據',
        }, {
          meta: [{
            start: 6,
            end: 26,
            type: ARTICLE_META_TYPE.BLOCK,
          }],
          text: '最後去執行 notificationScheduler 並且延遲300毫秒',
        }]}
      />
      <List
        prefixType="DOT"
        title="notificationScheduler"
        list={[{
          text: '將顯示中和列隊中的通知從 store 取出，檢查可不可以顯示下一個通知',
        }, {
          text: '和之前一樣，如果條件過了的話將第一個列隊中的通知取出並顯示 (13 ~ 18行)',
        }, {
          meta: [{
            start: 28,
            end: 51,
            type: ARTICLE_META_TYPE.BLOCK,
          }],
          text: '20 ~ 22行，延遲四秒後自動將通知移除，我利用一個 handleRemoveNotification 來處理移除事件',
        }]}
      />
      <List
        prefixType="DOT"
        title="handleRemoveNotification"
        list={[{
          meta: [{
            start: 5,
            end: 31,
            type: ARTICLE_META_TYPE.BLOCK,
          }],
          text: '監聽每次 NOTIFICATION_REMOVE_REQUEST 事件',
        }, {
          text: '在27 ~ 30行檢查該通知還存不存在在 store 中，因為可能該通知已經被使用者主動刪除而非自動4秒後刪除',
        }, {
          text: '條件過了之後我們先將該通知 open 的 attribute 改成 false，代表要執行 fadeout，更新後延遲500毫秒讓前端進行動畫',
        }, {
          meta: [{
            start: 5,
            end: 23,
            type: ARTICLE_META_TYPE.BLOCK,
          }, {
            start: 37,
            end: 57,
            type: ARTICLE_META_TYPE.BLOCK,
          }],
          text: '最後執行 NOTIFICATION_REMOVE 將該通知移除，並且執行 notificationScheduler 檢查是否有列隊通知',
        }]}
      />
      <Text
        meta={[{
          start: 32,
          end: 58,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        這樣就解決了以上的缺點，統一從 store 取出通知，並且監聽 NOTIFICATION_REMOVE_REQUEST，讓使用者可以自己主動關閉通知
      </Text>
      <Text
        meta={[{
          start: 28,
          end: 49,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 53,
          end: 79,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 95,
          end: 115,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        也不會每隔50毫秒就去檢查是否有列隊中的通知，約定只有 NOTIFICATION_REQUESTED 和 NOTIFICATION_REMOVE_REQUEST 事件發生，才需要去檢查執行 notificationScheduler 讓通知顯示
      </Text>
      <Text
        meta={[{
          start: 14,
          end: 32,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 45,
          end: 68,
          type: ARTICLE_META_TYPE.BLOCK,
        }, {
          start: 77,
          end: 95,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        你可能會有疑問說明明已經有 NOTIFICATION_UPDATE 這個事件了，為什麼在 handleRemoveNotification 裡 36行用 NOTIFICATION_REMOVE 來移除通知呢
      </Text>
      <Text>
        也就是為什麼不這樣寫
      </Text>
      <Code>
        {`  function* handleRemoveNotification({ notification }) {
    const activedNotification = yield select((state) => state.Notification.activedNotification);
    // 檢查還存不存在 (手動先刪除了 => notificationScheduler的 remove request還是會打)
    const targetNotification = activedNotification.find((ac) => ac.id === notification.id);
    if (targetNotification) {
      // 將 open 設成 true 讓前端執行 fadeout 動畫, 同個 ref 所以可直接更新
      targetNotification.open = false;
      yield put({ type: NOTIFICATION_UPDATE, newActivedNotificationList: [...activedNotification] });
      // 動畫執行完成後才將空間清出
      yield call(delay, notificationFadeOutTime);
      const newActivedNotificationList = activedNotification.filter((ac) => ac.id !== targetNotification.id);
      yield put({ type: NOTIFICATION_UPDATE, newActivedNotificationList });

      // remove 後要檢查是否有 pending的通知 有的話顯示
      yield fork(notificationScheduler);
    }
  }`}
      </Code>
      <Text>
        如果這樣寫的話，會發現通知有時候會少清除，原因是這樣的
      </Text>
      <Text>
        假設我們連續打了兩個通知，接受下一個通知的延遲為300毫秒，動畫執行時間為500毫秒
      </Text>
      <Text>
        第一個通知發出了移除通知請求 &gt; 延遲500毫秒 &gt; 第二個通知也執行了移除通知請求
      </Text>
      <Text
        meta={[{
          start: 32,
          end: 39,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        第一個通知第2行取得的通知為自己，而第二個通知第2行取得的通知為第一個通知和自己
      </Text>
      <Text>
        最後延遲結束後第一個通知的 request 會把自己移除將顯示中的通知更新為空陣列
      </Text>
      <Text
        meta={[{
          start: 22,
          end: 35,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        但第二個通知的 request 延遲結束後，會將自己移除並保留第一個通知，也就造成了少移除的狀況！
      </Text>
      <Text>
        其實也可以在延遲結束後在 select 一次，但我不想重複 select 所以才寫了 NOTIFICATION_REMOVE
      </Text>
      <Text
        meta={[{
          start: 43,
          end: 47,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://github.com/aNyMoRe0505/official-site',
        }]}
      >
        附一下 Notification 的 reducer，完整原始碼有興趣其實也可以把這個網站的專案 clone 下來～
      </Text>
      <Code>
        {`export default (
  state = {
    activedNotification: [],
    pendingNotification: [],
  },
  action,
) => {
  switch (action.type) {
    case NOTIFICATION_UPDATE:
      return {
        ...state,
        activedNotification: action.newActivedNotificationList,
      };

    case NOTIFICATION_REMOVE:
      return {
        ...state,
        activedNotification: state.activedNotification.filter((ac) => ac.id !== action.notification.id),
      };

    case NOTIFICATION_UPDATE_PENDING:
      return {
        ...state,
        pendingNotification: action.newPendingNotificationList,
      };

    default:
      return state;
  }
};`}
      </Code>
      <Text>
        另外我還想提下 while (true) 和 takeEvery 的差別在哪裡
      </Text>
      <Code>
        {`yield all([
    handleNotificationRequest(),
    takeEvery(NOTIFICATION_REMOVE_REQUEST, handleRemoveNotification),
  ]);`}
      </Code>
      <Text>
        為什麼 handleNotificationRequest 我採用 while (true) 而 handleRemoveNotification 我使用 takeEvery 呢?
      </Text>
      <Text>
        我會在 handleNotificationRequest 使用 delay 來讓通知的請求速度不會過快
      </Text>
      <Text
        meta={[{
          start: 13,
          end: 48,
          type: ARTICLE_META_TYPE.STRONG,
        }]}
      >
        也就是說，如果延遲不結束，我們就無法接收到 NOTIFICATION_REQUESTED 的請求！
      </Text>
      <Text
        meta={[{
          start: 37,
          end: 86,
          type: ARTICLE_META_TYPE.BLOCK,
        }]}
      >
        而 takeEvery 不會讓每個請求遺失，如果使用 takeEvery yield call(delay, 300) 其實就是 yield fork(delay, 300)
      </Text>
      <Text
        meta={[{
          start: 25,
          end: 26,
          type: ARTICLE_META_TYPE.LINK,
          url: 'https://github.com/redux-saga/redux-saga/issues/684',
        }]}
      >
        這樣我們的延遲就不會有效果了，更清楚地解釋可以參考這邊
      </Text>
      <Reference
        list={[{
          text: '原文程式碼',
          url: 'https://stackoverflow.com/questions/35411423/how-to-dispatch-a-redux-action-with-a-timeout/38574266#38574266',
        }, {
          text: 'Different ways to watch actions',
          url: 'https://github.com/redux-saga/redux-saga/issues/684',
        }, {
          text: "dufia's gist",
          url: 'https://gist.github.com/dufia/09d76a2cdfe1e0abeae934a8dfd7dd29',
        }]}
      />
    </>
  );
}

export default memo(Article7);
