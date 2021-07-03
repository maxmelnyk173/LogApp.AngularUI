import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { CostCenter, CostCenterAdd } from '../../resources/models/CostCenter';

/**
 * Load CostCenters
 */
export const loadCostCenters = createAction(
    '[Admin Section / CostCenters] Load CostCenter'
);

export const loadCostCentersSuccess = createAction(
    '[CostCenter Effect] Load CostCenter Success', 
    props<{ costCenters: CostCenter[] }>()
);

export const loadCostCentersFail = createAction(
    '[User Effect] Load CostCenter Fail', 
    props<{ error: any }>()
);

/**
 * Add CostCenter
 */
export const addCostCenter = createAction(
    '[Admin Section / CostCenter] Add CostCenter',
    props<{ costCenter: CostCenterAdd }>()
);

export const addCostCenterSuccess = createAction(
    '[CostCenter Effect] Add CostCenter Success', 
    props<{ costCenter: CostCenter }>()
);

export const addCostCenterFail = createAction(
    '[CostCenter Effect] Add CostCenter Fail', 
    props<{ error: any  }>()
);

/**
 * Delete CostCenter
 */
export const deleteCostCenter = createAction(
    '[Admin Section / CostCenter] Delete CostCenter',
    props<{ id: string }>()
);

export const deleteCostCenterSuccess = createAction(
    '[CostCenter Effect] Delete User Success',
    props<{ id: string }>()
);

export const deleteCostCenterFail = createAction(
    '[CostCenter Effect] Delete CostCenter Fail', 
    props<{ error: any }>()
);
