import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { first, tap } from 'rxjs/operators';
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
      ofType(),
      first(),
      tap((action) => this.snackBar.open('Welcome back ', '\u2716', {
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

  logout$ = createEffect(
    () => 
    this.actions$.pipe(
      ofType(fromAuthActions.logout),
      tap(() => this.snackBar.open('You are logged out', '\u2716', {
        duration: 2000,
        panelClass: ['info-snackbar']
      }))
    ),
    { dispatch: false }
  )

  constructor(private actions$: Actions, private snackBar: MatSnackBar){}
}
