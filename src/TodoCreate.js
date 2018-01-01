import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doAddTodo } from './index';
import uuid from 'uuid/v4';

class TodoCreate extends Component {
  state = {
    value: ''
  };

  onChangeName = event => {
    this.setState({ value: event.target.value });
  };

  onCreateTodo = event => {
    this.props.onAddTodo(this.state.value);
    this.setState({ value: '' });
    event.preventDefault();
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <form onSubmit={this.onCreateTodo}>
          <input
            type="text"
            placeholder="Add Todo..."
            value={value}
            onChange={this.onChangeName}
          />
          <button type="submit">Add Todo</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  onAddTodo: name => doAddTodo(uuid(), name)
};

const TodoCreateContainer = connect(null, mapDispatchToProps)(TodoCreate);
export default TodoCreateContainer;
