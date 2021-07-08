import { createAction, props } from '@ngrx/store';
import { Order, OrderPostOrPut, PackingType, Stackability } from '../resources/Order';

/**
 * Load Orders
 */
 export const loadOrdersByDate = createAction(
  '[Orders Component] Load Orders',
  props<{ fromDate: Date, toDate: Date }>()
);

export const loadOrdersByDateSuccess = createAction(
  '[Orders Effect] Load Orders Success', 
  props<{ orders: Order[] }>()
);

export const loadOrdersByDateFail = createAction(
  '[Orders Effect] Load Orders Fail', 
  props<{ error: any }>()
);

/**
* Add Order
*/
export const addOrder = createAction(
  '[Orders Component] Add Order',
  props<{ order: OrderPostOrPut }>()
);

export const addOrderSuccess = createAction(
  '[Order Effect] Add Order Success', 
  props<{ order: Order }>()
);

export const addOrderFail = createAction(
  '[Order Effect] Add Order Fail', 
  props<{ error: any  }>()
);

/**
* Update Order
*/
export const updateOrder = createAction(
  '[Orders Component] Update Order',
  props<{ id:string, order: OrderPostOrPut }>()
);

export const updateOrderSuccess = createAction(
  '[Order Effect] Update Order Success', 
  props<{ order: Order }>()
);

export const updateOrderFail = createAction(
  '[Order Effect] Update Order Fail', 
  props<{ error: any  }>()
);

/**
* Delete Order
*/
export const deleteOrder = createAction(
  '[Orders Component] Delete Order',
  props<{ id: string }>()
);

export const deleteOrderSuccess = createAction(
  '[Order Effect] Delete Order Success',
  props<{ id: string }>()
);

export const deleteOrderFail = createAction(
  '[Order Effect] Delete Order Fail', 
  props<{ error: any }>()
);

/**
 * Load Orders
 */
 export const loadPackingTypes = createAction(
  '[Orders Component] Load Packing Types'
);

export const loadPackingTypesSuccess = createAction(
  '[Orders Effect] Load Packing Types Success', 
  props<{ packings: PackingType[] }>()
);

export const loadPackingTypesFail = createAction(
  '[Orders Effect] Load Packing Types Fail', 
  props<{ error: any }>()
);

/**
 * Load Orders
 */
 export const loadStackability = createAction(
  '[Orders Component] Load Stackability'
);

export const loadStackabilitySuccess = createAction(
  '[Orders Effect] Load Stackability Success', 
  props<{ stackability: Stackability[] }>()
);

export const loadStackabilityFail = createAction(
  '[Orders Effect] Load Stackability Fail', 
  props<{ error: any }>()
);