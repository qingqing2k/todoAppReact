import React from 'react';
import { Todo } from '../components/Todo';
import EditTodoModal from './EditTodo';
import { TodoContext } from '../context/TodoProvider';


interface TodoItemProps {
    todo: Todo;
}

interface TodoItemState {
    isEditing: boolean;
    editText: string;
}

class TodoItem extends React.Component<TodoItemProps, TodoItemState> {
    state: TodoItemState = {
        isEditing: false,
        editText: this.props.todo.text,
    };
    static contextType = TodoContext;
    declare context: React.ContextType<typeof TodoContext>;

    handleEdit = () => {
        this.setState({ isEditing: true });
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ editText: e.target.value });
    };

    handleSave = () => {
        this.context.editTodo(this.props.todo.id, this.state.editText);
        this.setState({ isEditing: false });
    };



    handleDelete = () => {
        this.context.deleteTodo(this.props.todo.id);
    };
    handleCancel = () => {
        this.setState({
            isEditing: false,
            editText: this.props.todo.text
        });
    };
    render() {

        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <input type="checkbox"
                    checked={this.props.todo.completed}
                    onChange={() => this.context.toggleTodo(this.props.todo.id)} />
                <span style={{
                    textDecoration: this.props.todo.completed ? 'line-through' : 'none',
                    marginRight: '10px',
                }}>
                    {this.props.todo.text}
                </span>
                <button onClick={this.handleEdit} style={{ marginRight: '5px' }}>Edit</button>
                <button onClick={() => this.context.deleteTodo(this.props.todo.id)}>Delete</button>
                {this.state.isEditing &&
                    (<EditTodoModal
                        text={this.state.editText}
                        onChange={this.handleChange}
                        onSave={this.handleSave}
                        onCancel={this.handleCancel} />)}
            </div>
        );
    }
}
export default TodoItem;


