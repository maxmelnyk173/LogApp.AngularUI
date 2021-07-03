import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as UserReducer from '../reducers/users.reducer';

export interface State {
    users: UserReducer.State;
}

export const reducers: ActionReducerMap<State> = {
    users: UserReducer.reducer,
};

export const selectUserState = createFeatureSelector<UserReducer.State>(
    UserReducer.usersFeatureKey
);

export const selectUserIds = createSelector(
    selectUserState,
    UserReducer.selectIds
);

export const selectUserEntities = createSelector(
    selectUserState,
    UserReducer.selectEntities
);

export const selectAllUsers = createSelector(
    selectUserState,
    UserReducer.selectAll
);

export const selectUserById = createSelector(
    selectUserState,
    UserReducer.getSelectedUserId
);

export const selectUser = createSelector(
    selectUserEntities,
    selectUserById,
    (userEntities, userId) => {
        return userId ? userEntities[userId] : null
    }
);