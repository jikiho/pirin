import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs/Rx';

import {AppService} from '../app.service';
import {FormModel} from './form.model';

@Component({
    selector: 'browser-component',
    templateUrl: './browser.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowserComponent implements OnInit {
    /**
     * Current, previous, next, first and last items.
     */
    get current(): FormModel {
        return this.index > -1 && this.items[this.index] || undefined;
    }

    get previous(): FormModel {
        return this.index > -1 && this.items[this.index - 1] || undefined;
    }

    get next(): FormModel {
        return this.index > -1 && this.items[this.index + 1] || undefined;
    }

    get first(): FormModel {
        return this.index > -1 && this.items[0] || undefined;
    }

    get last(): FormModel {
        return this.index > -1 && this.items[this.items.length - 1] || undefined;
    }

    /**
     * List offset (index of the previous page last item).
     */
    offset: number;

    /**
     * Flag to show the detail view, list otherwise.
     */
    detailed: boolean = false;

    /**
     * Actual list of items (stream).
     */
    items$: Subject<FormModel[]> = new Subject();

    /**
     * List of items.
     */
    private items: FormModel[];

    /**
     * Index of the current selected item.
     */
    private index: number;

    constructor(private http: HttpClient, private route: ActivatedRoute,
            app: AppService) {
        app.active = this;
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params.id) {
                //this.detail(params);
                this.loadDetail(params);
            }
            else {
                this.loadList(params);
            }
        });
    }

    /**
     * Loads the list.
     */
    private loadList(params: any) {
        this.items$.next(null);

        this.http.get('api:facts')
            .do(response => this.offset = response['paging'].from || 0)
            .map(response => response['values'])
            .map(items => items.map(item => FormModel.convert(item)))
            //.map(items => items.filter(item => item && item.type))
            //.do(items => console.debug("ITEMS", items))
            .subscribe(items => this.list(items));
    }

    /**
     * Loads the detail.
     */
    private loadDetail(params: any) {
        this.http.get(`api:facts/byId/${params.id}`)
            .map(item => FormModel.convert(item))
            //.do(item => console.debug("ITEM", item))
            .subscribe(item => this.detail(item));
    }

    /**
     * Sets and shows the list.
     */
    private list(items: FormModel[] = this.items) {
        this.index = -1;

        this.items = items;
        this.items$.next(this.items);

        this.detailed = false;
    }

    /**
     * Updates or sets an item and shows the detail.
     */
    private detail(item: FormModel) {
        if (!this.items) {
            this.items = [new FormModel()];
            this.index = 0;

            this.offset = 0;
        }
        else {
            this.index = this.items.findIndex(current => current.id === item.id);
        }

        if (this.index > -1) {
            Object.assign(this.items[this.index], item);
            this.items$.next(this.items);

            this.detailed = true;
        }
    }
}
