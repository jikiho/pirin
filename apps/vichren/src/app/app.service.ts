/**
 * Provides the application sources and services.
 */
import {Version as Angular, VERSION, Injectable, Inject, LOCALE_ID, Component} from '@angular/core';
import {Subject} from 'rxjs/Rx';

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
     * About the application.
     */
    about = new Subject<About>();

    /**
     * Application locale setting (defaults to "en-US");
     */
    locale: string;

    /**
     * Application start timestamp.
     */
    started: Date;

    /**
     * Ref. to the active component.
     */
    active: any;

    /**
     * Initializes the application.
     */
    constructor(@Inject(LOCALE_ID) locale: string,
            private config: ConfigService) {
        // global ref.
        Object.assign(window, {app: this});

        this.setLocale(locale);

        this.started = new Date();

        this.about.subscribe(about => console.debug("APPLICATION", about));

        setTimeout(() => this.about.next({
            backend: undefined,
            frontend: `${this.config.version} ${this.config.build}`,
            angular: VERSION,
            navigator,
            location,
            locale: this.locale,
            started: this.started
        }));
    }

    /**
     * Converts a locale to the corresponding language.
     */
    getLocaleLang(locale: string): string {
        return locale.split('-')[0];
    }

    /**
     * Sets the application locale string and updates corresponding values.
     */
    private setLocale(locale: string) {
        const lang = this.getLocaleLang(locale);

        this.locale = locale;

        document.documentElement.setAttribute('lang', lang);
    }
}
