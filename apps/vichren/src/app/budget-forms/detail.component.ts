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
        if (!this.data.items$.getValue()) {
            this.loadList(this.route.snapshot.queryParams);
        }

        this.route.params.pluck('id').subscribe((id: string) => this.loadDetail(id));
    }

    private loadList(params: Params) {
        this.data.loadList(params);
    }

    private loadDetail(id: string) {
        this.data.updateDetail(id);
        this.data.loadDetail(id);
    }
}
