import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as OrdersReducer from '../state/order.reducer';

export interface State {
    orders: OrdersReducer.State;
}

export const reducers: ActionReducerMap<State> = {
    orders: OrdersReducer.reducer,
};

export const selectOrderState = createFeatureSelector<OrdersReducer.State>(
    OrdersReducer.ordersFeatureKey
);

export const selectOrdersEntities = createSelector(
    selectOrderState,
    OrdersReducer.selectEntities
);

export const selectAllOrders = createSelector(
    selectOrderState,
    OrdersReducer.selectAll
);

export const selectOrderById = (id: string) => createSelector(
    selectOrdersEntities,
    entities => entities[id]
);

export const selectPackingTypes = createSelector(
    selectOrderState,
    packings => packings.packings
);

export const selectSackability = createSelector(
    selectOrderState,
    stackability => stackability.stackability
);