import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './shared/layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { DateAdapter } from '@angular/material';
import { MAT_DATE_LOCALE } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentDateAdapter, MatMomentDateModule } from '@angular/material-moment-adapter';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        LayoutModule,
        MatMomentDateModule,
        HttpClientModule,
        SharedModule.forRoot(),
        AppRoutingModule,
        ToastrModule.forRoot({
            maxOpened: 1, newestOnTop: true, preventDuplicates: true, autoDismiss: true,
            tapToDismiss: false,
        }),
    ],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: DateAdapter, useClass: MomentDateAdapter }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {

}
