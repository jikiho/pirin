/**
 * Budget forms list component.
 */
import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {BehaviorSubject} from 'rxjs/Rx';

import {AppService} from '../app.service';
import {BudgetFormModel} from './budget-form.model';
import {BudgetFormsDataService} from './data.service';

@Component({
    selector: 'budget-forms-list-component',
    templateUrl: './list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetFormsListComponent implements OnInit {
    base: string = '/budget-forms';

    items$: BehaviorSubject<BudgetFormModel[]> = this.data.items$;

    browser$: BehaviorSubject<any> = this.data.browser$;

    constructor(private route: ActivatedRoute,
            app: AppService, private data: BudgetFormsDataService) {
        app.active = this;
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => this.loadList(params));
    }

    private loadList(params: Params) {
        this.data.loadList(params);
    }
}
