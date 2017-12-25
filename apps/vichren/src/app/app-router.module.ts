/**
 * Main application router module.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes, RouteReuseStrategy} from '@angular/router';

import {AppRouteReuseStrategy} from './app-route.reuse-strategy';
import {BrowserComponent} from './browser/browser.component';
import {DatasetsDetailComponent} from './datasets/detail.component';
import {DatasetsListComponent} from './datasets/list.component';
import {DimensionsListComponent} from './dimensions/list.component';
import {HomeComponent} from './home.component';

/**
 * Configuration of the application routing.
 */
const routes: Routes = [
    {
        path: 'browser',
        component: BrowserComponent
    },
    {
        path: 'dimensions',
        component: DimensionsListComponent
    },
    {
        path: 'datasets/:id',
        component: DatasetsDetailComponent
    },
    {
        path: 'datasets',
        component: DatasetsListComponent
    },
    {
        path: '**',
        //component: HomeComponent
        redirectTo: 'browser'
    }
];

/**
 * Returns a false value (e.g. to stop routing).
 */
export function getFalse(): boolean {
    return false;
}

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    exports: [
        RouterModule
    ],
    providers: [
        /*
        {
            provide: RouteReuseStrategy,
            useClass: AppRouteReuseStrategy
        },
        */
        {
            provide: 'stop',
            useValue: getFalse
        }
    ]
})
export class AppRouterModule {
}
