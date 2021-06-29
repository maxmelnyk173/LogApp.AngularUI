import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ShipmentStatuses } from '../../resources/shipment-statuses.model';
import * as ShipmentStatusesActions from '../actions/shipment-statuses.actions';

export const shipmentStatusesesFeatureKey = 'shipmentStatuses';

export interface State extends EntityState<ShipmentStatuses> {
  // additional entities state properties
}

export const adapter: EntityAdapter<ShipmentStatuses> = createEntityAdapter<ShipmentStatuses>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(ShipmentStatusesActions.addShipmentStatuses,
    (state, action) => adapter.addOne(action.shipmentStatuses, state)
  ),
  on(ShipmentStatusesActions.upsertShipmentStatuses,
    (state, action) => adapter.upsertOne(action.shipmentStatuses, state)
  ),
  on(ShipmentStatusesActions.addShipmentStatusess,
    (state, action) => adapter.addMany(action.shipmentStatusess, state)
  ),
  on(ShipmentStatusesActions.upsertShipmentStatusess,
    (state, action) => adapter.upsertMany(action.shipmentStatusess, state)
  ),
  on(ShipmentStatusesActions.updateShipmentStatuses,
    (state, action) => adapter.updateOne(action.shipmentStatuses, state)
  ),
  on(ShipmentStatusesActions.updateShipmentStatusess,
    (state, action) => adapter.updateMany(action.shipmentStatusess, state)
  ),
  on(ShipmentStatusesActions.deleteShipmentStatuses,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(ShipmentStatusesActions.deleteShipmentStatusess,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(ShipmentStatusesActions.loadShipmentStatusess,
    (state, action) => adapter.setAll(action.shipmentStatusess, state)
  ),
  on(ShipmentStatusesActions.clearShipmentStatusess,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
