import { combineReducers } from 'redux';

import { todoReducer, filterReducer, notificationReducer } from './reducers';

export default combineReducers({
  todoState: todoReducer,
  filterState: filterReducer,
  notificationState: notificationReducer
});
