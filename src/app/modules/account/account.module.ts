import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { StoreModule } from '@ngrx/store';
import * as fromAccount from './state/account.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AccountEffects } from './state/account.effects';


@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    StoreModule.forFeature(fromAccount.accountsFeatureKey, fromAccount.reducer),
    EffectsModule.forFeature([AccountEffects])
  ]
})
export class AccountModule { }
