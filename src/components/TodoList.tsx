import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

import TodoItem from './TodoItem';

const TodoList: React.FC = () => {
    const todos = useSelector((state: RootState) => state.todos.todos);
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        if (todos.length === 0) {
            setIsShow(false); // Hide headers when no todos
        } else {
            setIsShow(true); // Show headers when there are todos
        }
    }, [todos]);
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flexDirection: 'column' }}>
            {isShow && (<div style={{ display: 'flex', width: '600px', padding: '10px', borderBottom: '1px solid #ccc', fontWeight: 'bold' }}>
                <span style={{ width: '70px' }}>Complete</span>
                <span style={{ width: '50px' }}>Select</span>
                <span style={{ flex: 1 }}>Task</span>
                <span style={{ width: '150px' }}>Actions</span>
            </div>)}
            <ul style={{ listStyleType: 'none', padding: 10, margin: 0, width: '600px' }}>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <TodoItem id={todo.id} text={todo.text} completed={todo.completed} isSelect={todo.isSelect} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;