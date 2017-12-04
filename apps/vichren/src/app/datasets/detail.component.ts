/**
 * Detail component.
 */
import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs/Rx';

import {DatasetModel} from './dataset.model';

@Component({
    selector: 'datasets-detail-component',
    templateUrl: './detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatasetsDetailComponent implements OnInit {
    item$:Subject<DatasetModel> = new Subject();

    constructor(private route: ActivatedRoute, private http: HttpClient) {
        this.route.params.subscribe(params => this.load(params.id));
    }

    ngOnInit() {
        ;
    }

    load(id: string) {
        this.http.get(`api:facts/${id}`).subscribe(response => {
            this.item$.next(<DatasetModel>response);
        });
    }
}
