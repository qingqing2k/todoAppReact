import React from 'react';
import TodoItem from './TodoItem';
import { TodoContext } from '../context/TodoProvider';




export default class TodoList extends React.Component {
     static contextType = TodoContext;
        declare context: React.ContextType<typeof TodoContext>;
    render() {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ul>
                    {this.context.todos.map(todo => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </ul>
            </div>
        );
    }
}