import {createAction, props} from '@ngrx/store';
import {User} from '../../models/user.model';

export const loadUsers = createAction('[User] Load Users');
export const loadUsersSuccess = createAction('[User] Load Users Success', props<{ users: User[] }>());
export const loadUsersFailure = createAction('[User] Load Users Failure', props<{ error: string }>());

export const triggerEditUserDialog = createAction('[User] Trigger Edit User Dialog', props<{ user: User }>());
export const editUser = createAction('[User] Edit User', props<{ user: User }>());
export const editUserSuccess = createAction('[User] Edit User Success', props<{ user: User }>());
export const editUserFailure = createAction('[User] Edit User Failure', props<{ error: string }>());
export const editUserCancel = createAction('[User] Edit User Cancel');
