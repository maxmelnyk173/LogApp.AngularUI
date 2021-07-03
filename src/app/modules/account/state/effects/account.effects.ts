import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../../resources/services/user.service';
import * as AccountActions from '../actions/account.actions';



@Injectable()
export class AccountEffects {

    changePassword$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(AccountActions.changePassword),
            mergeMap((action) =>
            this.userService.changePassword(action.password).pipe(
                map(data => AccountActions.changePasswordSuccess({ result: data })),
                catchError(error => of(AccountActions.changePasswordFail({ error : error.error }))))
            ),
        );
        });

    constructor(private actions$: Actions, private userService: UserService) {}
}
