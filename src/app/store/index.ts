import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromAuth from './reducers/auth.reducer';
import * as fromOrder from '../modules/orders/state/order.reducer';
import * as fromAccount from '../modules/account/state/reducers/account.reducer';
import * as fromUsers from '../modules/account/state/reducers/users.reducer';
import * as fromCarriers from '../modules/account/state/reducers/carriers.reducer';
import * as fromCostcenters from '../modules/account/state/reducers/costcenters.reducer';
import * as fromShipmentStatuses from '../modules/account/state/reducers/shipment-statuses.reducer';


export interface AppState {

  [fromAuth.authFeatureKey]: fromAuth.State;

  [fromOrder.ordersFeatureKey]: fromOrder.State;

[fromAccount.accountsFeatureKey]: fromAccount.State;
[fromUsers.usersesFeatureKey]: fromUsers.State;
[fromCarriers.carriersesFeatureKey]: fromCarriers.State;
[fromCostcenters.costcentersesFeatureKey]: fromCostcenters.State;
[fromShipmentStatuses.shipmentStatusesesFeatureKey]: fromShipmentStatuses.State;
}

export const reducers: ActionReducerMap<AppState> = {

  [fromAuth.authFeatureKey]: fromAuth.reducer,

  [fromOrder.ordersFeatureKey]: fromOrder.reducer,

  [fromAccount.accountsFeatureKey]: fromAccount.reducer,

  [fromUsers.usersesFeatureKey]: fromUsers.reducer,

  [fromCarriers.carriersesFeatureKey]: fromCarriers.reducer,

  [fromCostcenters.costcentersesFeatureKey]: fromCostcenters.reducer,

  [fromShipmentStatuses.shipmentStatusesesFeatureKey]: fromShipmentStatuses.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
