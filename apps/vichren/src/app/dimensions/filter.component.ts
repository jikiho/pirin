import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/Rx';

import {DimensionModel} from './dimension.model';

@Component({
    selector: 'dimensions-filter-component',
    templateUrl: './filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DimensionsFilterComponent implements OnInit {
    items$: Subject<DimensionModel[]> = new Subject();

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.load();
    }

    load() {
        this.items$.next(null);

        this.http.get('api:dimensions/full').subscribe(response => {
            this.items$.next(<DimensionModel[]>response['values']);
        });
    }
}
