import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { User } from '../resources/User';

/**
 * User Actions
 */

export const loadCurrentUser = createAction(
  '[User Component] Load Current User',
  props<{ id: string }>()
);

export const loadUsers = createAction(
  '[User Component] Load Users'
);

export const loadCurrentUserSuccessed = createAction(
  '[Account Effect] Load User Successed',
  props<{ user: User }>()
);

export const loadUsersSuccessed = createAction(
  '[Account Effect] Load Users Successed',
  props<{ users: User[] }>()
);

export const loadCurrentUserFailed = createAction(
  '[Account Effect] Load User Failed',
  props<{ error: any }>()
);

export const loadUsersFailed = createAction(
  '[Account Effect] Load User Failed',
  props<{ error: any }>()
);