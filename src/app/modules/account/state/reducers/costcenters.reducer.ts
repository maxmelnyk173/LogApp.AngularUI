import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CostCenter } from '../../resources/models/CostCenter';
import * as CostCentersActions from '../actions/cost-centers.actions';

export const costcentersFeatureKey = 'costcenters';

export interface State extends EntityState<CostCenter> {
  error: any
}

export const adapter: EntityAdapter<CostCenter> = createEntityAdapter<CostCenter>();

export const initialState: State = adapter.getInitialState({
  error: null
});


export const reducer = createReducer(
  initialState,
  on(
    CostCentersActions.loadCostCentersSuccess,
    (state, action) => adapter.setMany(action.costCenters, state)
  ),
  on(
    CostCentersActions.addCostCenterSuccess,
    (state, { costCenter }) => { return adapter.addOne(costCenter, state) }
  ),
  on(
    CostCentersActions.deleteCostCenterSuccess, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(
    CostCentersActions.addCostCenterFail,
    CostCentersActions.loadCostCentersFail,
    CostCentersActions.deleteCostCenterFail,
    (state, action) => {
      return {
        ...state,
        error: action.error
      }
    }
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
