import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {BehaviorSubject} from 'rxjs/Rx';

import {AppService} from '../app.service';
import {FormModel} from './form.model';

@Component({
    selector: 'browser-component',
    templateUrl: './browser.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowserComponent implements OnInit {
    /**
     * Corresponding values.
     */
    current: FormModel;
    previous: FormModel;
    next: FormModel;
    first: FormModel;
    last: FormModel;

    /**
     * List offset (index of the previous page last item).
     */
    offset: number;

    /**
     * Flag to show the detail view, list otherwise.
     */
    detailed: boolean = false;

    /**
     * Stream of the list of items.
     */
    items$: BehaviorSubject<FormModel[]> = new BehaviorSubject(null);

    /**
     * List of items.
     */
    private items: FormModel[];

    /**
     * Index of the current item.
     */
    private index: number = -1;

    constructor(private http: HttpClient, private route: ActivatedRoute,
            app: AppService) {
        app.active = this;
    }

    ngOnInit() {
        this.items$.subscribe(items => this.synchronize(items));

        this.route.queryParams.subscribe(params => {
            if (params.id) {
                this.loadDetail(params);
            }
            else {
                this.loadList(params);
            }
        });
    }

    /**
     * Synchronizes values.
     */
    private synchronize(items?: FormModel[]) {
        const length = items ? items.length : 0,
            last = length - 1;

        this.items = items;

        if (!length) {
            this.index = -1;
        }
        else if (this.index < 0) {
            this.index = 0;
        }
        else if (this.index > last) {
            this.index = last;
        }

        if (this.index > -1) {
            this.current = items[this.index];
            this.previous = items[this.index - 1] || undefined;
            this.next = items[this.index + 1] || undefined;
            this.first = this.index > 0 ? items[0] : undefined;
            this.last = this.index < last ? items[last] : undefined;
        }
        else {
            this.current = this.previous = this.next = this.first = this.last = undefined;
        }
    }

    /**
     * Loads the list.
     */
    private loadList(params: any) {
        //this.items$.next(null);

        this.http.get('api:facts')
            .do(response => this.offset = response['paging'].from || 0)
            .map(response => response['values'])
            .map(items => items.filter(item => item.alias === 'budget_form'))
            .map(items => items.map(item => FormModel.convert(item)))
            .subscribe(items => this.list(items));
    }

    /**
     * Loads the detail.
     */
    private loadDetail(params: any) {
        this.http.get(`api:facts/byId/${params.id}`)
            .map(item => FormModel.convert(item))
            .subscribe(item => this.detail(item));
    }

    /**
     * Sets and shows the list.
     */
    private list(items?: FormModel[]) {
        if (items) {
            this.items$.next(items);
        }

        this.detailed = false;
    }

    /**
     * Updates or sets an item and shows the detail.
     */
    private detail(item: FormModel) {
        const items = this.items ? [...this.items] : [new FormModel()],
            index = this.items ? items.findIndex(current => current.id === item.id) : 0;

        if (index > -1) {
            items[index] = items[index].clone(item);
            this.index = index;

            this.items$.next(items);
        }

        this.detailed = true;
    }
}
