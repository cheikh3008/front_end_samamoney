import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnexionComponent } from './pages/connexion/connexion.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {_MatMenuDirectivesModule, MatMenuModule} from '@angular/material/menu';
import {JwtInterceptorService} from './services/jwt-interceptor.service';
import {DefaultModule} from './layout/default/default.module';
import {DefaultComponent} from './layout/default/default.component';
import {ErrorInterceptorService} from './services/error-interceptor.service';


@NgModule({
    declarations: [
        AppComponent,
        ConnexionComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        _MatMenuDirectivesModule,
        DefaultModule,
    ],
    providers: [
        DefaultComponent, {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptorService,
            multi: true
        },
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
