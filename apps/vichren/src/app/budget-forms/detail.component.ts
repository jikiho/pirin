/**
 * Budget form detail component.
 */
import {Component, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {BehaviorSubject} from 'rxjs/Rx';

import {AppService} from '../app.service';
import {BudgetFormModel} from './budget-form.model';
import {BudgetFormsDataService} from './data.service';

@Component({
    selector: 'budget-forms-detail-component',
    templateUrl: './detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BudgetFormsDetailComponent {
    base: string = '/budget-forms';

    browser$: BehaviorSubject<any> = this.data.browser$;

    constructor(private route: ActivatedRoute,
            app: AppService, private data: BudgetFormsDataService) {
        app.active = this;
    }

    ngOnInit() {
//TODO: join params changes load detail after list
//        this.route.queryParams.subscribe(params => this.loadList(params));

        this.route.params.map(params => params.id).distinctUntilChanged()
                .subscribe(id => this.loadDetail(id));
    }

    private loadList(params: Params) {
        this.data.loadList(params);
    }

    private loadDetail(id: string) {
        this.data.detail(id);
        this.data.loadDetail(id);
    }
}
