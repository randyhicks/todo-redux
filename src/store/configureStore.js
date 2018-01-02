import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import { watchAddTodoWithNotification } from '../reducers/reducers';

const logger = createLogger();
const saga = createSagaMiddleware();

export const configureStore = () => {
  const store = createStore(
    rootReducer,
    undefined,
    applyMiddleware(saga, logger)
  );
  saga.run(watchAddTodoWithNotification);
  return store;
};
