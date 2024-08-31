import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UserState} from '../reducers/users.reducer';

export const selectUserState = createFeatureSelector<UserState>('users');

export const selectAllUsers = createSelector(selectUserState, (state) => state?.users);
export const selectUsersLoading = createSelector(selectUserState, (state) => state?.loading);
