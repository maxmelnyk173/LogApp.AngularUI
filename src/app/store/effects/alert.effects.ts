import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as fromAuthActions from 'src/app/store/actions/auth.actions';
import * as fromUserActions from 'src/app/modules/account/state/actions/users.actions';
import * as fromCostCenterActions from 'src/app/modules/account/state/actions/cost-centers.actions';

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

  requestCompleted$ = createEffect(
    () => 
    this.actions$.pipe(
      ofType(fromUserActions.resetPasswordSuccess, fromUserActions.addUserSuccess, fromUserActions.deleteUserSuccess, fromUserActions.updateUserSuccess, 
        fromCostCenterActions.deleteCostCenterSuccess, fromCostCenterActions.addCostCenterSuccess),
      tap(() => this.snackBar.open('Done!', '\u2716', {
        duration: 2000,
        panelClass: ['success-snackbar']
      }))
    ),
    { dispatch: false }
  )

  requestFailed$ = createEffect(
    () => 
    this.actions$.pipe(
      ofType(fromUserActions.resetPasswordFail, fromUserActions.updateUserFail, fromAuthActions.updateUserDataFailure, fromUserActions.addUserFail, fromUserActions.loadUsersFail, 
        fromUserActions.deleteUserFail, fromCostCenterActions.addCostCenterFail, fromCostCenterActions.loadCostCentersFail, fromCostCenterActions.deleteCostCenterFail),
      tap((error) => this.snackBar.open('An error occured: ' + error.error, '\u2716', {
        duration: 2000,
        panelClass: ['error-snackbar']
      }))
    ),
    { dispatch: false }
  )

  constructor(private actions$: Actions, private snackBar: MatSnackBar){}
}
