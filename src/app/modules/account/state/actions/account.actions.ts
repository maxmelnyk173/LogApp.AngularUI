import { createAction, props } from '@ngrx/store';
import { CurrentUser } from '../../resources/models/User';

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
  props<{ user: CurrentUser }>()
);

export const chooseCurrentUser = createAction(
  '[User Component] Choose Current User',
  props<{ selectedUserId: string }>()
);

export const loadCurrentUserFailed = createAction(
  '[Account Effect] Load User Failed',
  props<{ error: any }>()
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