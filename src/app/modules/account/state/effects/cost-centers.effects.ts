import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CostCentersService } from '../../resources/services/cost-centers.service';
import * as CostCenterActions from '../actions/cost-centers.actions';



@Injectable()
export class CostCentersEffects {

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CostCenterActions.loadCostCenters),
      mergeMap(() =>
        this.costCenterService.getCostCenters().pipe(
          map(costCenters => CostCenterActions.loadCostCentersSuccess({ costCenters })),
          catchError(error => of(CostCenterActions.loadCostCentersFail({ error : error.error }))))
      ),
    );
  });

  addUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CostCenterActions.addCostCenter),
      mergeMap((action) =>
        this.costCenterService.addCostCenter(action.costCenter).pipe(
          map(costCenter => CostCenterActions.addCostCenterSuccess({ costCenter })),
          catchError(error => of(CostCenterActions.addCostCenterFail({ error : error.error }))))
      ),
    );
  });

  deleteUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CostCenterActions.deleteCostCenter),
      mergeMap((action) =>
        this.costCenterService.deleteCostCenter(action.id).pipe(
          map(id => CostCenterActions.deleteCostCenterSuccess({ id })),
          catchError(error => of(CostCenterActions.deleteCostCenterFail({ error : error.error }))))
      ),
    );
  });

  constructor(private actions$: Actions, private costCenterService: CostCentersService) {}
}
