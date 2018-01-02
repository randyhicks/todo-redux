import * as types from '../constants/actionTypes';

export function doAddTodoWithNotification(id, name) {
  return {
    type: types.TODO_ADD_WITH_NOTIFICATION,
    todo: { id, name }
  };
}

export function doHideNotification(id) {
  return {
    type: types.NOTIFICATION_HIDE,
    id
  };
}

export function doAddTodo(id, name) {
  return {
    type: types.TODO_ADD,
    todo: { id, name }
  };
}

export function doToggleTodo(id) {
  return {
    type: types.TODO_TOGGLE,
    todo: { id }
  };
}

export function doSetFilter(filter) {
  return {
    type: types.FILTER_SET,
    filter
  };
}
