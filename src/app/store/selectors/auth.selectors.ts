import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from 'src/app/shared/models/User';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export interface UserData {
  user: User
  isLoggedIn: boolean
}

export const getAuthData = createSelector(
  selectAuthState,
  state => state.authData
)

export const getUserData = createSelector(
  selectAuthState,
  (state: fromAuth.State): UserData => {
    return {
      user: state.authData.user,
      isLoggedIn: state.authData.user.id != ''
    }
  }
)

export const getAccessToken = createSelector(
  getAuthData,
  authData => authData && authData.token
)

export const IsAuth = createSelector(
  getAccessToken,
  accessToken => !!accessToken
)
