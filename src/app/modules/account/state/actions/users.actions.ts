import { createAction, props } from '@ngrx/store';
import { User } from '../../resources/models/User';

/**
 * Load Users
 */
export const loadUsers = createAction(
  '[Admin Section] Load Users'
);

export const loadUsersSuccess = createAction(
  '[User Effect] Load Users Success', 
  props<{ users: User[] }>()
);

export const loadUsersFail = createAction(
  '[User Effect] Load Users Fail', 
  props<{ error: any }>()
);

/**
 * Add User
 */
export const addUser = createAction(
  '[Users/API] Add User',
  props<{ user: User }>()
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
  '[Users/API] Delete Users',
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
