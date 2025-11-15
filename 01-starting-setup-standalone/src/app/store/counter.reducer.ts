import { createReducer, on } from "@ngrx/store";
import { increment,decrement, reset, set, init } from "./counter.actions";

const initialState = 0;

// export function counterReducer(state: number = initialState) {
//     return state;
// }

export const counterReducer = createReducer(
    initialState,
    on(increment, (state, action: any) => state + action.value),
    on(decrement, (state, action: any) => state - action.value),
    on(set, (state, action: any) => action.value),
    on(reset, (state, action: any) => action.value),
    on(init, (state) => {
        const storedValue = localStorage.getItem('count');
        return storedValue ? parseInt(storedValue) : initialState;
    }),
);