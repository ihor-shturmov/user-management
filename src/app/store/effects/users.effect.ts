import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {UsersService} from '../../services/users.service';
import * as usersActions from '../actions/users.actions';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {UserEditDialogComponent} from "../../components/user-edit-dialog/user-edit-dialog.component";
import {User} from "../../models/user.model";
import {MatDialog} from "@angular/material/dialog";

@Injectable()
export class UsersEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly usersService: UsersService = inject(UsersService);
  private readonly dialog: MatDialog = inject(MatDialog);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.loadUsers),
      switchMap(() =>
        this.usersService.getUsers().pipe(
          map((users) => usersActions.loadUsersSuccess({users})),
          catchError((error) => of(usersActions.loadUsersFailure({error})))
        )
      )
    )
  );

  triggerEditUserDialog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.triggerEditUserDialog),
      switchMap(({user}) => {
        const dialogRef = this.dialog.open(UserEditDialogComponent, {
          data: {user},
        });

        return dialogRef.afterClosed().pipe(
          map((result: User) => {
            if (result) {
              return usersActions.editUserSuccess({user: result});
            } else {
              return usersActions.editUserCancel();
            }
          }),
          catchError((error) => of(usersActions.editUserFailure({error})))
        );
      })
    )
  );

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersActions.editUser),
      switchMap((action) =>
        this.usersService.updateUser(action.user).pipe(
          map((user) => usersActions.editUserSuccess({user})),
          catchError((error) => of(usersActions.editUserFailure({error})))
        )
      )
    )
  );
}
