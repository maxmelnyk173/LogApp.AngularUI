//modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers, metaReducers } from './store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from './modules/auth/auth.module';
import { PagesModule } from './pages/pages.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { initAuthData } from './store/actions/auth.actions';
import { OrdersModule } from './modules/orders/orders.module';
import { AccountModule } from './modules/account/account.module';
import { FlexLayoutModule } from "@angular/flex-layout";

//Components
import { AppComponent } from './app.component';

//Mat UI imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { NavComponent } from './shared/components/nav/nav.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';

//Effects
import { SpinnerEffects } from './store/effects/spinner.effects';
import { AlertEffects } from './store/effects/alert.effects';
import { RouteEffects } from './store/effects/route.effects';
import { ErrorStateMatcher } from '@angular/material/core';
import { CustomErrorStateMatcher } from './common/customErrorStateMatcher ';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    //App modules
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule,
    PagesModule,
    FlexLayoutModule,

    //Mat UI modules
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatProgressBarModule,

    JwtModule.forRoot({
      config:{
        tokenGetter: request => request as any
      }
    }),
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([SpinnerEffects, AlertEffects, RouteEffects]),
    OrdersModule,
    AccountModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, 
    { provide: ErrorStateMatcher, useClass: CustomErrorStateMatcher },
    { provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(store: Store){
    store.dispatch(initAuthData())
  }
}
