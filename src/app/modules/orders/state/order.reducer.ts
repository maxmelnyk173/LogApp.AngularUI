import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as OrderActions from './order.actions';
import { Order } from '../resources/order';

export const ordersFeatureKey = 'orders';

export interface State extends EntityState<Order> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(OrderActions.addOrder,
    (state, action) => adapter.addOne(action.order, state)
  ),
  on(OrderActions.upsertOrder,
    (state, action) => adapter.upsertOne(action.order, state)
  ),
  on(OrderActions.addOrders,
    (state, action) => adapter.addMany(action.orders, state)
  ),
  on(OrderActions.upsertOrders,
    (state, action) => adapter.upsertMany(action.orders, state)
  ),
  on(OrderActions.updateOrder,
    (state, action) => adapter.updateOne(action.order, state)
  ),
  on(OrderActions.updateOrders,
    (state, action) => adapter.updateMany(action.orders, state)
  ),
  on(OrderActions.deleteOrder,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(OrderActions.deleteOrders,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(OrderActions.loadOrders,
    (state, action) => adapter.setAll(action.orders, state)
  ),
  on(OrderActions.clearOrders,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
