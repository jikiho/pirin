/**
 * Provides the application sources and services.
 */
import {Version as Angular, VERSION, Injectable, Inject, LOCALE_ID, Component} from '@angular/core';
import {Subject} from 'rxjs/Rx';

import {environment} from '../environments/environment';
import {ConfigService} from './config.service';
import {DatasetModel} from './dataset.model';
import {DimensionModel} from './dimension.model';

/**
 * Collection of information about the application (e.g. various versions).
 */
class About {
    backend: string;
    frontend: string;
    angular: Angular;
    navigator: Navigator;
    location: Location;
    locale: string;
    lang: string;
    started: Date;

    set(...args) {
        while ([name: string, value: any] of args) {
            this[name] = value;
        }
    }
}

@Injectable()
export class AppService {
    /**
     * Application environment.
     */
    readonly environment = environment;

    /**
     * About the application.
     */
    about = new Subject<About>();

    /**
     * Application locale setting (defaults to "en-US");
     */
    locale: string;

    /**
     * Application language setting (defaults to "en");
     */
    get lang(): string {
        return this.locale.split('-')[0];
    }

    /**
     * Ref. to the active component.
     */
    active: any;

    /**
     * Initializes the application setting.
     */
    constructor(@Inject(LOCALE_ID) locale: string,
            private config: ConfigService) {
        // global ref.
        Object.assign(window, {app: this});

        this.setLocale(locale);

        setTimeout(() => this.about.next({
            backend: undefined,
            frontend: `${this.config.version} ${this.config.build}`,
            angular: VERSION,
            navigator,
            location,
            locale: this.locale,
            lang: this.lang,
            started: new Date()
        }));
    }

    /**
     * Sets the application locale string and updates corresponding values.
     */
    private setLocale(locale: string) {
        this.locale = locale;

        document.documentElement.setAttribute('lang', this.lang);
    }
}
