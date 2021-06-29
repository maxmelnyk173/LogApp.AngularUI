import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Costcenters } from '../../resources/costcenters.model';

export const loadCostcenterss = createAction(
  '[Costcenters/API] Load Costcenterss', 
  props<{ costcenterss: Costcenters[] }>()
);

export const addCostcenters = createAction(
  '[Costcenters/API] Add Costcenters',
  props<{ costcenters: Costcenters }>()
);

export const upsertCostcenters = createAction(
  '[Costcenters/API] Upsert Costcenters',
  props<{ costcenters: Costcenters }>()
);

export const addCostcenterss = createAction(
  '[Costcenters/API] Add Costcenterss',
  props<{ costcenterss: Costcenters[] }>()
);

export const upsertCostcenterss = createAction(
  '[Costcenters/API] Upsert Costcenterss',
  props<{ costcenterss: Costcenters[] }>()
);

export const updateCostcenters = createAction(
  '[Costcenters/API] Update Costcenters',
  props<{ costcenters: Update<Costcenters> }>()
);

export const updateCostcenterss = createAction(
  '[Costcenters/API] Update Costcenterss',
  props<{ costcenterss: Update<Costcenters>[] }>()
);

export const deleteCostcenters = createAction(
  '[Costcenters/API] Delete Costcenters',
  props<{ id: string }>()
);

export const deleteCostcenterss = createAction(
  '[Costcenters/API] Delete Costcenterss',
  props<{ ids: string[] }>()
);

export const clearCostcenterss = createAction(
  '[Costcenters/API] Clear Costcenterss'
);
