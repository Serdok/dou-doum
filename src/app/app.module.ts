import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { SharedModule as PrimeNgSharedModule }  from './shared.module';
import { HomeComponent } from './components/home/home.component';
import {MenubarModule} from "primeng/menubar";
import {SharedModule} from "primeng/api";

@NgModule({
    declarations: [
      AppComponent,
      HomeComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    MenubarModule,
    PrimeNgSharedModule,
  ],
    providers: [
        ScreenTrackingService, UserTrackingService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
