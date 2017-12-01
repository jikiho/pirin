import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/Rx';

import {DatasetModel} from './dataset.model';

@Component({
    selector: 'list-component',
    templateUrl: './list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
    values = new Subject<DatasetModel[]>();

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
        this.load();
    }

    load() {
        this.http.get('api:datasets').subscribe(response => {
            this.values.next(<Array<DatasetModel>>response['values']);
        });
    }
}
