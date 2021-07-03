import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as AccountActions from '../actions/account.actions';
import { CurrentUser } from '../../resources/models/User';

export const accountsFeatureKey = 'accounts';

export interface State extends EntityState<CurrentUser> {
  selectedUserId: string | null;
  error: any
}

export const adapter: EntityAdapter<CurrentUser> = createEntityAdapter<CurrentUser>();

export const initialState: State = adapter.getInitialState({
  selectedUserId: null,
  error: null
});

export const reducer = createReducer(
  initialState,
);

export function reduserReducer(state: State | undefined, action: Action) {
  return reducer(state, action);
}
 
export const getSelectedUserId = (state: State) => state.selectedUserId;

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();