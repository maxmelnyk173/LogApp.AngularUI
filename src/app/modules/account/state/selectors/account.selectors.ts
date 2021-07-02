import {   createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as AccountReducer from '../reducers/account.reducer';

export interface State {
    users: AccountReducer.State;
}

export const reducers: ActionReducerMap<State> = {
    users: AccountReducer.reducer,
};

export const selectUserState = createFeatureSelector<AccountReducer.State>(
    AccountReducer.accountsFeatureKey
);

export const selectUserEntities = createSelector(
    selectUserState,
    AccountReducer.selectEntities
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
   