import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

import {DatasetModel} from './dataset.model';

@Component({
    selector: 'datasets-children-component',
    templateUrl: './children.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatasetsChildrenComponent {
    @Input() items: DatasetModel[];
}
