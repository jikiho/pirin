import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

import {DatasetModel} from './dataset.model';

@Component({
    selector: 'browser-list-component',
    templateUrl: './list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowserListComponent {
    @Input() items: DatasetModel[];

    @Input() offset: number = 0;
}
