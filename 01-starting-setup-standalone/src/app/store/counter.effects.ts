import { Actions, createEffect, ofType } from "@ngrx/effects";
import { decrement, increment, init, reset, set } from "./counter.actions";
import { of, switchMap, tap, withLatestFrom } from "rxjs";
import { Store } from "@ngrx/store";


export class CounterEffects {

    initCount = createEffect(() => this.actions$.pipe(
        ofType(init),
        switchMap(() => {
            const storedCounter = localStorage.getItem('count');
            if (storedCounter) {
                return of(set({ value: +storedCounter }));
            }
            return of(set({ value: 0 }));
        }),
    ));
    
    saveCount = createEffect(() => this.actions$.pipe(
        ofType(increment, decrement, reset),
        withLatestFrom(this.store.select('counter')),
        tap(([action, counter]) => {
            console.log(action);
            localStorage.setItem('count', counter.toString());
        }),
    ), { dispatch: false });

    constructor(
        private actions$: Actions, 
        private store: Store<{ counter: number }>,
    ) {}
    
}