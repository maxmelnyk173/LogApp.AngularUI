import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Components
import { AdminComponent } from './admin/admin.component';
import { AccountComponent } from './account.component';

//Store & Reducers & Effects
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromAccount from './state/reducers/account.reducer';
import * as fromUsers from './state/reducers/users.reducer';
import * as fromCarriers from './state/reducers/carriers.reducer';
import * as fromCostcenters from './state/reducers/costcenters.reducer';
import * as fromShipmentStatuses from './state/reducers/shipment-statuses.reducer';
import { AccountEffects } from './state/effects/account.effects';
import { UsersEffects } from './state/effects/users.effects';
import { CarriersEffects } from './state/effects/carriers.effects';
import { CostCentersEffects } from './state/effects/cost-centers.effects';
import { ShipmentStatusesEffects } from './state/effects/shipment-statuses.effects';

//UI modules
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { UserComponent } from './user/user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

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
    MatExpansionModule,

    StoreModule.forFeature(fromAccount.accountsFeatureKey, fromAccount.reducer),
    StoreModule.forFeature(fromUsers.usersFeatureKey, fromUsers.reducer),
    StoreModule.forFeature(fromCarriers.carriersFeatureKey, fromCarriers.reducer),
    StoreModule.forFeature(fromCostcenters.costcentersFeatureKey, fromCostcenters.reducer),
    StoreModule.forFeature(fromShipmentStatuses.shipmentStatusesFeatureKey, fromShipmentStatuses.reducer),
    EffectsModule.forFeature([AccountEffects, CarriersEffects, CostCentersEffects, ShipmentStatusesEffects, UsersEffects]),
  ]
})
export class AccountModule { }
