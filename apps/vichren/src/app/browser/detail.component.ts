import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

import {DatasetModel} from './dataset.model';

@Component({
    selector: 'browser-detail-component',
    templateUrl: './detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowserDetailComponent {
    @Input() item: DatasetModel;

    @Input() current: string;

    @Input() previous: string;

    @Input() next: string;
}
