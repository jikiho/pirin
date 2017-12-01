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
import {DetailComponent} from './detail.component';
import {DialogDirective} from './dialog.directive';
import {FilterComponent} from './filter.component';
import {HomeComponent} from './home.component';
import {HttpModule} from './http.module';
import {ListComponent} from './list.component';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        NxModule.forRoot(),
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        DetailComponent,
        DialogDirective,
        FilterComponent,
        HomeComponent,
        ListComponent
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
