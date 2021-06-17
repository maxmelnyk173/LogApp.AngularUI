import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { AuthData } from 'src/app/shared/models/AuthData';

export const login = createAction(
  '[Login Component] Login User',
  props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
  '[Auth Effect] Login User Success',
  props<{ authData: AuthData }>()
);

export const loginFailure = createAction(
  '[Auth Effect] Login User Failure',
  props<{ error: any }>()
);
