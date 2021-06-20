import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from 'src/app/shared/models/User';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export interface AuthData {
  token: string,
  exp: number,
  user: User
}

export interface UserData {
  user: User
  isLoggedIn: boolean
}

export interface AccessToken {
  token: string
}

export interface IsAuth {
  isAuth: boolean;
}

export const getAuthData = createSelector(
  selectAuthState,
  (state: fromAuth.State): AuthData => {
    return {
      token: state.authData.token,
      exp: state.authData.exp,
      user: state.authData.user
    }
  }
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
  selectAuthState,
  (state: fromAuth.State): AccessToken => {
    return {
      token: state.authData.token,
    }
  }
)

export const IsAuth = createSelector(
  selectAuthState,
  (state: fromAuth.State): IsAuth => {
    return {
      isAuth: state.authData.token != ""
    }
  }
)
