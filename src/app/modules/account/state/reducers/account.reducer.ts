import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as AccountActions from '../actions/account.actions';
import { CurrentUser } from '../../resources/models/User';

export const accountsFeatureKey = 'accounts';

export interface State extends EntityState<CurrentUser> {
  error: any
}

export const adapter: EntityAdapter<CurrentUser> = createEntityAdapter<CurrentUser>();

export const initialState: State = adapter.getInitialState({
  error: null
});

export const reducer = createReducer(
  initialState,
  on(
    AccountActions.changePasswordFail,
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