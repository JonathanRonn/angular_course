import { createAction, props } from "@ngrx/store";

export const init = createAction('[Counter] Init');
export const set = createAction('[Counter] Set', props<{ value: number }>());

export const increment = createAction('[Counter] Increment', props<{ value: number }>()); // props<{ value: number }> is used to pass a value to the action
export const decrement = createAction('[Counter] Decrement', props<{ value: number }>());
export const reset = createAction('[Counter] Reset', props<{ value: number }>());