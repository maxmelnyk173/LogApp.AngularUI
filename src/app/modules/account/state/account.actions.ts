import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { UpdateUser, User } from '../resources/User';

/**
 * User Section
 * Load User
 */
export const loadCurrentUser = createAction(
  '[User Component] Load Current User',
  props<{ id: string }>()
);

export const loadCurrentUserSuccessed = createAction(
  '[Account Effect] Load User Successed',
  props<{ user: User }>()
);

export const loadCurrentUserFailed = createAction(
  '[Account Effect] Load User Failed',
  props<{ error: any }>()
);

export const chooseCurrentUser = createAction(
  '[User Component] Choose Current User',
  props<{ selectedUserId: string }>()
);

/**
 * Update User Data
 */
export const updateUserData = createAction(
  '[User Component] Update User Data',
  props<{ body: UpdateUser }>()
)

export const updateUserDataSucced = createAction(
  '[User Component] Update User Succed ',
  props<{ user: UpdateUser }>()
)

export const updateUserDataFailed = createAction(
  '[Account Effect] Update User Failed',
  props<{ error: any }>()
)


/**
 * Admin Section
 */
export const loadUsers = createAction(
  '[User Component] Load Users'
);

export const loadUsersSuccessed = createAction(
  '[Account Effect] Load Users Successed',
  props<{ users: User[] }>()
);

export const loadUsersFailed = createAction(
  '[Account Effect] Load User Failed',
  props<{ error: any }>()
);