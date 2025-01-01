import { IPreloadedState } from '../redux/store';


export const loadState = (): IPreloadedState | undefined => {
    try {
        const serializedState = localStorage.getItem('todos');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState) as IPreloadedState;
    } catch (err) {
        console.error('Could not load state', err);
        return undefined;
    }
};

export const saveState = (state: IPreloadedState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('todos', serializedState);
    } catch (err) {
        console.error('Could not save state', err);
    }
};