import React, { Suspense, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleTodo, editTodo, deleteTodo, ITodo, toggleSelectTodo } from '../redux/todoSlice';
import { AppDispatch } from '../redux/store';
const EditTodoModal = React.lazy(() => import('./EditTodo'));
const DeleteConfirmModal = React.lazy(() => import('./DeleteConfirm'));




const TodoItem: React.FC<ITodo> = ({ id, text, completed, isSelect }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(text);
    const [isDeleting, setIsDeleting] = useState(false);
    const dispatch: AppDispatch = useDispatch();
    const handleEdit = useCallback(() => {
        setIsEditing(true);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditText(e.target.value);
    }
    const handleSave = useCallback(() => {
        dispatch(editTodo({ id, text: editText }));
        setIsEditing(false);
    }, [editText]);
    const handleCancel = useCallback(() => {
        setIsEditing(false);
        setEditText(text);
    }, [text]);

    const confirmDelete = () => {
        dispatch(deleteTodo(id));
        setIsDeleting(false);
    };

    const cancelDelete = () => {
        setIsDeleting(false);
    };
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' }}>
                <input type="checkbox"
                    checked={completed}
                    onChange={() => dispatch(toggleTodo(id))}
                    style={{ marginRight: '10px', width: '16px', height: '16px' }} />
                <input type="checkbox"
                    checked={isSelect}
                    onChange={() => dispatch(toggleSelectTodo(id))}
                    style={{ marginRight: '10px', marginLeft: '30px', width: '16px', height: '16px' }} />
                <span style={{
                    textDecoration: completed ? 'line-through' : 'none',
                    marginRight: '10px',
                    flex: 1,
                }}>
                    {text}
                </span>
                <button onClick={handleEdit} style={{ marginRight: '5px' }}>Edit</button>
                <button onClick={() => setIsDeleting(true)}>Delete</button>
                {isEditing &&
                    (
                        <Suspense >
                            <EditTodoModal
                                text={editText}
                                onChange={handleChange}
                                onSave={handleSave}
                                onCancel={handleCancel} />
                        </Suspense>)}

                {isDeleting && (
                    <Suspense>
                        <DeleteConfirmModal
                            onConfirm={confirmDelete}
                            onCancel={cancelDelete}
                        />
                    </Suspense>
                )}
            </div>
        </div>
    );
};

export default TodoItem;