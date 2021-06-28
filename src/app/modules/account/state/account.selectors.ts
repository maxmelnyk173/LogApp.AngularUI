import {   createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as AccountReducer from './account.reducer';
import * as AccountModel from '../resources/User';

export interface State {
    users: AccountReducer.State;
}

export const reducers: ActionReducerMap<State> = {
    users: AccountReducer.reducer,
};

export const selectUserState = createFeatureSelector<AccountReducer.State>(
    AccountReducer.accountsFeatureKey
);

export const selectUserIds = createSelector(
    selectUserState,
    AccountReducer.selectIds
);

export const selectUserEntities = createSelector(
    selectUserState,
    AccountReducer.selectEntities
);

export const selectAllUsers = createSelector(
    selectUserState,
    AccountReducer.selectAll
);

export const selectCurrentUserId = createSelector(
    selectUserState,
    AccountReducer.getSelectedUserId
);

export const selectCurrentUser = createSelector(
    selectUserEntities,
    selectCurrentUserId,
    (userEntities, userId) => {
        return userId ? userEntities[userId] : null
    }
);
   