import React, { Suspense, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { addTodo, deleteMultipleTodos } from '../redux/todoSlice';
import { RootState } from '../redux/store';
const DeleteConfirmModal = React.lazy(() => import('./DeleteConfirm'));


const AddTodo: React.FC = () => {
    const [text, setText] = useState('');
    const [error, setError] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todos.todos);

    // Filter selected todos
    const selectedTodos = useMemo(() => {
        return todos.filter(todo => todo.isSelect);
    }, [todos]);
    const handleAdd = () => {
        if (text.trim()) {
            dispatch(addTodo(text.trim()));
            setText('');
            setError('');
        } else {
            setError('Cannot add empty task');
        }
    };
    const handleDelete = () => {
        if (selectedTodos.length === 0) {
            setError('Chưa chọn task để xóa');
        } else {
            setIsDeleting(true);
            setError('');
        }
    };
    useEffect(() => {
        setError('');
    }, [text]);
    const confirmDelete = () => {
        dispatch(deleteMultipleTodos());
        setIsDeleting(false);
    };

    const cancelDelete = () => {
        setIsDeleting(false);
    };
    return (
        <>
            <input
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        handleAdd();
                    }
                }}
            />
            <button onClick={handleAdd}>Add</button>
            <button onClick={handleDelete}>Delete Multiple</button>
            <br />
            {error && <span style={{ color: 'red' }}>{error}</span>}
            {isDeleting && (
                <Suspense>
                    <DeleteConfirmModal
                        onConfirm={confirmDelete}
                        onCancel={cancelDelete}
                    />
                </Suspense>)}
        </>
    );


};

export default AddTodo;