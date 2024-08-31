import {createReducer, on} from '@ngrx/store';
import * as usersActions from '../actions/users.actions';
import {User} from '../../models/user.model';

export interface UserState {
  users: User[];
  loading: boolean;
}

export const initialState: UserState = {
  users: [],
  loading: false,
};

export const usersReducer = createReducer(
  initialState,
  on(usersActions.loadUsers, (state) => ({
    ...state,
    loading: true,
  })),
  on(usersActions.loadUsersSuccess, (state, {users}) => ({
    ...state,
    users,
    loading: false,
  })),
  on(usersActions.loadUsersFailure, (state) => ({
    ...state,
    loading: false,
  })),
  on(usersActions.editUser, (state) => ({
    ...state,
    loading: true,
  })),
  on(usersActions.editUserSuccess, (state, {user}) => ({
    ...state,
    users: state.users.map(u => u.id === user.id ? {...u, ...user} : u),
    loading: false,
  })),
  on(usersActions.editUserFailure, (state) => ({
    ...state,
    loading: false,
  }))
);
