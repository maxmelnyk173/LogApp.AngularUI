import {   createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as AccountReducer from './account.reducer';
import * as AccountModel from '../resources/User';

export interface State {
    users: AccountReducer.State;
}

export const reducers: ActionReducerMap<State> = {
    users: AccountReducer.userReducer,
};

export const selectUserState = createFeatureSelector<AccountReducer.State>(
    AccountReducer.accountsFeatureKey
);

export const selectUserIds = createSelector(
    selectUserState,
    AccountReducer.selectUserIds // shorthand for usersState => fromUser.selectUserIds(usersState)
);
export const selectUserEntities = createSelector(
    selectUserState,
    AccountReducer.selectUserEntities
);
export const selectAllUsers = createSelector(
    selectUserState,
    AccountReducer.selectAllUsers
);

export const selectCurrentUserId = createSelector(
    selectUserState,
    AccountReducer.getSelectedUserId
);

export const selectCurrentUser = createSelector(
    selectUserEntities,
    selectCurrentUserId,
    (userEntities, userId) => userEntities[userId]
);