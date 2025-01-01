// src/features/todos/todosSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ITodo {
    id: number;
    text: string;
    completed: boolean;
    isSelect: boolean;
}

interface ITodosState {
    todos: ITodo[];
}

const initialState: ITodosState = {
    todos: [],
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo: ITodo = {
                id: Date.now(),
                text: action.payload,
                completed: false,
                isSelect: false,
            };
            state.todos.push(newTodo);
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        toggleSelectTodo: (state, action: PayloadAction<number>) => {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.isSelect = !todo.isSelect;
            }
        },
        editTodo: (state, action: PayloadAction<{ id: number, text: string }>) => {
            const todo = state.todos.find(todo => todo.id === action.payload.id);
            if (todo) {
                todo.text = action.payload.text;
            }
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        },
        deleteMultipleTodos: (state) => {
            state.todos = state.todos.filter(todo => !todo.isSelect);
        },
        resetSelectTodos: (state) => {
            state.todos.forEach(todo => {
                todo.isSelect = false;
            });
        },
    }
});

export const { addTodo, toggleTodo, editTodo, deleteTodo, toggleSelectTodo, deleteMultipleTodos, resetSelectTodos } = todosSlice.actions;
export type { ITodosState, ITodo };
export default todosSlice.reducer;