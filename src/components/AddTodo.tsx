import React from 'react';

interface AddTodoProps {
    onAdd: (text: string) => void;
}

interface AddTodoState {
    newTask: string;

}
class AddTodo extends React.Component<AddTodoProps, AddTodoState> {
    state: AddTodoState = {
        newTask: '',
    };
    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ newTask: e.target.value });
    };
    handleAdd = () => {
        this.props.onAdd(this.state.newTask);
        this.setState({ newTask: '' });
    };
    render() {
        return (
            <div>
                <input
                    type="text"
                    value={this.state.newTask}
                    onChange={this.handleChange}
                />
                <button onClick={this.handleAdd}>Add</button>
            </div>
        );
    }
}

export default AddTodo;