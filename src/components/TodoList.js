import React from 'react';
import TodoItem from './TodoItem';
import { connect } from 'react-redux';
import { getTodosAsIds } from '../reducers/reducers';
import { List, Layout } from 'antd';
const { Content } = Layout;

const TodoList = ({ todosAsIds }) => {
  return (
    <Layout>
      <Content style={{ backgroundColor: '#fff', margin: 50, padding: 25 }}>
        <List
          size={'small'}
          dataSource={todosAsIds}
          renderItem={todoId => (
            <List.Item>
              <TodoItem key={todoId} todoId={todoId} />
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

const mapStateToProps = state => {
  return {
    todosAsIds: getTodosAsIds(state)
  };
};

const TodoListContainer = connect(mapStateToProps)(TodoList);
export default TodoListContainer;
