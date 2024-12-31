// src/components/TodoList.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
    const todos = useSelector((state: RootState) => state.todos.todos);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ul>
                {todos.map(todo => (
                    <TodoItem key={todo.id} id={todo.id} text={todo.text} completed={todo.completed} />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;