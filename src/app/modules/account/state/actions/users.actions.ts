import { createAction, props } from '@ngrx/store';
import { RegisterUser, User } from '../../resources/models/User';

/**
 * Load Users
 */
export const loadUsers = createAction(
  '[Admin Section / User] Load Users'
);

export const loadUsersSuccess = createAction(
  '[User Effect] Load Users Success', 
  props<{ users: User[] }>()
);

export const chooseCurrentUser = createAction(
  '[Admin Section / User] Choose Current User',
  props<{ selectedUserId: string }>()
);

export const loadUsersFail = createAction(
  '[User Effect] Load Users Fail', 
  props<{ error: any }>()
);

/**
 * Add User
 */
export const addUser = createAction(
  '[Admin Section / User] Add User',
  props<{ user: RegisterUser }>()
);

export const addUserSuccess = createAction(
  '[User Effect] Add User Success', 
  props<{ user: User }>()
);

export const addUserFail = createAction(
  '[User Effect] Add User Fail', 
  props<{ error: any  }>()
);

/**
 * Delete User
 */
export const deleteUser = createAction(
  '[Admin Section / User] Delete Users',
  props<{ id: string }>()
);

export const deleteUserSuccess = createAction(
  '[User Effect] Delete User Success',
  props<{ id: string }>()
);

export const deleteUserFail = createAction(
  '[User Effect] Delete User Fail', 
  props<{ error: any }>()
);


/**
 * Update User
 */
export const updateUser = createAction(
  '[Admin Section / User] Update User',
  props<{ user: User }>()
);

export const updateUserSuccess = createAction(
  '[User Effect] Update User Success', 
  props<{ user: User }>()
);

export const updateUserFail = createAction(
  '[User Effect] Update User Fail', 
  props<{ error: any  }>()
);

/**
 * Reset password
 */

 export const resetPassword = createAction(
  '[Admin Section / User] Reset Password',
  props<{ id: string, newPassword: string }>()
);

export const resetPasswordSuccess = createAction(
  '[User Effect] Reset Password Success',
  props<{ result: boolean }>()
);

export const resetPasswordFail = createAction(
  '[User Effect] Reset Password Fail', 
  props<{ error: any  }>()
);