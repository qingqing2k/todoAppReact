
import './App.css'

import React, { useEffect } from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { useDispatch } from 'react-redux';
import { resetSelectTodos } from './redux/todoSlice';


const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetSelectTodos());
  }, [dispatch]);

  return (
    <div>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default App
