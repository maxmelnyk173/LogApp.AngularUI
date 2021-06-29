import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Carriers } from '../../resources/carriers.model';

export const loadCarrierss = createAction(
  '[Carriers/API] Load Carrierss', 
  props<{ carrierss: Carriers[] }>()
);

export const addCarriers = createAction(
  '[Carriers/API] Add Carriers',
  props<{ carriers: Carriers }>()
);

export const upsertCarriers = createAction(
  '[Carriers/API] Upsert Carriers',
  props<{ carriers: Carriers }>()
);

export const addCarrierss = createAction(
  '[Carriers/API] Add Carrierss',
  props<{ carrierss: Carriers[] }>()
);

export const upsertCarrierss = createAction(
  '[Carriers/API] Upsert Carrierss',
  props<{ carrierss: Carriers[] }>()
);

export const updateCarriers = createAction(
  '[Carriers/API] Update Carriers',
  props<{ carriers: Update<Carriers> }>()
);

export const updateCarrierss = createAction(
  '[Carriers/API] Update Carrierss',
  props<{ carrierss: Update<Carriers>[] }>()
);

export const deleteCarriers = createAction(
  '[Carriers/API] Delete Carriers',
  props<{ id: string }>()
);

export const deleteCarrierss = createAction(
  '[Carriers/API] Delete Carrierss',
  props<{ ids: string[] }>()
);

export const clearCarrierss = createAction(
  '[Carriers/API] Clear Carrierss'
);
