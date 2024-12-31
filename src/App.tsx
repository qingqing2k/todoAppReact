
import './App.css'
import { Todo } from './components/Todo'
import React from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

interface TodoListState {
  todos: Todo[];

}
class App extends React.Component<{}, TodoListState> {
  state: TodoListState = {
    todos: [
      { id: 1, text: 'Learn React', completed: true },
      { id: 2, text: 'Learn TypeScript', completed: false },
      { id: 3, text: 'Learn GraphQL', completed: false },
    ],
  };
  handleAdd = (text: string) => {
    const newTodo: Todo = {
      id: this.state.todos.length + 1,
      text,
      completed: false,
    }
    this.setState({ todos: [...this.state.todos, newTodo] });
  };
  handleToggle = (id: number) => {
    this.setState({
      todos: this.state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    });
  };
  handleDelete = (id: number) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  };
  handleEdit = (id: number, text: string) => {
    this.setState({
      todos: this.state.todos.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      ),
    });
  };
  render() {
    return (
      <div className="App">
        <h1>Todo List</h1>
        <AddTodo onAdd={this.handleAdd} />
        <TodoList
          todos={this.state.todos}
          onToggle={this.handleToggle}
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
        />
      </div>
    );
  }
}

export default App
