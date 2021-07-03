import { createAction, props } from '@ngrx/store';
import { ChangePassword, CurrentUser } from '../../resources/models/User';

/**
 * Change Password
 */
export const changePassword = createAction(
    '[Account User Section] Change Password',
    props<{ password: ChangePassword }>()
);

export const changePasswordSuccess = createAction(
    '[User Effect] Change Password Success', 
    props<{ result: boolean }>()
);

export const changePasswordFail = createAction(
    '[Carrier Effect] Load Carrier Fail', 
    props<{ error: any }>()
);