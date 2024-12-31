import React, { createContext, ReactNode } from 'react';
import { Todo } from '../components/Todo';

interface TodoContextProps {
    todos: Todo[];
    addTodo: (text: string) => void;
    editTodo: (id: number, text: string) => void;
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
}

export const TodoContext = createContext<TodoContextProps>({
    todos: [],
    addTodo: () => { },
    editTodo: () => { },
    toggleTodo: () => { },
    deleteTodo: () => { }
});

interface TodoProviderProps {
    children: ReactNode;
}

interface TodoProviderState {
    todos: Todo[];
}

export class TodoProvider extends React.Component<TodoProviderProps, TodoProviderState> {
    state: TodoProviderState = {
        todos: []
    };

    addTodo = (text: string) => {
        const newTodo: Todo = {
            id: Date.now(),
            text,
            completed: false
        };
        this.setState({ todos: [...this.state.todos, newTodo] });
    };

    editTodo = (id: number, text: string) => {
        this.setState({
            todos: this.state.todos.map(todo => (todo.id === id ? { ...todo, text } : todo))
        });
    };

    toggleTodo = (id: number) => {
        this.setState({
            todos: this.state.todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
        });
    };

    deleteTodo = (id: number) => {
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id)
        });
    };

    render() {
        return (
            <TodoContext.Provider
                value={{
                    todos: this.state.todos,
                    addTodo: this.addTodo,
                    editTodo: this.editTodo,
                    toggleTodo: this.toggleTodo,
                    deleteTodo: this.deleteTodo
                }}
            >
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}
export default TodoProvider;