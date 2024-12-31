
import './App.css'

import React from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';


class App extends React.Component {

  render() {
    return (

      <div>
        <h1>Todo List</h1>
        <AddTodo />
        <TodoList />
      </div>

    );

  }

}

export default App
