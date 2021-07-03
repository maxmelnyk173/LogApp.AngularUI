import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ShipmentStatusesService } from '../../resources/services/shipment-statuses.service';
import * as ShipmentStatusesActions from '../actions/shipment-statuses.actions';



@Injectable()
export class ShipmentStatusesEffects {

  loadShipmentStatuses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShipmentStatusesActions.loadShipmentStatuses),
      mergeMap(() =>
        this.shipmentStatusesService.getShipmentStatuses().pipe(
          map(shipmentStatuses => ShipmentStatusesActions.loadShipmentStatusesSuccess({ shipmentStatuses })),
          catchError(error => of(ShipmentStatusesActions.loadShipmentStatusesFail({ error : error.error }))))
      ),
    );
  });

  addShipmentStatuses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShipmentStatusesActions.addShipmentStatus),
      mergeMap((action) =>
        this.shipmentStatusesService.addShipmentStatus(action.shipmentStatus).pipe(
          map(shipmentStatus => ShipmentStatusesActions.addShipmentStatusSuccess({ shipmentStatus })),
          catchError(error => of(ShipmentStatusesActions.addShipmentStatusFail({ error : error.error }))))
      ),
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ShipmentStatusesActions.deleteShipmentStatus),
      mergeMap((action) =>
        this.shipmentStatusesService.deleteShipmentStatus(action.id).pipe(
          map(id => ShipmentStatusesActions.deleteShipmentStatusSuccess({ id })),
          catchError(error => of(ShipmentStatusesActions.deleteShipmentStatusFail({ error : error.error }))))
      ),
    );
  });

  constructor(private actions$: Actions, private shipmentStatusesService: ShipmentStatusesService) {}

}
