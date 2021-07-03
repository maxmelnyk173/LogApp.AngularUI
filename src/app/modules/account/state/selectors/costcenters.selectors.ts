import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as CostCenterReducer from '../reducers/costcenters.reducer';

export interface State {
    costCenters: CostCenterReducer.State;
}

export const reducers: ActionReducerMap<State> = {
    costCenters: CostCenterReducer.reducer,
};

export const selectCostCenterState = createFeatureSelector<CostCenterReducer.State>(
    CostCenterReducer.costcentersFeatureKey
);

export const selectCostCenterEntities = createSelector(
    selectCostCenterState,
    CostCenterReducer.selectEntities
);

export const selectAllCostCenters = createSelector(
    selectCostCenterState,
    CostCenterReducer.selectAll
);
