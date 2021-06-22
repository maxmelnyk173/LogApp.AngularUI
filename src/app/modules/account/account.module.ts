import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { StoreModule } from '@ngrx/store';
import * as fromAccount from './state/account.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AccountEffects } from './state/account.effects';

//UI modules
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { UserComponent } from './user/user.component';


@NgModule({
  declarations: [
    AccountComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatTabsModule,
    MatCardModule,
    StoreModule.forFeature(fromAccount.accountsFeatureKey, fromAccount.reducer),
    EffectsModule.forFeature([AccountEffects])
  ]
})
export class AccountModule { }
