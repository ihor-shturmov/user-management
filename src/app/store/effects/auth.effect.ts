import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../../services/auth.service';
import {login, loginSuccess, loginFailure, logout} from '../actions/auth.actions';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Router} from "@angular/router";

@Injectable()
export class AuthEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({username, password}) =>
        this.authService.login(username, password).pipe(
          map((user) => {
            if (user) {
              return loginSuccess({user});
            } else {
              return loginFailure({error: 'Invalid credentials'});
            }
          }),
          catchError(() => of(loginFailure({error: 'Login failed'})))
        )
      )
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
