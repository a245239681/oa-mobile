import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { API_URL } from 'src/infrastructure/host-address';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import {
  CachingInterceptor,
  AuthInterceptor
} from 'src/infrastructure/http-interceptor';
import {
  RequestCache,
  RequestCacheWithMap
} from 'src/infrastructure/request-cache';
import { UserInfo } from 'src/infrastructure/user-info';
import { CommonHelper } from 'src/infrastructure/commonHelper';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/components/components.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AppRoutingModule,
    ComponentsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    UserInfo,
    FormBuilder,
    CommonHelper,
    InAppBrowser,
    {
      provide: API_URL,
      useValue: environment.url,
    },
    [
      { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
      }
    ],
    { provide: RequestCache, useClass: RequestCacheWithMap },

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
