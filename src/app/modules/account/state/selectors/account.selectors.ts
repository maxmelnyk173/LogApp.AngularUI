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
   