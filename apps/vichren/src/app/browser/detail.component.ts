import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

import {FormModel} from './form.model';

@Component({
    selector: 'browser-detail-component',
    templateUrl: './detail.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowserDetailComponent {
    @Input() item: FormModel;

    @Input() previous: FormModel;

    @Input() next: FormModel;
}
