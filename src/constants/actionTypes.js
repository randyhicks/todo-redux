const TODO_ADD = 'TODO_ADD';
const TODO_TOGGLE = 'TODO_TOGGLE';
const FILTER_SET = 'FILTER_SET';
const NOTIFICATION_HIDE = 'NOTIFICATION_HIDE';
const TODO_ADD_WITH_NOTIFICATION = 'TODO_ADD_WITH_NOTIFICATION';
const VISIBILITY_FILTERS = {
  SHOW_COMPLETED: item => item.completed,
  SHOW_INCOMPLETED: item => !item.completed,
  SHOW_ALL: item => true
};

export {
  VISIBILITY_FILTERS,
  TODO_ADD,
  TODO_TOGGLE,
  FILTER_SET,
  NOTIFICATION_HIDE,
  TODO_ADD_WITH_NOTIFICATION
};