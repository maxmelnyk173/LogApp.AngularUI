import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../../resources/services/user.service';
import * as UserActions from '../actions//users.actions';



@Injectable()
export class UsersEffects {

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap(() =>
        this.userService.getAllUsers().pipe(
          map(users => UserActions.loadUsersSuccess({ users })),
          catchError(error => of(UserActions.loadUsersFail({ error : error.error }))))
      ),
    );
  });

  addUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.addUser),
      mergeMap((action) =>
        this.userService.addUser(action.user).pipe(
          map(user => UserActions.addUserSuccess({ user })),
          catchError(error => of(UserActions.addUserFail({ error : error.error }))))
      ),
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap((action) =>
        this.userService.deleteUser(action.id).pipe(
          map(id => UserActions.deleteUserSuccess({ id })),
          catchError(error => of(UserActions.deleteUserFail({ error : error.error }))))
      ),
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.updateUser),
      mergeMap((action) =>
        this.userService.updateUser(action.user).pipe(
          map(user => UserActions.updateUserSuccess({ user })),
          catchError(error => of(UserActions.updateUserFail({ error : error.error }))))
      ),
    );
  });

  resetPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.resetPassword),
      mergeMap((action) =>
        this.userService.resetPassword(action.id, action.newPassword).pipe(
          map(data => UserActions.resetPasswordSuccess({ result: data })),
          catchError(error => of(UserActions.resetPasswordFail({ error : error.error }))))
      ),
    );
  });

  constructor(private actions$: Actions, private userService: UserService) {}
}
