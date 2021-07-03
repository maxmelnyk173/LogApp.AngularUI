import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CarriersService } from '../../resources/services/carriers.service';
import * as CarriersActions from '../actions/carriers.actions';



@Injectable()
export class CarriersEffects {

  loadCarriers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CarriersActions.loadCarriers),
      mergeMap(() =>
        this.carriersService.getCarriers().pipe(
          map(carriers => CarriersActions.loadCarriersSuccess({ carriers })),
          catchError(error => of(CarriersActions.loadCarriersFail({ error : error.error }))))
      ),
    );
  });

  addCarrier$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CarriersActions.addCarrier),
      mergeMap((action) =>
        this.carriersService.addCarrier(action.carrier).pipe(
          map(carrier => CarriersActions.addCarrierSuccess({ carrier })),
          catchError(error => of(CarriersActions.addCarrierFail({ error : error.error }))))
      ),
    );
  });

  deleteCarrier$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CarriersActions.deleteCarrier),
      mergeMap((action) =>
        this.carriersService.deleteCarrier(action.id).pipe(
          map(id => CarriersActions.deleteCarrierSuccess({ id })),
          catchError(error => of(CarriersActions.deleteCarrierFail({ error : error.error }))))
      ),
    );
  });

  constructor(private actions$: Actions, private carriersService: CarriersService) {}

}
