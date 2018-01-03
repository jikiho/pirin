import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

import {FactModel} from './fact.model';

@Component({
    selector: 'facts-children-component',
    templateUrl: './children.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FactsChildrenComponent {
    @Input() items: FactModel[];
}
