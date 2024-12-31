import React from 'react';
import { TodoContext } from '../context/TodoProvider';

interface AddTodoState {
    text: string;
}
class AddTodo extends React.Component<{}, AddTodoState> {
    static contextType = TodoContext;
    declare context: React.ContextType<typeof TodoContext>;
    
    state: AddTodoState = {
        text: '',
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ text: e.target.value });
    };
    handleAdd = () => {
        this.context.addTodo(this.state.text);
        this.setState({ text: '' });
    };
    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.text}
                    onChange={this.handleChange}
                />
                <button onClick={this.handleAdd}>Add</button>
            </div>
        );
    }
}

export default AddTodo;