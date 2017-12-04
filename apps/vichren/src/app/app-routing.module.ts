/**
 * Main application routing module.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DatasetsDetailComponent} from './datasets/detail.component';
import {DatasetsListComponent} from './datasets/list.component';
import {DimensionsFilterComponent} from './dimensions/filter.component';
import {HomeComponent} from './home.component';

/**
 * Configuration of the application routing.
 */
const routes: Routes = [
    {
        path: 'datasets/filter',
        component: DimensionsFilterComponent
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
        component: HomeComponent
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
        {
            provide: 'stop',
            useValue: getFalse
        }
    ]
})
export class AppRoutingModule {
}
