import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, first, tap } from 'rxjs/operators';
import { fromEvent, of, timer } from 'rxjs';

import * as AuthActions from '../actions/auth.actions';
import { AuthService } from 'src/app/shared/services/auth.service';
import { select, Store } from '@ngrx/store';
import { IsAuth } from '../selectors/auth.selectors';
import { AuthData } from 'src/app/shared/models/AuthData';



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

  updateUserData$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.updateUserData),
      switchMap(action => this.authSerice.updateUserData(action.body).pipe(
        map((data) => AuthActions.updateUserDataSucced({ user : data })),
        catchError(error => of(AuthActions.updateUserDataFailed({ error : error.error })))
      ))
    )
  )

  saveDataToLocalStorageOnUpdate$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.updateUserDataSucced),
      map(data => {
        const extractedAuthData = localStorage.getItem("AuthData");
        if(extractedAuthData){
          const authData = JSON.parse(extractedAuthData) as AuthData;
          authData.user.id = data.user.id;
          authData.user.firstName = data.user.firstName;
          authData.user.lastName = data.user.lastName;
          authData.user.position = data.user.position;
          console.log(authData);
          localStorage.setItem("AuthData", JSON.stringify(authData as AuthData));
        }
      })
    ),
    { dispatch: false }
  )

  saveDataToLocalStorage$ = createEffect(
    () => this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(data => {
        const {type, ...authData} = data;
        localStorage.setItem("AuthData", JSON.stringify(authData.authData as AuthData))
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

        const authData = JSON.parse(extractedAuthData) as AuthData;
        if((authData.exp - (1 * 1000) - Date.now()) < 0){
          return AuthActions.logoutSuccess();
        }

        return AuthActions.loginSuccess({ authData });
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
