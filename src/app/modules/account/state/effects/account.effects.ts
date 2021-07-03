import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../../resources/services/user.service';
import * as AccountActions from '../actions/account.actions';



@Injectable()
export class AccountEffects {

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

  constructor(private actions$: Actions, private userService: UserService) {}
}
