import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as UsersActions from '../actions/users.actions';
import { User } from '../../resources/models/User';

export const usersFeatureKey = 'users';

export interface State extends EntityState<User> {
  // additional entities state properties
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(
    UsersActions.loadUsersSuccess,
    (state, action) => adapter.setMany(action.users, state)
  ),
  on(
    UsersActions.addUserSuccess,
    (state, action) => {
      return adapter.updateOne({ id: action.user.id, changes: action.user }, state);
    }
  ),
  on(
    UsersActions.deleteUser, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(
    UsersActions.addUserFail,
    UsersActions.loadUsersFail,
    UsersActions.deleteUserFail,
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
