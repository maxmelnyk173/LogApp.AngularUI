import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { StoreModule } from '@ngrx/store';
import * as fromOrder from './state/order.reducer';
import { EffectsModule } from '@ngrx/effects';
import { OrderEffects } from './state/order.effects';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpsertOrdersComponent } from './upsert-orders/upsert-orders.component';

//Mat UI
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    OrdersComponent,
    UpsertOrdersComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    FlexLayoutModule,
    FormsModule, 
    ReactiveFormsModule,

    //UI
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatStepperModule,
    MatTooltipModule,

    StoreModule.forFeature(fromOrder.ordersFeatureKey, fromOrder.reducer),
    EffectsModule.forFeature([OrderEffects])
  ]
})
export class OrdersModule { }
