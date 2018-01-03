/**
 * Main application module.
 */
import {NgModule, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {NxModule} from '@nrwl/nx';

import {AboutComponent} from './about.component';
import {AppComponent} from './app.component';
import {AppRouterModule} from './app-router.module';
import {AppService} from './app.service';
import {BoolericPipe} from './booleric.pipe';
import {BrowserComponent} from './browser/browser.component';
import {BrowserDetailComponent} from './browser/detail.component';
import {BrowserListComponent} from './browser/list.component';
import {ConfigService} from './config.service';
import {DatericPipe} from './dateric.pipe';
import {DialogDirective} from './dialog.directive';
import {DimensionsListComponent} from './dimensions/list.component';
import {DisabledDirective} from './disabled.directive';
import {FactsChildrenComponent} from './facts/children.component';
import {FactsDetailComponent} from './facts/detail.component';
import {FactsListComponent} from './facts/list.component';
import {HomeComponent} from './home.component';
import {HttpModule} from './http/http.module';
import {NumericPipe} from './numeric.pipe';
import {TimestampPipe} from './timestamp.pipe';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NxModule.forRoot(),
        AppRouterModule
    ],
    declarations: [
        AboutComponent,
        AppComponent,
        BoolericPipe,
        BrowserComponent,
        BrowserDetailComponent,
        BrowserListComponent,
        DatericPipe,
        DialogDirective,
        DimensionsListComponent,
        DisabledDirective,
        FactsChildrenComponent,
        FactsDetailComponent,
        FactsListComponent,
        HomeComponent,
        NumericPipe,
        TimestampPipe
    ],
    providers: [
        AppService,
        ConfigService,
        //Utils
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
