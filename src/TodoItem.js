import React from 'react';
import { connect } from 'react-redux';
import { doToggleTodo } from './index';
import { getTodo } from './index';

const TodoItem = ({ todo, onToggleTodo }) => {
  const { name, id, completed } = todo;
  return (
    <div>
      {name}
      <button type="button" onClick={() => onToggleTodo(id)}>
        {completed ? 'Complete' : 'Incomplete'}
      </button>
    </div>
  );
};

const mapDispatchToProps = {
  onToggleTodo: id => doToggleTodo(id)
};

const mapStateToProps = (state, props) => {
  return {
    todo: getTodo(state, props.todoId)
  };
};

const TodoItemContainer = connect(mapStateToProps, mapDispatchToProps)(
  TodoItem
);
export default TodoItemContainer;
