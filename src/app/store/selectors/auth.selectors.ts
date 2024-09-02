import {createSelector, createFeatureSelector} from '@ngrx/store';
import {AuthState} from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthPredefinedUsers = createSelector(selectAuthState, (state) => state?.users);
export const selectAuthUser = createSelector(selectAuthState, (state) => state?.user);
export const selectAuthLoading = createSelector(selectAuthState, (state) => state?.loading);
export const selectAuthError = createSelector(selectAuthState, (state) => state?.error);

export const selectAuthUserRole = createSelector(selectAuthUser, (user) => user?.role);
