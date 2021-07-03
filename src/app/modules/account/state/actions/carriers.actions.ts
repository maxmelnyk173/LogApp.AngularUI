import { createAction, props } from '@ngrx/store';
import { Carrier, CarrierAdd } from '../../resources/models/Carrier';

/**
 * Load Carrier
 */
export const loadCarriers = createAction(
    '[Admin Section / Carrier] Load Carriers'
);

export const loadCarriersSuccess = createAction(
    '[Carrier Effect] Load Carrier Success', 
    props<{ carriers: Carrier[] }>()
);

export const loadCarriersFail = createAction(
    '[Carrier Effect] Load Carrier Fail', 
    props<{ error: any }>()
);

/**
 * Add Carrier
 */
export const addCarrier = createAction(
    '[Admin Section / Carrier] Add Carrier',
    props<{ carrier: CarrierAdd }>()
);

export const addCarrierSuccess = createAction(
    '[Carrier Effect] Add Carrier Success', 
    props<{ carrier: Carrier }>()
);

export const addCarrierFail = createAction(
    '[Carrier Effect] Add Carrier Fail', 
    props<{ error: any  }>()
);

/**
 * Delete Carrier
 */
export const deleteCarrier = createAction(
    '[Admin Section / Carrier] Delete Carrier',
    props<{ id: string }>()
);

export const deleteCarrierSuccess = createAction(
    '[Carrier Effect] Delete Carrier Success',
    props<{ id: string }>()
);

export const deleteCarrierFail = createAction(
    '[Carrier Effect] Delete Carrier Fail', 
    props<{ error: any }>()
);
