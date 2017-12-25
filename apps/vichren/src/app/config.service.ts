/**
 * Provides the application configuration and environment setting.
 */
import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

import {environment} from '../environments/environment';

/**
 * Request resource configuration and management.
 */
export class ConfigResource {
    /**
     * List of suspended base urls with corresponding resume timers.
     */
    private suspends: Map<string, number> = new Map();

    /**
     * Index of the last used base url.
     */
    private index: number = -1;

    /**
     * Initializes ref. to the configuration and a list of base urls.
     */
    constructor(private config: ConfigService, private bases: string[]) {
    }

    /**
     * Gets an active base url,
     * or resumes and uses the first suspended one.
     */
    get(next: boolean = this.config.resourceGetNext): string {
        const length = this.bases.length;
        let i = length,
            index = this.index < 0 ? 0 : this.index + (next ? 1 : 0),
            url: string;

        while (i--) {
            index %= length;
            url = this.bases[index];

            if (!this.suspends.has(url)) {
                this.index = index;

                return url;
            }

            index += 1;
        }

        // first suspended
        url = this.suspends.keys().next().value;
        this.resume(url);

        this.index = this.bases.indexOf(url);

        return url;
    }

    /**
     * Handles a failed request and returns if it's suitable to retry.
     * If suspendable, the failed request base url is suspended.
     */
    retry(error: HttpErrorResponse, base: string): boolean {
        const suspendable = this.config.resourceSuspendables.has(error.status);

        if (suspendable) {
            if (this.suspend(base)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Suspends a base url and initializes the resume timer.
     */
    private suspend(base: string, delay: number = this.config.resourceResumeDelay): boolean {
        if (this.bases.length > 1 && !this.suspends.has(base)) {
            const timer: number = window.setTimeout(() => this.resume(base), delay);

            console.debug('SUSPEND', base);

            this.suspends.set(base, timer);

            return this.bases.length > this.suspends.size;
        }

        return false;
    }

    /**
     * Resumes a base url.
     */
    private resume(base: string) {
        const timer: number = this.suspends.get(base);

        if (timer) {
            console.debug('RESUME', base);

            this.suspends.delete(base);

            clearTimeout(timer);
        }
    }
}

@Injectable()
export class ConfigService {
    /**
     * Flag to run the application in production mode.
     */
    production: boolean = environment.production;

    /**
     * Flag to debug the application.
     */
    get debug(): boolean {
        return !this.production || this.hasQueryParam('debug');
    }

    /**
     * Frontend build version.
     */
    version: string = environment.version;

    /**
     * Frontend build identification (timestamp).
     */
    build: string = environment.build;

    /**
     * Allow request cache.
     */
    requestCache: boolean = environment.requestCache;

    /**
     * Request timeout (s).
     */
    requestTimeout: number = environment.requestTimeout;

    /**
     * Delay to resume a suspended request resource base url (ms).
     */
    resourceResumeDelay: number = environment.resourceResumeDelay;

    /**
     * Flag to get an active resource base url (next or the current one).
     */
    resourceGetNext: boolean = environment.resourceGetNext;

    /**
     * List of failed request statuses suitable to suspend and retry.
     */
    resourceSuspendables: Set<number> = new Set([0, 502, 503]);

    /**
     * Request resources.
     */
    resources = new Map<string, ConfigResource>();

    constructor(private route: ActivatedRoute) {
        this.setResources(environment.resources);
    }

    /**
     * Initializes request resources (on start or maybe later).
     */
    setResources(resources: any = {}) {
        for (let [name, config] of Object.entries(resources)) {
            const protocol = `${name}:`,
                urls = config instanceof Array ? [...config] : [config],
                resource = new ConfigResource(this, urls);

            this.resources.set(protocol, resource);
        }
    }

    /**
     * Checks a route query parameter existance or value.
     */
    hasQueryParam(name: string, ...args): boolean {
        const param = this.route.snapshot.queryParams[name];

        if (!args.length) {
            return param != null;
        }

        for (let value of args) {
            if (param == value) {
                return true;
            }
        }

        return false;
    }
}
