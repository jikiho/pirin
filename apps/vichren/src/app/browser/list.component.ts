import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

import {FormModel} from './form.model';

@Component({
    selector: 'browser-list-component',
    templateUrl: './list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowserListComponent {
    @Input() items: FormModel[];

    @Input() offset: number = 0;
}
