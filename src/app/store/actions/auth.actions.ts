import { createAction, props } from '@ngrx/store';
import { AuthData } from 'src/app/shared/models/AuthData';

export const login = createAction(
  '[Login Component] Login User',
  props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
  '[Auth Effect] Login User Success',
  props<{ authData: AuthData}>()
);

export const loginFailure = createAction(
  '[Auth Effect] Login User Failure',
  props<{ error: any, }>()
);

export const initAuthData = createAction(
  '[Auth Module] Init Auth Data'
);

export const extractAuthData = createAction(
  '[Core Component] Extract Auth Data'
);

export const logoutSuccess = createAction(
  '[Core Component] Logout Success'
);

export const logout = createAction(
  '[Core Component] Logout User'
);