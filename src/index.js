import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { createLogger } from 'redux-logger';
import { schema, normalize } from 'normalizr';
import { put, takeEvery } from 'redux-saga/effects';
import createSagaMiddleware, { delay } from 'redux-saga';
import './index.css';
import TodoApp from './TodoApp';
import registerServiceWorker from './registerServiceWorker';
import NotificationsContainer from './Notifications';

// CONSTANTS
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

// INITIAL STATE

const todos = [
  { id: 1, name: 'Hands On: Redux Standalone with advanced Actions' },
  { id: 2, name: 'Hands On: Redux Standalone with advanced Reducers' },
  { id: 3, name: 'Hands On: Bootstrap App with Redux' },
  { id: 4, name: 'Hands On: Naive Todo with React and Redux' },
  { id: 5, name: 'Hands On: Sophisticated Todo with React and Redux' },
  { id: 6, name: 'Hands On: Connecting State Everywhere' },
  { id: 7, name: 'Hands On: Todo with advanced Redux' },
  { id: 8, name: 'Hands On: Todo but more Features' },
  { id: 9, name: 'Hands On: Todo with Notifications' },
  { id: 10, name: 'Hands On: Hacker News with Redux' }
];

// SCHEMAS
const todoSchema = new schema.Entity('todo');
const normalizedTodos = normalize(todos, [todoSchema]);
console.log(normalizedTodos);
const initialTodoState = {
  entities: normalizedTodos.entities.todo,
  ids: normalizedTodos.result
};

const logger = createLogger();
const saga = createSagaMiddleware();

function* watchAddTodoWithNotification() {
  yield takeEvery(TODO_ADD_WITH_NOTIFICATION, handleAddTodoWithNotification);
}

function* handleAddTodoWithNotification(action) {
  const { todo } = action;
  const { id, name } = todo;
  yield put(doAddTodo(id, name));
  yield delay(5000);
  yield put(doHideNotification(id));
}

// REDUCERS

function todoReducer(state = initialTodoState, action) {
  switch (action.type) {
    case TODO_ADD: {
      return applyAddTodo(state, action);
    }
    case TODO_TOGGLE: {
      return applyToggleTodo(state, action);
    }
    default:
      return state;
  }
}

const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case TODO_ADD: {
      return applySetNotifyAboutAddTodo(state, action);
    }
    case NOTIFICATION_HIDE: {
      return applyRemoveNotification(state, action);
    }
    default:
      return state;
  }
};

const applyRemoveNotification = (state, action) => {
  const {
    [action.id]: notificationToRemove,
    ...restNotifications
  } = this.state;
  return restNotifications;
};

const applySetNotifyAboutAddTodo = (state, action) => {
  const { name, id } = action.todo;
  return { ...state, [id]: 'Todo Created: ' + name };
};

function applyAddTodo(state, action) {
  const todo = { ...action.todo, completed: false };
  const entities = { ...state.entities, [todo.id]: todo };
  const ids = [...state.ids, action.todo.id];
  return { ...state, entities, ids };
}

function applyToggleTodo(state, action) {
  const id = action.todo.id;
  const todo = state.entities[id];
  const toggledTodo = { ...todo, completed: !todo.completed };
  const entities = { ...state.entities, [id]: toggledTodo };
  return { ...state, entities };
}

function filterReducer(state = 'SHOW_ALL', action) {
  switch (action.type) {
    case FILTER_SET: {
      return applySetFilter(state, action);
    }
    default:
      return state;
  }
}

function applySetFilter(state, action) {
  return action.filter;
}

// ACTION CREATORS

export const doAddTodo = (id, name) => ({
  type: TODO_ADD,
  todo: { id, name }
});

export const doToggleTodo = id => ({
  type: TODO_TOGGLE,
  todo: { id }
});

export const doSetFilter = filter => ({
  type: FILTER_SET,
  filter
});

const doHideNotification = id => ({
  type: NOTIFICATION_HIDE,
  id
});

export const doAddTodoWithNotification = (id, name) => ({
  type: TODO_ADD_WITH_NOTIFICATION,
  todo: { id, name }
});

export const getTodosAsIds = state => {
  return state.todoState.ids
    .map(id => state.todoState.entities[id])
    .filter(VISIBILITY_FILTERS[state.filterState])
    .map(todo => todo.id);
};

export const getTodo = (state, todoId) => {
  return state.todoState.entities[todoId];
};

export const getNotifications = state => {
  return getArrayOfObject(state.notificationState);
};

const getArrayOfObject = object => {
  return Object.keys(object).map(key => object[key]);
};

const rootReducer = combineReducers({
  todoState: todoReducer,
  filterState: filterReducer,
  notificationState: notificationReducer
});

const store = createStore(
  rootReducer,
  undefined,
  applyMiddleware(saga, logger)
);

saga.run(watchAddTodoWithNotification);

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
