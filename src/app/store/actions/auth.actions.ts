import { createAction, props } from '@ngrx/store';
import { AuthData } from 'src/app/shared/models/AuthData';
import { CurrentUser } from 'src/app/shared/models/User';

export const login = createAction(
  '[Login Component] Login User',
  props<{ email: string, password: string }>()
);

export const firstLoginSuccess = createAction(
  '[Auth Effect] First Login Success'
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

/**
 * Update User Data
 */

export const updateUserData = createAction(
  '[User Component] Update User Data',
  props<{ body: CurrentUser }>()
)

export const updateUserDataSucced = createAction(
  '[User Component] Update User Succed ',
  props<{ user: CurrentUser }>()
)

export const updateUserDataFailed = createAction(
  '[Account Effect] Update User Failed',
  props<{ error: any }>()
)