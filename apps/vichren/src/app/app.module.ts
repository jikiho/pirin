/**
 * Main application module.
 */
import {NgModule, LOCALE_ID} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NxModule} from '@nrwl/nx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {AppService} from './app.service';
import {ConfigService} from './config.service';
import {DatasetsChildrenComponent} from './datasets/children.component';
import {DatasetsDetailComponent} from './datasets/detail.component';
import {DatasetsListComponent} from './datasets/list.component';
import {DialogDirective} from './dialog.directive';
import {DimensionsFilterComponent} from './dimensions/filter.component';
import {HomeComponent} from './home.component';
import {HttpModule} from './http.module';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        NxModule.forRoot(),
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        DatasetsChildrenComponent,
        DatasetsDetailComponent,
        DatasetsListComponent,
        DialogDirective,
        DimensionsFilterComponent,
        HomeComponent
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
