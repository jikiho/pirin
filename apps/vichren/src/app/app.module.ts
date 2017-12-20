/**
 * Main application module.
 */
import {NgModule, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NxModule} from '@nrwl/nx';

import {AboutComponent} from './about.component';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppService} from './app.service';
import {BoolericPipe} from './booleric.pipe';
import {BrowserComponent} from './browser/browser.component';
import {BrowserDetailComponent} from './browser/detail.component';
import {BrowserListComponent} from './browser/list.component';
import {ConfigService} from './config.service';
import {DatasetsChildrenComponent} from './datasets/children.component';
import {DatasetsDetailComponent} from './datasets/detail.component';
import {DatasetsListComponent} from './datasets/list.component';
import {DatericPipe} from './dateric.pipe';
import {DialogDirective} from './dialog.directive';
import {DimensionsListComponent} from './dimensions/list.component';
import {HomeComponent} from './home.component';
import {HttpModule} from './http.module';
import {NumericPipe} from './numeric.pipe';
import {TimestampPipe} from './timestamp.pipe';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NxModule.forRoot(),
        AppRoutingModule
    ],
    declarations: [
        AboutComponent,
        AppComponent,
        BoolericPipe,
        BrowserComponent,
        BrowserDetailComponent,
        BrowserListComponent,
        DatasetsChildrenComponent,
        DatasetsDetailComponent,
        DatasetsListComponent,
        DatericPipe,
        DialogDirective,
        DimensionsListComponent,
        HomeComponent,
        NumericPipe,
        TimestampPipe
    ],
    providers: [
        AppService,
        ConfigService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
