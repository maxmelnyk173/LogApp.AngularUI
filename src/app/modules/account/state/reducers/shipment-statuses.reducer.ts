import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ShipmentStatuses } from '../../resources/models/ShipmentStatus';
import * as ShipmentStatusesActions from '../actions/shipment-statuses.actions';

export const shipmentStatusesFeatureKey = 'shipmentStatuses';

export interface State extends EntityState<ShipmentStatuses> {
  // additional entities state properties
}

export const adapter: EntityAdapter<ShipmentStatuses> = createEntityAdapter<ShipmentStatuses>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
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
