/**
 * Provides the main application sources and services.
 */
import {Version as Angular, VERSION, Injectable, Inject, LOCALE_ID, Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs/Rx';

import {environment} from '../environments/environment';
import {ConfigService} from './config.service';

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
    started: Date;
}

@Injectable()
export class AppService {
    /**
     * Application environment.
     */
    readonly environment = environment;

    /**
     * Application start timestamp.
     */
    started = new Date();

    /**
     * Ref. to the active component.
     */
    active: any;

    /**
     * About the application (stream).
     */
    about$ = new BehaviorSubject<About>({
        backend: undefined,
        frontend: `${this.config.version} ${this.config.build}`,
        angular: VERSION,
        navigator,
        location,
        locale: this.locale,
        started: this.started
    });

    /**
     * Application locale setting (defaults to "en-US").
     */
    //public readonly locale: string;

    /**
     * Initializes the application.
     */
    constructor(@Inject(LOCALE_ID) public readonly locale: string,
            private config: ConfigService) {
        const lang = this.getLocaleLang(locale);

        document.documentElement.setAttribute('lang', lang);

        // global ref.
        Object.assign(window, {app: this});
    }

    /**
     * Converts a locale to the corresponding language.
     */
    getLocaleLang(locale: string): string {
        return locale.split('-')[0];
    }
}
