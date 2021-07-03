import { createAction, props } from '@ngrx/store';
import { ShipmentStatus, ShipmentStatusAdd } from '../../resources/models/ShipmentStatus';


/**
 * Load Shipment-Statuses
 */
 export const loadShipmentStatuses = createAction(
    '[Admin Section / ShipmentStatuses] Load ShipmentStatuses'
);

export const loadShipmentStatusesSuccess = createAction(
    '[ShipmentStatuses Effect] Load ShipmentStatuses Success', 
    props<{ shipmentStatuses: ShipmentStatus[] }>()
);

export const loadShipmentStatusesFail = createAction(
    '[ShipmentStatuses Effect] Load ShipmentStatuses Fail', 
    props<{ error: any }>()
);

/**
 * Add Shipment-Status
 */
export const addShipmentStatus = createAction(
    '[Admin Section / ShipmentStatuses] Add ShipmentStatus',
    props<{ shipmentStatus: ShipmentStatusAdd }>()
);

export const addShipmentStatusSuccess = createAction(
    '[ShipmentStatuses Effect] Add ShipmentStatus Success', 
    props<{ shipmentStatus: ShipmentStatus }>()
);

export const addShipmentStatusFail = createAction(
    '[ShipmentStatuses Effect] Add ShipmentStatus Fail', 
    props<{ error: any  }>()
);

/**
 * Delete ShipmentStatus
 */
export const deleteShipmentStatus = createAction(
    '[Admin Section / ShipmentStatus] Delete ShipmentStatus',
    props<{ id: string }>()
);

export const deleteShipmentStatusSuccess = createAction(
    '[ShipmentStatus Effect] Delete ShipmentStatus Success',
    props<{ id: string }>()
);

export const deleteShipmentStatusFail = createAction(
    '[ShipmentStatus Effect] Delete ShipmentStatus Fail', 
    props<{ error: any }>()
);