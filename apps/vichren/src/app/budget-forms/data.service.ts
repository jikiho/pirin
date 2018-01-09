/**
 * Budget forms data storage and management.
 */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, BehaviorSubject} from 'rxjs/Rx';

import {BrowserModel} from '../browsing/browser.model';
import {BudgetFormModel, convert} from './budget-form.model';

@Injectable()
export class BudgetFormsDataService {
    /**
     * List of budget forms (stream).
     */
    items$: BehaviorSubject<BudgetFormModel[]> = new BehaviorSubject(null);

    /**
     * List of budget forms.
     */
    get items(): BudgetFormModel[] {
        return this.items$.getValue();
    }

    /**
     * Browser statement (stream).
     */
    browser$: BehaviorSubject<BrowserModel<BudgetFormModel>> =
            new BehaviorSubject(new BrowserModel({
        index: -1
    }));

    /**
     * Browser statement.
     */
    get browser(): BrowserModel<BudgetFormModel> {
        return this.browser$.getValue();
    }

    constructor(private http: HttpClient) {
    }

    /**
     * Loads a list of budget forms.
     */
    loadList(params?: any): Observable<BudgetFormModel[]> {
        const request = this.http.get('api:facts/byKind/budget_form')
            //.do(response => paging or range, message...
            .map(response => response['values'])
            .map(items => items.map((item, index: number) => convert(item, index)));

        request.subscribe(items => this.updateList(items));

        return request;
    }

    /**
     * Updates the list and corresponding properties.
     */
    updateList(items: BudgetFormModel[]) {
        const browser = this.browser,
            id = browser.current ? browser.current.id : undefined,
            index = items && id !== undefined ? items.findIndex(item => item.id === id) : undefined;

        this.detailed(items);

        this.items$.next(items);

        this.update(index);
    }

    /**
     * Loads a budget form detail.
     */
    loadDetail(id: string): Observable<BudgetFormModel> {
        const request = this.http.get(`api:facts/byId/${id}`)
            .map(item => convert(item));

        request.subscribe(item => this.updateDetail(item.id, item));

        return request;
    }

    /**
     * Updates the listed detail and corresponding properties.
     */
    updateDetail(id: string, item?: BudgetFormModel) {
        let items = this.items,
            index = items ? items.findIndex(item => item.id === id) : -1;

        if (!item) {
            ;
        }
        else if (index > -1) {
            item.number = items[index].number;
            items[index] = new BudgetFormModel(items[index], item);
        }
        else {
            index = 0;
            item.number = index + 1;
            items = [item];
        }

        this.items$.next(items);

        this.update(index);
    }

    /**
     * Replaces a corresponding list items with current detail items.
     * The list item number is kept.
     */
    private detailed(items: BudgetFormModel[]) {
        const currents = this.items || [];

        currents.forEach(current => {
            const detailed = current.detailed,
                index = detailed && items ? items.findIndex(item => item.id === current.id) : -1;

            if (index > -1 && !items[index].detailed) {
                current.number = items[index].number;
                items[index] = current;
            }
        });
    }

    /**
     * Updates corresponding properties (browser statement).
     */
    private update(selected: number = -1) {
        const items = this.items,
            browser = this.browser,
            count = items ? items.length : 0,
            limit = count - 1,
            index = items ? Math.min(Math.max(0, selected > -1 ? selected : browser.index), limit) : -1,
            current = items ? items[index] : undefined,
            previous = items ? items[index - 1] : undefined,
            next = items ? items[index + 1] : undefined,
            first = items && index > 0 ? items[0] : undefined,
            last = items && index < limit ? items[limit] : undefined;

        this.browser$.next(new BrowserModel({
            count, limit, index, current, previous, next, first, last
        }));
    }
}
