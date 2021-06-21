import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Account } from './account.model';

export const loadAccounts = createAction(
  '[Account/API] Load Accounts', 
  props<{ accounts: Account[] }>()
);

export const addAccount = createAction(
  '[Account/API] Add Account',
  props<{ account: Account }>()
);

export const upsertAccount = createAction(
  '[Account/API] Upsert Account',
  props<{ account: Account }>()
);

export const addAccounts = createAction(
  '[Account/API] Add Accounts',
  props<{ accounts: Account[] }>()
);

export const upsertAccounts = createAction(
  '[Account/API] Upsert Accounts',
  props<{ accounts: Account[] }>()
);

export const updateAccount = createAction(
  '[Account/API] Update Account',
  props<{ account: Update<Account> }>()
);

export const updateAccounts = createAction(
  '[Account/API] Update Accounts',
  props<{ accounts: Update<Account>[] }>()
);

export const deleteAccount = createAction(
  '[Account/API] Delete Account',
  props<{ id: string }>()
);

export const deleteAccounts = createAction(
  '[Account/API] Delete Accounts',
  props<{ ids: string[] }>()
);

export const clearAccounts = createAction(
  '[Account/API] Clear Accounts'
);
