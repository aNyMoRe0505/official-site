import { combineReducers } from 'redux';

import Youtube from './Youtube';
import Blog from './Blog';
import Notification from './Notification';

export default combineReducers({
  Youtube,
  Blog,
  Notification,
});
