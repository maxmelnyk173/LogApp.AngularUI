import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { SpinnerService } from 'src/app/shared/services/spinner.service';
import * as fromAuthActions from 'src/app/store/actions/auth.actions';



@Injectable()
export class SpinnerEffects {

  spinneron$ = createEffect(
    () => 
    this.actions$.pipe(
      ofType(fromAuthActions.login),
      tap(() => this.loader.show())
    ),
    { dispatch: false }
  );

  spinneroff$ = createEffect(
    () => 
    this.actions$.pipe(
      ofType(fromAuthActions.firstLoginSuccess, fromAuthActions.loginFailure),
      tap(() => this.loader.hide())
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private loader: SpinnerService) {}
}
