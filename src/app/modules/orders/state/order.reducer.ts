import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as OrderActions from './order.actions';
import { Order, PackingType, Stackability } from '../resources/Order';

export const ordersFeatureKey = 'orders';

export interface State extends EntityState<Order> {
  error: any
  stackability: Stackability[] | null;
  packings: PackingType[] | null;
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>();

export const initialState: State = adapter.getInitialState({
  error: null,
  stackability: null,
  packings: null
});


export const reducer = createReducer(
  initialState,
  on(
    OrderActions.loadOrdersByDateSuccess,
    (state, action) => adapter.setAll(action.orders, state)
  ),
  on(
    OrderActions.addOrderSuccess,
    (state, { order }) => { return adapter.addOne(order, state) }
  ),
  on(OrderActions.updateOrderSuccess, (state, { order }) => {
    return adapter.updateOne({ id: order.id, changes: order }, state);
  }),
  on(
    OrderActions.deleteOrderSuccess, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(
    OrderActions.loadStackabilitySuccess,
    (state, action) => {
      return {
        ...state,
        stackability: action.stackability
      }
    }
  ),
  on(
    OrderActions.loadPackingTypesSuccess,
    (state, action) => {
      return {
        ...state,
        packings: action.packings
      }
    }
  ),
  on(
    OrderActions.loadOrdersByDateFail,
    OrderActions.addOrderFail,
    OrderActions.updateOrderFail,
    OrderActions.deleteOrderFail,
    OrderActions.loadStackabilityFail,
    OrderActions.loadPackingTypesFail,
    (state, action) => {
      return {
        ...state,
        error: action.error
      }
    }
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
