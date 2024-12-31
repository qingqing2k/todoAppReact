import React from 'react';
import { Todo } from './Todo';
import TodoItem from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, text: string) => void;
}

export default class TodoList extends React.Component<TodoListProps> {
    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <ul>
                    {this.props.todos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={this.props.onToggle}
                            onDelete={this.props.onDelete}
                            onEdit={this.props.onEdit}
                        />
                    ))}
                </ul>
            </div>
        );
    }
}