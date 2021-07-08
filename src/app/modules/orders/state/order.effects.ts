import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { OrdersService } from '../resources/orders.service';
import * as OrderActions from '../state/order.actions';



@Injectable()
export class OrderEffects {

  loadOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderActions.loadOrdersByDate),
      mergeMap((action) =>
        this.ordersService.getOrdersByDate(action.fromDate, action.toDate).pipe(
          map(orders => OrderActions.loadOrdersByDateSuccess({ orders })),
          catchError(error => of(OrderActions.loadOrdersByDateFail({ error : error.error }))))
      ),
    );
  });

  addOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderActions.addOrder),
      mergeMap((action) =>
        this.ordersService.addOrder(action.order).pipe(
          map(order => OrderActions.addOrderSuccess({ order })),
          catchError(error => of(OrderActions.addOrderFail({ error : error.error }))))
      ),
    );
  });

  updateOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderActions.updateOrder),
      mergeMap((action) =>
        this.ordersService.updateOrder(action.id, action.order).pipe(
          map(order => OrderActions.updateOrderSuccess({ order })),
          catchError(error => of(OrderActions.updateOrderFail({ error : error.error }))))
      ),
    );
  });

  deleteOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderActions.deleteOrder),
      mergeMap((action) =>
        this.ordersService.deleteOrder(action.id).pipe(
          map(id => OrderActions.deleteOrderSuccess({ id })),
          catchError(error => of(OrderActions.deleteOrderFail({ error : error.error }))))
      ),
    );
  });

  loadStackability$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderActions.loadStackability),
      mergeMap(() =>
        this.ordersService.getStackability().pipe(
          map(stackability => OrderActions.loadStackabilitySuccess({ stackability })),
          catchError(error => of(OrderActions.loadStackabilityFail({ error : error.error }))))
      ),
    );
  });

  loadPackingTypes$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(OrderActions.loadPackingTypes),
      mergeMap(() =>
        this.ordersService.getPackingType().pipe(
          map(packings => OrderActions.loadPackingTypesSuccess({ packings })),
          catchError(error => of(OrderActions.loadPackingTypesFail({ error : error.error }))))
      ),
    );
  });

  constructor(private actions$: Actions, private ordersService: OrdersService) {}
}
