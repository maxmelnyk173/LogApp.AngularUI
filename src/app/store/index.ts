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


export interface AppState {

  [fromAuth.authFeatureKey]: fromAuth.State;
  [fromOrder.ordersFeatureKey]: fromOrder.State;

}

export const reducers: ActionReducerMap<AppState> = {

  [fromAuth.authFeatureKey]: fromAuth.reducer,

  [fromOrder.ordersFeatureKey]: fromOrder.reducer,
};


export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];
