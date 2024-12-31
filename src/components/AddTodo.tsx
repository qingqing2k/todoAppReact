import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { addTodo } from '../redux/todoSlice';


const AddTodo: React.FC = () => {
    const [text, setText] = useState('');
    const dispatch: AppDispatch = useDispatch();
    return (
        <><input type="text" value={text}
            onChange={e => setText(e.target.value)} />
            <button onClick={() => {
                dispatch(addTodo(text));
                setText('');
            }}>Add</button>
        </>


    );
};

export default AddTodo;
