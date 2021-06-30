import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { CostCenters } from '../../resources/models/CostCenter';
import * as CostCentersActions from '../actions/cost-centers.actions';

export const costcentersFeatureKey = 'costcenters';

export interface State extends EntityState<CostCenters> {
  // additional entities state properties
}

export const adapter: EntityAdapter<CostCenters> = createEntityAdapter<CostCenters>();

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
