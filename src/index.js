import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import { configureStore } from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import TodoApp from './components/TodoApp';

const store = configureStore();
console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
