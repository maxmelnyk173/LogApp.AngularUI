import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as fromAuthActions from 'src/app/store/actions/auth.actions';
import * as fromUserActions from 'src/app/modules/account/state/actions/users.actions';
import * as fromAccountActions from 'src/app/modules/account/state/actions/account.actions';

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
      ofType(fromAuthActions.firstLoginSuccess),
      tap(() => this.snackBar.open('Welcome back', '\u2716', {
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
      tap((error) => this.snackBar.open('Login Failed: ' + error.error, '\u2716', {
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

  loadingDataFailed$ = createEffect(
    () => 
    this.actions$.pipe(
      ofType(fromUserActions.loadUsersFail, fromAccountActions.loadCurrentUserFailed),
      tap((error) => this.snackBar.open('Loading Failed: ' + error.error, '\u2716', {
        duration: 2000,
        panelClass: ['error-snackbar']
      }))
    ),
    { dispatch: false }
  )

  addingDataFailed$ = createEffect(
    () => 
    this.actions$.pipe(
      ofType(fromUserActions.addUserFail),
      tap((error) => this.snackBar.open('Creation Failed: ' + error.error, '\u2716', {
        duration: 2000,
        panelClass: ['error-snackbar']
      }))
    ),
    { dispatch: false }
  )

  updatingDataFailed$ = createEffect(
    () => 
    this.actions$.pipe(
      ofType(fromAccountActions.updateUserDataFailed),
      tap((error) => this.snackBar.open('Updating Failed: ' + error.error, '\u2716', {
        duration: 2000,
        panelClass: ['error-snackbar']
      }))
    ),
    { dispatch: false }
  )

  requestCompleted$ = createEffect(
    () => 
    this.actions$.pipe(
      ofType(fromUserActions.resetPasswordSuccess),
      tap(() => this.snackBar.open('Request completed successfully', '\u2716', {
        duration: 2000,
        panelClass: ['success-snackbar']
      }))
    ),
    { dispatch: false }
  )

  requestFailed$ = createEffect(
    () => 
    this.actions$.pipe(
      ofType(fromUserActions.resetPasswordFail),
      tap((error) => this.snackBar.open('An error occured: ' + error.error, '\u2716', {
        duration: 2000,
        panelClass: ['error-snackbar']
      }))
    ),
    { dispatch: false }
  )

  constructor(private actions$: Actions, private snackBar: MatSnackBar){}
}
