import {
  NOTIFICATION_UPDATE,
} from '../actions/Notification';

export default (
  state = {
    activedNotification: [],
  },
  action,
) => {
  switch (action.type) {
    case NOTIFICATION_UPDATE:
      return {
        ...state,
        activedNotification: action.newActivedNotificationList,
      };

    default:
      return state;
  }
};
