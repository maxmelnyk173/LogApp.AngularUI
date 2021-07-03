import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Carrier } from '../../resources/models/Carrier';
import * as CarriersActions from '../actions/carriers.actions';

export const carriersFeatureKey = 'carriers';

export interface State extends EntityState<Carrier> {
  error: any
}

export const adapter: EntityAdapter<Carrier> = createEntityAdapter<Carrier>();

export const initialState: State = adapter.getInitialState({
  error: null
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
