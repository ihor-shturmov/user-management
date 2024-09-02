import {createReducer, on} from '@ngrx/store';
import {login, loginSuccess, loginFailure, logout, seedUsers} from '../actions/auth.actions';
import {User, UserDTO} from '../../models/user.model';
import {Nullable} from "../../utils/types/nullable";

export interface AuthState {
    users: UserDTO[];
    user: Nullable<User>;
    loading: boolean;
    error: Nullable<string>;
}

export const initialState: AuthState = {
    users: [],
    user: null,
    loading: false,
    error: null,
};

export const authReducer = createReducer(
    initialState,
    on(seedUsers, (state, {users}) => ({...state, users: [...users]})),
    on(login, (state) => ({...state, loading: true, error: null})),
    on(loginSuccess, (state, {user}) => ({...state, user, loading: false})),
    on(loginFailure, (state, {error}) => ({...state, error, loading: false})),
    on(logout, (state) => ({...state, user: null}))
);
