import React from 'react';
import TodoList from './TodoList';
import TodoCreate from './TodoCreate';
import Filter from './Filter';

const TodoApp = ({ todos, onToggleTodo }) => (
  <div>
    <Filter />
    <TodoCreate />
    <TodoList todos={todos} onToggleTodo={onToggleTodo} />
  </div>
);

export default TodoApp;
