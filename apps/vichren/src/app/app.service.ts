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

/**
 * Map to JSON conversion.
 */
Map.prototype.hasOwnProperty('toJSON') ||
        Object.defineProperty(Map.prototype, 'toJSON', {
    value: function() {
        let items = {
            keys: [],
            values: []
        };

        this.forEach((value, key) => {
            items.keys.push(key);
            items.values.push(value);
        });

        return JSON.stringify(items);
    }
});

/**
 * Circular-structure safe value to JSON conversion.
 */
JSON.stringify = ((stringify: Function) => {
    return (value: any, replacer?: any, space: number = 4) => {
        let refs = new Set();

        try {
            return stringify(value, replacer || ((key, value) => {
                if (typeof value === 'object' && value) {
                    if (refs.has(value)) {
                        let name = value.constructor.name,
                            definition = name === 'Object' ? `${name} {...}` : `class ${name} {...}`;
                        return `${definition} //circular structure`;
                    }
                    refs.add(value);
                }
                return value;
            }), space);
        }
        catch (error) {
            throw error;
        }
        finally {
            refs.clear();
        }
    };
})(JSON.stringify);
