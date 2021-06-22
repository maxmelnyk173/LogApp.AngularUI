import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as AccountActions from './account.actions';
import { User } from '../resources/User';

export const accountsFeatureKey = 'accounts';

export interface State extends EntityState<User> {
  // additional entities state properties
  error: any
  selectedUserId: string | null;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedUserId: null,
  error: null
});

export const reducer = createReducer(
  initialState,
  on(AccountActions.loadUsersSuccessed, 
    (state, action) => adapter.setAll(action.users, state)
  ),
  on(
    AccountActions.loadCurrentUserSuccessed,
    (state, action) => adapter.setOne(action.user, state)
  ),
  on(
    AccountActions.loadCurrentUserFailed,
    (state, action) => {
      return {
        ...state,
        error: action.error
      }
    }
  ),
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

// select the array of user ids
export const selectUserIds = selectIds;
 
// select the dictionary of user entities
export const selectUserEntities = selectEntities;
 
// select the array of users
export const selectAllUsers = selectAll;