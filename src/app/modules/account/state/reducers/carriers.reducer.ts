import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Carriers } from '../../resources/carriers.model';
import * as CarriersActions from '../actions/carriers.actions';

export const carriersesFeatureKey = 'carriers';

export interface State extends EntityState<Carriers> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Carriers> = createEntityAdapter<Carriers>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(CarriersActions.addCarriers,
    (state, action) => adapter.addOne(action.carriers, state)
  ),
  on(CarriersActions.upsertCarriers,
    (state, action) => adapter.upsertOne(action.carriers, state)
  ),
  on(CarriersActions.addCarrierss,
    (state, action) => adapter.addMany(action.carrierss, state)
  ),
  on(CarriersActions.upsertCarrierss,
    (state, action) => adapter.upsertMany(action.carrierss, state)
  ),
  on(CarriersActions.updateCarriers,
    (state, action) => adapter.updateOne(action.carriers, state)
  ),
  on(CarriersActions.updateCarrierss,
    (state, action) => adapter.updateMany(action.carrierss, state)
  ),
  on(CarriersActions.deleteCarriers,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(CarriersActions.deleteCarrierss,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(CarriersActions.loadCarrierss,
    (state, action) => adapter.setAll(action.carrierss, state)
  ),
  on(CarriersActions.clearCarrierss,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
