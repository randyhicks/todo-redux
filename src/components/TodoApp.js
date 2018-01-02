import React from 'react';
import TodoList from './TodoList';
import TodoCreate from './TodoCreate';
import Filter from './Filter';
import Notifications from './Notifications';

const TodoApp = ({ todos, onToggleTodo }) => (
  <div>
    <Filter />
    <TodoCreate />
    <TodoList todos={todos} onToggleTodo={onToggleTodo} />
    <Notifications />
  </div>
);

export default TodoApp;
