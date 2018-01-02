import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/Rx';

import {DatasetModel} from './dataset.model';

@Component({
    selector: 'datasets-list-component',
    templateUrl: './list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatasetsListComponent implements OnInit {
    items$: BehaviorSubject<DatasetModel[]> = new BehaviorSubject(null);

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.load();
    }

    load() {
        this.items$.next(null);

        this.http.get('api:facts')
            .map(response => response['values'])
            .subscribe(values => this.items$.next(<DatasetModel[]>values));
    }
}
