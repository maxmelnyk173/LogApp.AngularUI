import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { ShipmentStatuses } from '../../resources/shipment-statuses.model';

export const loadShipmentStatusess = createAction(
  '[ShipmentStatuses/API] Load ShipmentStatusess', 
  props<{ shipmentStatusess: ShipmentStatuses[] }>()
);

export const addShipmentStatuses = createAction(
  '[ShipmentStatuses/API] Add ShipmentStatuses',
  props<{ shipmentStatuses: ShipmentStatuses }>()
);

export const upsertShipmentStatuses = createAction(
  '[ShipmentStatuses/API] Upsert ShipmentStatuses',
  props<{ shipmentStatuses: ShipmentStatuses }>()
);

export const addShipmentStatusess = createAction(
  '[ShipmentStatuses/API] Add ShipmentStatusess',
  props<{ shipmentStatusess: ShipmentStatuses[] }>()
);

export const upsertShipmentStatusess = createAction(
  '[ShipmentStatuses/API] Upsert ShipmentStatusess',
  props<{ shipmentStatusess: ShipmentStatuses[] }>()
);

export const updateShipmentStatuses = createAction(
  '[ShipmentStatuses/API] Update ShipmentStatuses',
  props<{ shipmentStatuses: Update<ShipmentStatuses> }>()
);

export const updateShipmentStatusess = createAction(
  '[ShipmentStatuses/API] Update ShipmentStatusess',
  props<{ shipmentStatusess: Update<ShipmentStatuses>[] }>()
);

export const deleteShipmentStatuses = createAction(
  '[ShipmentStatuses/API] Delete ShipmentStatuses',
  props<{ id: string }>()
);

export const deleteShipmentStatusess = createAction(
  '[ShipmentStatuses/API] Delete ShipmentStatusess',
  props<{ ids: string[] }>()
);

export const clearShipmentStatusess = createAction(
  '[ShipmentStatuses/API] Clear ShipmentStatusess'
);
