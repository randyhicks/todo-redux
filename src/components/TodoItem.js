import React from 'react';
import { connect } from 'react-redux';
import { doToggleTodo } from '../actions';
import { getTodo } from '../reducers/reducers';
import { Button } from 'antd';

const TodoItem = ({ todo, onToggleTodo }) => {
  const { name, id, completed } = todo;
  return (
    <div>
      <Button
        size={'small'}
        primary
        style={{ marginRight: 15 }}
        type={completed ? 'button' : 'primary'}
        onClick={() => onToggleTodo(id)}
      >
        {completed ? 'Complete' : 'Incomplete'}
      </Button>
      {name}
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
