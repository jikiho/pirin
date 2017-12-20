import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs/Rx';

import {AppService} from '../app.service';
import {DatasetModel} from './dataset.model';

@Component({
    selector: 'browser-component',
    templateUrl: './browser.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowserComponent implements OnInit {
    offset: number;

    index: number;

    current: string;

    previous: string;

    next: string;

    detail: boolean = false;

    items$: Subject<DatasetModel[]> = new Subject();

    private items: DatasetModel[];

    constructor(private http: HttpClient, private route: ActivatedRoute,
            app: AppService) {
        app.active = this;
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params.id) {
                this.loadDetail(params);
            }
            else {
                this.loadList(params);
            }
        });
    }

    private loadList(params: any) {
        this.items$.next(null);

        this.http.get('api:facts')
            .do(response => this.offset = response['paging'].from || 0)
            .map(response => response['values'])
            .map(items => items.map(item => DatasetModel.convert(item)))
            .map(items => items.filter(item => item && item.type))
            //.do(items => console.debug("ITEMS", items))
            .subscribe(items => this.detail = !this.list(items));
    }

    private loadDetail(params: any) {
        this.http.get(`api:facts/${params.id}`)
            .map(item => DatasetModel.convert(item))
            //.do(item => console.debug("ITEM", item))
            .subscribe(item => this.detail = this.update(item));
    }

    private list(items: DatasetModel[]): boolean {
        this.index = -1;
        this.current = this.previous = this.next = undefined;

        this.items = items;
        this.items$.next(this.items);

        return true;
    }

    private update(item: DatasetModel): boolean {
        this.index = -1;
        this.current = this.previous = this.next = undefined;

        if (!this.items) {
            this.items = [new DatasetModel()];
            this.offset = 0;
            this.index = 0;
        }
        else {
            this.index = this.items.findIndex(current => current.id === item.id);
        }

        if (this.index > -1) {
            Object.assign(this.items[this.index], item);
            this.items$.next(this.items);

            this.current = item.id;

            item = this.items[this.index - 1];
            if (item) {
                this.previous = item.id;
            }

            item = this.items[this.index + 1];
            if (item) {
                this.next = item.id;
            }

            return true;
        }

        return false;
    }
}
