import _ from 'lodash';

import {
  NOTIFICATION_DISPLAYED,
  NOTIFICATION_HIDDEN,
} from '../actions/Notification';

export default (
  state = [],
  action,
) => {
  switch (action.type) {
    case NOTIFICATION_DISPLAYED:
      return [
        ...state,
        action.notification,
      ];

    case NOTIFICATION_HIDDEN:
      return _.without(state, action.notification);

    default:
      return state;
  }
};
