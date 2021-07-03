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
  on(
    CarriersActions.loadCarriersSuccess,
    (state, action) => adapter.setMany(action.carriers, state)
  ),
  on(
    CarriersActions.addCarrierSuccess,
    (state, { carrier }) => { return adapter.addOne(carrier, state) }
  ),
  on(
    CarriersActions.deleteCarrierSuccess, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(
    CarriersActions.addCarrierFail,
    CarriersActions.loadCarriersFail,
    CarriersActions.deleteCarrierFail,
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
