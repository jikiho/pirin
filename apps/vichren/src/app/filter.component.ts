import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/Rx';

import {DimensionModel} from './dimension.model';

@Component({
    selector: 'filter-component',
    templateUrl: './filter.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnInit {
    values = new Subject<DimensionModel[]>();

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.load();
    }

    load() {
        this.http.get('api:dimensions').subscribe(response => {
            this.values.next(<Array<DimensionModel>>response['values']);
        });
    }
}
