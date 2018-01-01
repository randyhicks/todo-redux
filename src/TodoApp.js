import React from 'react';
import TodoList from './TodoList';
import TodoCreate from './TodoCreate';

const TodoApp = ({ todos, onToggleTodo }) => (
  <div>
    <TodoCreate />
    <TodoList todos={todos} onToggleTodo={onToggleTodo} />
  </div>
);

export default TodoApp;
