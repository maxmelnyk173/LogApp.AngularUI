import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap, delay, switchMap, delayWhen, first } from 'rxjs/operators';
import { Observable, EMPTY, of, timer } from 'rxjs';

import * as AuthActions from '../actions/auth.actions';
import { AuthService } from 'src/app/shared/services/auth.service';
import { select, Store } from '@ngrx/store';
import { getAuthData, IsAuth } from '../selectors/auth.selectors';



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
  
  refresh$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginSuccess),
    switchMap((action) => this.authSerice.refresh(action.authData.user.id).pipe(
      map(authData => AuthActions.loginSuccess({ authData: authData }))
    ))
  ));

  constructor(private actions$: Actions, private authSerice: AuthService, private store: Store) {}

}
