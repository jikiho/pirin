/**
 * Budget forms data storage and management.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs/Rx';

import {BudgetFormModel} from './budget-form.model';

@Injectable()
export class BudgetFormsDataService {
    items$: BehaviorSubject<BudgetFormModel[]> = new BehaviorSubject(null);

    browser$: BehaviorSubject<any> = new BehaviorSubject({
        index: -1
    });

    constructor(private http: HttpClient) {
    }

    loadList(params?: any): Observable<BudgetFormModel[]> {
        const request = this.http.get('api:facts')
            //.do(response => paging or range, message...
            .map(response => response['values'])
            .map(items => items.filter(item => item.alias === 'budget_form'))
            .map(items => items.map((item, index: number) => BudgetFormModel.convert(item, index)));

        request.subscribe(items => this.list(items));

        return request;
    }

    list(items: BudgetFormModel[]) {
        const browser = this.browser$.getValue(),
            id = browser.current ? browser.current.id : undefined,
            index = items && id !== undefined ? items.findIndex(item => item.id === id) : undefined;

        this.items$.next(items);

        this.update(index);
    }

    loadDetail(id: string): Observable<BudgetFormModel> {
        const request = this.http.get(`api:facts/byId/${id}`)
            .map(item => BudgetFormModel.convert(item));

        request.subscribe(item => this.detail(item.id, item));

        return request;
    }

    detail(id: string, item?: BudgetFormModel) {
        let items = this.items$.getValue(),
            index = items ? items.findIndex(item => item.id === id) : -1;

        if (!item) {
            ;
        }
        else if (index > -1) {
            item.number = items[index].number;
            items[index] = items[index].clone(item);
        }
        else {
            index = 0;
            item.number = index + 1;
            items = [item];
        }

        this.items$.next(items);

        this.update(index);
    }

    private update(selected: number = -1) {
        const items = this.items$.getValue(),
            browser = this.browser$.getValue(),
            count = items ? items.length : 0,
            limit = count - 1,
            index = items ? Math.min(Math.max(0, selected > -1 ? selected : browser.index), limit) : -1,
            current = items ? items[index] : undefined,
            previous = items ? items[index - 1] : undefined,
            next = items ? items[index + 1] : undefined,
            first = items && index > 0 ? items[0] : undefined,
            last = items && index < limit ? items[limit] : undefined;

        this.browser$.next({count, limit, index, current, previous, next, first, last});
    }
}
