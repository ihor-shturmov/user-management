import {inject, Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {User} from "../models/user.model";
import {editUser, loadUsers, triggerEditUserDialog} from "../store/actions/users.actions";
import {selectAllUsers, selectUsersLoading} from "../store/selectors/users.selectors";

@Injectable({providedIn: 'root'})
export class UsersFacade {
  private readonly store: Store = inject(Store);

  users$: Observable<User[]> = this.store.select(selectAllUsers);
  loading$: Observable<boolean> = this.store.select(selectUsersLoading);

  loadUsers(): void {
    this.store.dispatch(loadUsers());
  }

  triggerEditUserDialog(user: User): void {
    this.store.dispatch(triggerEditUserDialog({user}));
  }

  editUser(user: User): void {
    this.store.dispatch(editUser({user}));
  }
}
