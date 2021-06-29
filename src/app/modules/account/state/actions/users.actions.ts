import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Users } from '../../resources/users.model';

export const loadUserss = createAction(
  '[Users/API] Load Userss', 
  props<{ userss: Users[] }>()
);

export const addUsers = createAction(
  '[Users/API] Add Users',
  props<{ users: Users }>()
);

export const upsertUsers = createAction(
  '[Users/API] Upsert Users',
  props<{ users: Users }>()
);

export const addUserss = createAction(
  '[Users/API] Add Userss',
  props<{ userss: Users[] }>()
);

export const upsertUserss = createAction(
  '[Users/API] Upsert Userss',
  props<{ userss: Users[] }>()
);

export const updateUsers = createAction(
  '[Users/API] Update Users',
  props<{ users: Update<Users> }>()
);

export const updateUserss = createAction(
  '[Users/API] Update Userss',
  props<{ userss: Update<Users>[] }>()
);

export const deleteUsers = createAction(
  '[Users/API] Delete Users',
  props<{ id: string }>()
);

export const deleteUserss = createAction(
  '[Users/API] Delete Userss',
  props<{ ids: string[] }>()
);

export const clearUserss = createAction(
  '[Users/API] Clear Userss'
);
