import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/Rx';

import {DimensionModel} from './dimension.model';

@Component({
    selector: 'dimensions-list-component',
    templateUrl: './list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DimensionsListComponent implements OnInit {
    items$: Subject<DimensionModel[]> = new Subject();

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.load();
    }

    load() {
        this.items$.next(null);

        this.http.get('api:dimensions/full')
            .map(response => response['values'])
            .subscribe(values => this.items$.next(<DimensionModel[]>values));
    }
}
