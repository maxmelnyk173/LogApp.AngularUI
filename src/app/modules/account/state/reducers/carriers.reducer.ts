import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Carriers } from '../../resources/models/Carrier';
import * as CarriersActions from '../actions/carriers.actions';

export const carriersFeatureKey = 'carriers';

export interface State extends EntityState<Carriers> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Carriers> = createEntityAdapter<Carriers>();

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
