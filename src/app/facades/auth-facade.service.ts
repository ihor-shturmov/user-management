import {inject, Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {login, logout} from '../store/actions/auth.actions';
import {
  selectAuthUser,
  selectAuthLoading,
  selectAuthError,
  selectAuthUserRole
} from '../store/selectors/auth.selectors';
import {Observable} from 'rxjs';
import {User, UserRole} from '../models/user.model';
import {Nullable} from "../utils/types/nullable";

@Injectable({providedIn: 'root'})
export class AuthFacade {
  private readonly store: Store = inject(Store);

  user$: Observable<Nullable<User>> = this.store.select(selectAuthUser);
  loading$: Observable<boolean> = this.store.select(selectAuthLoading);
  error$: Observable<Nullable<string>> = this.store.select(selectAuthError);
  userRole$: Observable<UserRole | undefined> = this.store.select(selectAuthUserRole);

  login(username: string, password: string): void {
    this.store.dispatch(login({username, password}));
  }

  logout(): void {
    this.store.dispatch(logout());
  }
}
