import {Component} from '@angular/core';

import {AppService} from './app.service';
import {ConfigService} from './config.service';

@Component({
    selector: 'app-component',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor(public app: AppService, public config: ConfigService) {
    }
}
