import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { StoreModule } from '@ngrx/store';
import * as fromAccount from './state/reducers/account.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AccountEffects } from './state/effects/account.effects';
import { FlexLayoutModule } from '@angular/flex-layout';

//UI modules
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { UserComponent } from './user/user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import * as fromUsers from './state/reducers/users.reducer';
import * as fromCarriers from './state/reducers/carriers.reducer';
import * as fromCostcenters from './state/reducers/costcenters.reducer';
import * as fromShipmentStatuses from './state/reducers/shipment-statuses.reducer';
import { ShipmentStatusesEffects } from './state/effects/shipment-statuses.effects';
import { UsersEffects } from './state/effects/users.effects';
import { CarriersEffects } from './state/effects/carriers.effects';
import { CostcentersEffects } from './state/effects/costcenters.effects';

@NgModule({
  declarations: [
    AccountComponent,
    UserComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    MatFormFieldModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,

    StoreModule.forFeature(fromAccount.accountsFeatureKey, fromAccount.reducer),
    StoreModule.forFeature(fromUsers.usersesFeatureKey, fromUsers.reducer),
    StoreModule.forFeature(fromCarriers.carriersesFeatureKey, fromCarriers.reducer),
    StoreModule.forFeature(fromCostcenters.costcentersesFeatureKey, fromCostcenters.reducer),
    StoreModule.forFeature(fromShipmentStatuses.shipmentStatusesesFeatureKey, fromShipmentStatuses.reducer),
    EffectsModule.forFeature([AccountEffects, CarriersEffects, CostcentersEffects, ShipmentStatusesEffects, UsersEffects]),
  ]
})
export class AccountModule { }
