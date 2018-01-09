/**
 * Common browsing component.
 */
import {Component, ChangeDetectionStrategy, Input} from '@angular/core';

@Component({
    selector: 'browsing-component',
    templateUrl: './browsing.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowsingComponent {
    @Input() base: string;

    @Input() browser: any;

    @Input() detailed: boolean;
}
