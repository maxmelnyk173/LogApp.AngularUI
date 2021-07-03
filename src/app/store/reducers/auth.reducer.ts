import { createReducer, on } from '@ngrx/store';
import { AuthData } from 'src/app/shared/models/AuthData';
import * as AuthActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  authData: AuthData,
  error: any
}

export const initialState: State = {
  authData: {
    token: '',
    exp: 0,
    user: {
      id: '',
      firstName: '',
      lastName: '',
      role: '',
      position: ''
    }
  },
  error: null
};


export const reducer = createReducer(
  initialState,
  on(AuthActions.login, state => ({
    ...state
  })),
  on(AuthActions.loginSuccess, (state, action) => {
    return {
      ...state,
      authData: action.authData,
      error: null
    }
  }),
  on(AuthActions.updateUserDataSucced, (state, action) => {
    return {
      ...state,
      authData: {
        token: state.authData.token,
        exp: state.authData.exp,
        user: {
          id: action.user.id,
          firstName: action.user.firstName,
          lastName: action.user.lastName,
          role: state.authData.user.role,
          position: action.user.position
        }
      },
      error: null
    }
  }),
  on(AuthActions.loginFailure, AuthActions.updateUserDataFailed,
    (state, action) => {
    return {
      ...state,
      authData: {
        token: '',
        exp: 0,
        user: {
          id: '',
          firstName: '',
          lastName: '',
          role: '',
          position: ''
        }
      },
      error: action.error.error
    }
  }),
  on(AuthActions.logoutSuccess, AuthActions.logout, (state) => {
    return {
      ...state,
      authData: {
        token: '',
        exp: 0,
        user: {
          id: '',
          firstName: '',
          lastName: '',
          role: '',
          position: ''
        }
      },
      error: null
    }
  }),

);

