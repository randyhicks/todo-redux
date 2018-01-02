import { schema, normalize } from 'normalizr';
import {
  TODO_ADD,
  TODO_TOGGLE,
  FILTER_SET,
  NOTIFICATION_HIDE,
  VISIBILITY_FILTERS,
  TODO_ADD_WITH_NOTIFICATION
} from '../constants/actionTypes';
import { put, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { doAddTodo, doHideNotification } from '../actions';
import uuid from 'uuid/v4';

const todoSchema = new schema.Entity('todo');

const todos = [
  { id: uuid(), name: 'Hands On: Snake with Local State' },
  { id: uuid(), name: 'Challenge: Snake with Higher Order Components' },
  { id: uuid(), name: 'Hands On: Redux Standalone with advanced Actions' },
  { id: uuid(), name: 'Hands On: Redux Standalone with advanced Reducers' },
  { id: uuid(), name: 'Hands On: Bootstrap App with Redux' },
  { id: uuid(), name: 'Hands On: Naive Todo with React and Redux' },
  { id: uuid(), name: 'Hands On: Sophisticated Todo with React and Redux' },
  { id: uuid(), name: 'Hands On: Connecting State Everywhere' },
  { id: uuid(), name: 'Challenge: Snake with React and Redux' },
  { id: uuid(), name: 'Hands On: Todo with advanced Redux' },
  { id: uuid(), name: 'Hands On: Todo with more Features' },
  { id: uuid(), name: 'Challenge: Snake with Redux' },
  { id: uuid(), name: 'Hands On: Todo with Notifications' },
  { id: uuid(), name: 'Challenge: Snake with Redux and Async Actions' },
  { id: uuid(), name: 'Hands On: Hacker News with Redux' },
  { id: uuid(), name: 'Challenge: Hacker News with beyond Redux' },
  { id: uuid(), name: 'Challenge: Hacker News with beyond Redux' },
  { id: uuid(), name: 'Hands On: Snake with MobX' },
  { id: uuid(), name: 'Hands On: Todo App with MobX' },
  { id: uuid(), name: 'Challenge: Hacker News App with MobX' },
  { id: uuid(), name: 'Challenge: Consuming a GrapQL API with Relay' }
];

const normalizedTodos = normalize(todos, [todoSchema]);

const initialTodoState = {
  entities: normalizedTodos.entities.todo,
  ids: normalizedTodos.result
};

export const todoReducer = (state = initialTodoState, action) => {
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
};

const applyAddTodo = (state, action) => {
  const todo = { ...action.todo, completed: false };
  const entities = { ...state.entities, [todo.id]: todo };
  const ids = [...state.ids, action.todo.id];
  return { ...state, entities, ids };
};

const applyToggleTodo = (state, action) => {
  const id = action.todo.id;
  const todo = state.entities[id];
  const toggledTodo = { ...todo, completed: !todo.completed };
  const entities = { ...state.entities, [id]: toggledTodo };
  return { ...state, entities };
};

export const filterReducer = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case FILTER_SET: {
      return applySetFilter(state, action);
    }
    default:
      return state;
  }
};

const applySetFilter = (state, action) => action.filter;

export function notificationReducer(state = {}, action) {
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
}

function applySetNotifyAboutAddTodo(state, action) {
  const { name, id } = action.todo;
  return { ...state, [id]: 'Todo Created: ' + name };
}

function applyRemoveNotification(state, action) {
  const { [action.id]: notificationToRemove, ...restNotifications } = state;
  return restNotifications;
}

// selectors

export function getTodosAsIds(state) {
  return state.todoState.ids
    .map(id => state.todoState.entities[id])
    .filter(VISIBILITY_FILTERS[state.filterState])
    .map(todo => todo.id);
}

export function getTodo(state, todoId) {
  return state.todoState.entities[todoId];
}

export function getNotifications(state) {
  return getArrayOfObject(state.notificationState);
}

function getArrayOfObject(object) {
  return Object.keys(object).map(key => object[key]);
}

// sagas

export function* watchAddTodoWithNotification() {
  yield takeEvery(TODO_ADD_WITH_NOTIFICATION, handleAddTodoWithNotification);
}

function* handleAddTodoWithNotification(action) {
  const { todo } = action;
  const { id, name } = todo;
  yield put(doAddTodo(id, name));
  yield delay(5000);
  yield put(doHideNotification(id));
}
