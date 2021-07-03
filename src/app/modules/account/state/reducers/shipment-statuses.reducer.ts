import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ShipmentStatus } from '../../resources/models/ShipmentStatus';
import * as ShipmentStatusesActions from '../actions/shipment-statuses.actions';

export const shipmentStatusesFeatureKey = 'shipmentStatuses';

export interface State extends EntityState<ShipmentStatus> {
  error: any
}

export const adapter: EntityAdapter<ShipmentStatus> = createEntityAdapter<ShipmentStatus>();

export const initialState: State = adapter.getInitialState({
  error: null
});


export const reducer = createReducer(
  initialState,
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
