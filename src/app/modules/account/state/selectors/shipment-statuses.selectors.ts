import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as ShipmentStatusesReducer from '../reducers/shipment-statuses.reducer';

export interface State {
    shipmentStatuses: ShipmentStatusesReducer.State;
}

export const reducers: ActionReducerMap<State> = {
    shipmentStatuses: ShipmentStatusesReducer.reducer,
};

export const selectShipmentStatusState = createFeatureSelector<ShipmentStatusesReducer.State>(
    ShipmentStatusesReducer.shipmentStatusesFeatureKey
);

export const selectShipmentStatusEntities = createSelector(
    selectShipmentStatusState,
    ShipmentStatusesReducer.selectEntities
);

export const selectAllShipmentStatuses = createSelector(
    selectShipmentStatusState,
    ShipmentStatusesReducer.selectAll
);
