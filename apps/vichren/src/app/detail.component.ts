/**
 * Detail component.
 */
import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/Rx';

import {DatasetModel} from './dataset.model';

@Component({
    selector: 'detail-component',
    templateUrl: './detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailComponent implements OnInit {
    values = new Subject<DatasetModel>();

    constructor(private route: ActivatedRoute, private http: HttpClient) {
        this.route.params.subscribe(params => this.load(params.id));
    }

    ngOnInit() {
    }

    load(id: string) {
        this.http.get(`api:datasets/${id}`).subscribe(response => {
            this.values.next(<DatasetModel>response);
        });
    }
}
