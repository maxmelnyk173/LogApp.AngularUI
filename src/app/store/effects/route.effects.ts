import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import * as fromAuthActions from 'src/app/store/actions/auth.actions';



@Injectable()
export class RouteEffects {

  homeAfterSuccesLogin$ = createEffect(
    () => 
    this.actions$.pipe(
      ofType(fromAuthActions.loginSuccess),
      tap(() => this.router.navigate(['']))
    ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () => 
    this.actions$.pipe(
      ofType(fromAuthActions.logout),
      tap(() => this.router.navigate(['/auth/login']))
    ),
    { dispatch: false }
  );

  constructor(private actions$: Actions, private router: Router) {}

}
