import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as fromAuthActions from 'src/app/store/actions/auth.actions';

@Injectable()
export class AlertEffects {

  checkInfo$ = createEffect(
    () => 
    this.actions$.pipe(
      ofType(fromAuthActions.login),
      tap(() => this.snackBar.open('Checking information', '\u2716', {
        duration: 2000,
        panelClass: ['info-snackbar']
      }))
    ),
    { dispatch: false }
  )

  loginSuccess$ = createEffect(
    () => 
    this.actions$.pipe(
      ofType(fromAuthActions.loginSuccess),
      tap((action) => this.snackBar.open('Welcome back ' + action.authData.user.firstName, '\u2716', {
        duration: 2000,
        panelClass: ['success-snackbar']
      }))
    ),
    { dispatch: false }
  )

  loginFailed$ = createEffect(
    () => 
    this.actions$.pipe(
      ofType(fromAuthActions.loginFailure),
      tap((action) => this.snackBar.open('Login Failed: ' + action.error, '\u2716', {
        duration: 2000,
        panelClass: ['error-snackbar']
      }))
    ),
    { dispatch: false }
  )

  constructor(private actions$: Actions, private snackBar: MatSnackBar){}
}
