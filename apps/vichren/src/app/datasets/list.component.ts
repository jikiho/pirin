import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/Rx';

import {DatasetModel} from './dataset.model';

@Component({
    selector: 'datasets-list-component',
    templateUrl: './list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatasetsListComponent implements OnInit {
    items$: Subject<DatasetModel[]> = new Subject();

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.load();
    }

    load() {
        this.items$.next(null);

        this.http.get('api:facts').subscribe(response => {
            this.items$.next(<DatasetModel[]>response['values']);
        });
    }
}
