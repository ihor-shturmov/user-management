import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {login, loginFailure, loginSuccess, logout} from '../actions/auth.actions';
import {map, withLatestFrom} from 'rxjs/operators';
import {delay} from 'rxjs';
import {Router} from "@angular/router";
import {selectAuthPredefinedUsers} from "../selectors/auth.selectors";
import {UserDTO} from "../../models/user.model";
import {Store} from "@ngrx/store";

@Injectable()
export class AuthEffects {
    private readonly actions$: Actions = inject(Actions);
    private readonly store: Store = inject(Store);
    private readonly router: Router = inject(Router);

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(login),
            delay(Math.random() * 2000),
            withLatestFrom(this.store.select(selectAuthPredefinedUsers)),
            map(([{username, password}, users]: [any, UserDTO[]]) => {
                const user = users.find((u) => u.username === username && u.password === password);
                if (user) {
                    return loginSuccess({user});
                } else {
                    return loginFailure({error: 'Invalid credentials'});
                }
            })
        )
    );

    loginSuccess$ = createEffect(() =>
            this.actions$.pipe(
                ofType(loginSuccess),
                map(() => this.router.navigate(['/users']))
            ),
        {dispatch: false}
    );

    logout$ = createEffect(() =>
            this.actions$.pipe(
                ofType(logout),
                map(() => this.router.navigate(['/login']))
            ),
        {dispatch: false}
    );
}
