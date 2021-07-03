import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as CarrierReducer from '../reducers/carriers.reducer';

export interface State {
    costCenters: CarrierReducer.State;
}

export const reducers: ActionReducerMap<State> = {
    costCenters: CarrierReducer.reducer,
};

export const selectCarrierState = createFeatureSelector<CarrierReducer.State>(
    CarrierReducer.carriersFeatureKey
);

export const selectCarrierEntities = createSelector(
    selectCarrierState,
    CarrierReducer.selectEntities
);

export const selectAllCarriers = createSelector(
    selectCarrierState,
    CarrierReducer.selectAll
);