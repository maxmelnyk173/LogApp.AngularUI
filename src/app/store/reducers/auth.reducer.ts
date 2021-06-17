import { Action, createReducer, on } from '@ngrx/store';
import { AuthData } from 'src/app/shared/models/AuthData';
import * as AuthActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  authData: AuthData,
  error: any
}

export const initialState: State = {
  authData: {
    token: null,
    expiredAt: null,
    user: {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      role: null,
      position: null
    }
  },
  error: null
};


export const reducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, (state, action) => {
    return {
      ...state,
      authData: action.authData,
      error: null
    }
  }),
  on(AuthActions.loginFailure, (state, action) => {
    return {
      ...state,
      authData: {
        token: null,
        expiredAt: null,
        user: {
          id: null,
          firstName: null,
          lastName: null,
          email: null,
          role: null,
          position: null
        }
      },
      error: action.error.error
    }
  }),

);

