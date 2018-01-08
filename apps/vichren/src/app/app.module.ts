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
import {BrowsingComponent} from './browsing/browsing.component';
import {BudgetFormsDataService} from './budget-forms/data.service';
import {BudgetFormsDetailComponent} from './budget-forms/detail.component';
import {BudgetFormsListComponent} from './budget-forms/list.component';
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
import {UnavailablePipe} from './unavailable.pipe';

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
        BrowsingComponent,
        BudgetFormsDetailComponent,
        BudgetFormsListComponent,
        DatericPipe,
        DialogDirective,
        DimensionsListComponent,
        DisabledDirective,
        FactsChildrenComponent,
        FactsDetailComponent,
        FactsListComponent,
        HomeComponent,
        NumericPipe,
        TimestampPipe,
        UnavailablePipe
    ],
    providers: [
        AppService,
        ConfigService,
        BudgetFormsDataService,
        //Utils
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
