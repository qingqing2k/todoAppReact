import { configureStore } from '@reduxjs/toolkit';
import todosReducer, { ITodosState } from './todoSlice';
import { loadState, saveState } from '../store/localStorage';

// Define the shape of the persisted state
interface IPreloadedState {
    todos: ITodosState;
}

// Load the persisted state and type it accordingly
const persistedState: IPreloadedState | undefined = loadState();

export const store = configureStore({
    reducer: {
        todos: todosReducer,
    },
    preloadedState: persistedState,
});

// Subscribe to store updates to save the state to localStorage
store.subscribe(() => {
    saveState({
        todos: store.getState().todos,
    });
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type { IPreloadedState };

export default store;