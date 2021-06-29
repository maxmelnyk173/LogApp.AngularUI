import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Users } from '../../resources/users.model';
import * as UsersActions from '../actions/users.actions';

export const usersesFeatureKey = 'users';

export interface State extends EntityState<Users> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Users> = createEntityAdapter<Users>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});


export const reducer = createReducer(
  initialState,
  on(UsersActions.addUsers,
    (state, action) => adapter.addOne(action.users, state)
  ),
  on(UsersActions.upsertUsers,
    (state, action) => adapter.upsertOne(action.users, state)
  ),
  on(UsersActions.addUserss,
    (state, action) => adapter.addMany(action.userss, state)
  ),
  on(UsersActions.upsertUserss,
    (state, action) => adapter.upsertMany(action.userss, state)
  ),
  on(UsersActions.updateUsers,
    (state, action) => adapter.updateOne(action.users, state)
  ),
  on(UsersActions.updateUserss,
    (state, action) => adapter.updateMany(action.userss, state)
  ),
  on(UsersActions.deleteUsers,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(UsersActions.deleteUserss,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(UsersActions.loadUserss,
    (state, action) => adapter.setAll(action.userss, state)
  ),
  on(UsersActions.clearUserss,
    state => adapter.removeAll(state)
  ),
);


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
