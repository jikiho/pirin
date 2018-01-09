/**
 * Common browser model.
 */
import {Model} from '../model';

export class BrowserModel<T> extends Model {
    count: number;
    limit: number;
    index: number;
    current: T;
    previous: T;
    next: T;
    first: T;
    last: T;
}
