/**
 * Detail component.
 */
import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/Rx';

import {DatasetModel} from './dataset.model';

@Component({
    selector: 'datasets-detail-component',
    templateUrl: './detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatasetsDetailComponent implements OnInit {
    item$:BehaviorSubject<DatasetModel> = new BehaviorSubject(null);

    constructor(private route: ActivatedRoute, private http: HttpClient) {
        this.route.params.subscribe(params => this.load(params.id));
    }

    ngOnInit() {
        ;
    }

    load(id: string) {
        this.item$.next(null);

        this.http.get(`api:facts/byId/${id}`)
            .subscribe(response => this.item$.next(<DatasetModel>response));
    }
}
