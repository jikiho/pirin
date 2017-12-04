/**
 * Main application routing module.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DetailComponent} from './detail.component';
import {FilterComponent} from './filter.component';
import {HomeComponent} from './home.component';
import {ListComponent} from './list.component';

/**
 * Configuration of the application routing.
 */
const routes: Routes = [
    {
        path: 'datasets/filter',
        component: FilterComponent
    },
    {
        path: 'datasets/:id',
        component: DetailComponent
    },
    {
        path: 'datasets',
        component: ListComponent
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
