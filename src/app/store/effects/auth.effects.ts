import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, first, tap } from 'rxjs/operators';
import { fromEvent, of, timer } from 'rxjs';

import * as AuthActions from '../actions/auth.actions';
import { AuthService } from 'src/app/shared/services/auth.service';
import { select, Store } from '@ngrx/store';
import { IsAuth } from '../selectors/auth.selectors';



@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(action => this.authSerice.login({
        email: action.email,
        password: action.password
      }).pipe(
        switchMap((authData) => {
          return [
            AuthActions.loginSuccess({ authData }),
            AuthActions.firstLoginSuccess()
          ];
        }),
        catchError(error => of(AuthActions.loginFailure({ error : error.error })))
      ))
    )
  );

  saveDataToLocalStorage$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(data => {
        const {type, ...authData} = data;
        localStorage.setItem("AuthData", JSON.stringify(authData))
      })
    ),
    { dispatch: false }
  )

  removeDataFromLocalStorage$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.initAuthData, AuthActions.extractAuthData),
      map(() => {
        const extractedAuthData = localStorage.getItem("AuthData");
        if(!extractedAuthData){
          return AuthActions.logoutSuccess();
        }

        const authData = JSON.parse(extractedAuthData);
        if((authData.exp - (1 * 1000) - Date.now()) < 0){
          return AuthActions.logoutSuccess();
        }

        return AuthActions.loginSuccess(authData);
      })
    )
  )
  
  refresh$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      switchMap(
        (action) => timer( 
          action.authData.exp - (40 * 1000) - Date.now()
        )
      ),
      switchMap(() => this.store.pipe(
        select(IsAuth),
        first()
      )),
      switchMap(() => this.authSerice.refresh()),
      map(authData => AuthActions.loginSuccess({ authData }))
    )
  );

  logout$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.logout),
      map(() => {
        localStorage.removeItem("AuthData");
        return AuthActions.logoutSuccess();
      })
    )
  );

  listenStorageEffect$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.initAuthData),
      switchMap(() => fromEvent(window, 'storage')),
      map(() => AuthActions.extractAuthData())
    )
  );

  constructor(private actions$: Actions, private authSerice: AuthService, private store: Store) {}

}
