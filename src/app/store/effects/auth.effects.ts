import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as AuthActions from '../actions/auth.actions';
import { AuthService } from 'src/app/shared/services/auth.service';



@Injectable()
export class AuthEffects {

  login$ = createEffect(() => {
    return this.actions$.pipe( 
      ofType(AuthActions.login),
      concatMap((action) =>
        this.authSerice.login(action.email, action.password).pipe(
          map(authData => AuthActions.loginSuccess({ authData: authData })),
          catchError(error => of(AuthActions.loginFailure({ error : error.error }))))
      )
    );
  });

  constructor(private actions$: Actions, private authSerice: AuthService) {}

}
