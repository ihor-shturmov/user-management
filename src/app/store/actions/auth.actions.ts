import {createAction, props} from '@ngrx/store';
import {User, UserDTO} from '../../models/user.model';

export const seedUsers = createAction('[Auth] Seed Users', props<{ users: UserDTO[] }>());
export const login = createAction('[Auth] Login', props<{ username: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());
export const logout = createAction('[Auth] Logout');
