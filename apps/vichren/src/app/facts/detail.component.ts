/**
 * Detail component.
 */
import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/Rx';

import {FactModel} from './fact.model';

@Component({
    selector: 'facts-detail-component',
    templateUrl: './detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FactsDetailComponent implements OnInit {
    item$:BehaviorSubject<FactModel> = new BehaviorSubject(null);

    constructor(private route: ActivatedRoute, private http: HttpClient) {
        this.route.params.subscribe(params => this.load(params.id));
    }

    ngOnInit() {
        ;
    }

    load(id: string) {
        this.item$.next(null);

        this.http.get(`api:facts/byId/${id}`)
            .subscribe(response => this.item$.next(<FactModel>response));
    }
}
