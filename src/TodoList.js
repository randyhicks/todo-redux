import React from 'react';
import TodoItem from './TodoItem';
import { connect } from 'react-redux';
import { getTodosAsIds } from './index';

const TodoList = ({ todosAsIds }) => {
  return (
    <div>
      {todosAsIds.map(todoId => <TodoItem key={todoId} todoId={todoId} />)}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    todosAsIds: getTodosAsIds(state)
  };
};

const TodoListContainer = connect(mapStateToProps)(TodoList);
export default TodoListContainer;
