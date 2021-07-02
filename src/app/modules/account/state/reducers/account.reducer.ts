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
  on(
    AccountActions.loadCurrentUserSuccessed,
    (state, action) => adapter.upsertOne(action.user, state)
  ),
  on(
    AccountActions.chooseCurrentUser,
    (state, action) => ({
      ...state,
      selectedUserId: action.selectedUserId
    })
  ),
  on(
    AccountActions.updateUserData,
    (state, action) => {
      return adapter.updateOne({ id: action.body.id, changes: action.body }, state);
    }
  ),
  on(
    AccountActions.loadCurrentUserFailed,
    AccountActions.updateUserDataFailed,
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