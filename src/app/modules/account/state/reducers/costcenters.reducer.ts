import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Costcenters } from '../../resources/costcenters.model';
import * as CostcentersActions from '../actions/costcenters.actions';

export const costcentersesFeatureKey = 'costcenters';

export interface State extends EntityState<Costcenters> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Costcenters> = createEntityAdapter<Costcenters>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(CostcentersActions.addCostcenters,
    (state, action) => adapter.addOne(action.costcenters, state)
  ),
  on(CostcentersActions.upsertCostcenters,
    (state, action) => adapter.upsertOne(action.costcenters, state)
  ),
  on(CostcentersActions.addCostcenterss,
    (state, action) => adapter.addMany(action.costcenterss, state)
  ),
  on(CostcentersActions.upsertCostcenterss,
    (state, action) => adapter.upsertMany(action.costcenterss, state)
  ),
  on(CostcentersActions.updateCostcenters,
    (state, action) => adapter.updateOne(action.costcenters, state)
  ),
  on(CostcentersActions.updateCostcenterss,
    (state, action) => adapter.updateMany(action.costcenterss, state)
  ),
  on(CostcentersActions.deleteCostcenters,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(CostcentersActions.deleteCostcenterss,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(CostcentersActions.loadCostcenterss,
    (state, action) => adapter.setAll(action.costcenterss, state)
  ),
  on(CostcentersActions.clearCostcenterss,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
