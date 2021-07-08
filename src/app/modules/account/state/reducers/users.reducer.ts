import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as UsersActions from '../actions/users.actions';
import { User } from '../../resources/models/User';

export const usersFeatureKey = 'users';

export interface State extends EntityState<User> {
  selectedUserId: string | null;
  error: any
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
  selectedUserId: null,
  error: null
});


export const reducer = createReducer(
  initialState,
  on(
    UsersActions.loadUsersSuccess,
    (state, action) => adapter.setMany(action.users, state)
  ),
  on(
    UsersActions.chooseCurrentUser,
    (state, action) => ({
      ...state,
      selectedUserId: action.selectedUserId
    })
  ),
  on(
    UsersActions.addUserSuccess,
    (state, { user }) => {return adapter.addOne(user, state)}
  ),
  on(
    UsersActions.updateUserSuccess,
    (state, action) => {
      return adapter.updateOne({ id: action.user.id, changes: action.user }, state);
    }
  ),
  on(
    UsersActions.deleteUserSuccess, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(
    UsersActions.addUserFail,
    UsersActions.loadUsersFail,
    UsersActions.deleteUserFail,
    UsersActions.resetPasswordFail,
    (state, action) => {
      return {
        ...state,
        error: action.error
      }
    }
  ),
);

export const getSelectedUserId = (state: State) => state.selectedUserId;

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
