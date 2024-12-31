import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, editTodo, deleteTodo } from '../redux/todoSlice';
import { AppDispatch } from '../redux/store';
import EditTodoModal from './EditTodo';

interface TodoItemProps {
    id: number;
    text: string;
    completed: boolean;
}

const TodoItem: React.FC<TodoItemProps> = ({ id, text, completed }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(text);
    const dispatch: AppDispatch = useDispatch();
    const handleEdit = () => {
        setIsEditing(true);
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditText(e.target.value);
    }
    const handleSave = () => {
        dispatch(editTodo({ id, text: editText }));
        setIsEditing(false);
    }
    const handleCancel = () => {
        setIsEditing(false);
        setEditText(text);
    }
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input type="checkbox"
                    checked={completed}
                    onChange={() => dispatch(toggleTodo(id))} />
                <span style={{
                    textDecoration: completed ? 'line-through' : 'none',
                    marginRight: '10px',
                }}>
                    {text}
                </span>
                <button onClick={handleEdit} style={{ marginRight: '5px' }}>Edit</button>
                <button onClick={() => dispatch(deleteTodo(id))}>Delete</button>
                {isEditing &&
                    (<EditTodoModal
                        text={editText}
                        onChange={handleChange}
                        onSave={handleSave}
                        onCancel={handleCancel} />)}
            </div>
        </div>
    );
};

export default TodoItem;