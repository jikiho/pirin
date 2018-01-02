import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/Rx';

import {DimensionModel} from './dimension.model';

@Component({
    selector: 'dimensions-list-component',
    templateUrl: './list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DimensionsListComponent implements OnInit {
    items$: BehaviorSubject<DimensionModel[]> = new BehaviorSubject();

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.load();
    }

    load() {
        this.items$.next(null);

        this.http.get('api:dimensions')
            .map(response => response['values'])
            .subscribe(values => this.items$.next(<DimensionModel[]>values));
    }
}
