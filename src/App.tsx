
import './App.css'

import React from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

import { TodoProvider } from './context/TodoProvider';
class App extends React.Component {
  
  render() {
    return (
      <TodoProvider>
      <div>
        <h1>Todo List</h1>
        <AddTodo />
        <TodoList />
      </div>
    </TodoProvider>
    );
  
  }
    
}

export default App
