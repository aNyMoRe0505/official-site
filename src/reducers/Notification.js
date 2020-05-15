import {
  NOTIFICATION_UPDATE,
  NOTIFICATION_UPDATE_PENDING,
} from '../actions/Notification';

export default (
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

    case NOTIFICATION_UPDATE_PENDING:
      return {
        ...state,
        pendingNotification: action.newPendingNotificationList,
      };

    default:
      return state;
  }
};
