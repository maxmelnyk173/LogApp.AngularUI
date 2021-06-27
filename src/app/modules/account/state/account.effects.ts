import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../resources/user.service';
import * as AccountActions from './account.actions';



@Injectable()
export class AccountEffects {

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AccountActions.loadUsers),
      concatMap(() =>
        this.userService.getAllUsers().pipe(
          map(data => AccountActions.loadUsersSuccessed({ users : data })),
          catchError(error => of(AccountActions.loadUsersFailed({ error : error.error }))))
      ),
    );
  });


  loadUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AccountActions.loadCurrentUser),
      mergeMap((action) =>
        this.userService.getUser(action.id).pipe(
          map(user => AccountActions.loadCurrentUserSuccessed({ user })),
          catchError(error => of(AccountActions.loadCurrentUserFailed({ error : error.error }))))
      ),
    );
  });

  chooseCurrentUser$ = createEffect(
    () => this.actions$.pipe(
      ofType(AccountActions.loadCurrentUserSuccessed),
      map(user => AccountActions.chooseCurrentUser({ selectedUserId: user.user.id }))
    )
  );

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AccountActions.updateUserData),
      mergeMap((action) =>
        this.userService.updateUserData(action.body).pipe(
          map((user) => AccountActions.updateUserDataSucced({ user })),
          catchError(error => of(AccountActions.updateUserDataFailed({ error : error.error }))))
      ),
    );
  });

  constructor(private actions$: Actions, private userService: UserService) {}
}
