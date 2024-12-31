import React, { useState } from 'react';
import useTodos from './hooks/useTodo';

const App: React.FC = () => {
  const { todos, addTodo, editTodo, deleteTodo, toggleTodo } = useTodos();
  const [input, setInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState<{ id: number; text: string } | null>(null);
  const [editInput, setEditInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      addTodo(input);
      setInput('');
    }
  };

  const openEditModal = (todo: { id: number; text: string }) => {
    setIsEditing(true);
    setCurrentTodo(todo);
    setEditInput(todo.text);
  };

  const handleEdit = () => {
    if (currentTodo && editInput.trim()) {
      editTodo(currentTodo.id, editInput);
      setIsEditing(false);
      setCurrentTodo(null);
      setEditInput('');
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Add todo"
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <button onClick={() => openEditModal(todo)}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      {isEditing && currentTodo && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#fff',
              padding: '1rem',
              borderRadius: '4px'
            }}
          >
            <h2>Edit Todo</h2>
            <input
              value={editInput}
              onChange={e => setEditInput(e.target.value)}
            />
            <button onClick={handleEdit}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;