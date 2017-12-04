/**
 * Base of the application environment configuration.
 * 
 * @example
 *      export const environment = new EnvironmentBase({
 *          ...
 *      });
 */
export class EnvironmentBase {
    /**
     * Flag to run the application in production mode.
     */
    production: boolean = false;

    /**
     * Frontend build version.
     */
    version: string = '${build.version}';

    /**
     * Frontend build timestamp.
     */
    build: string = '${build.timestamp}';

    /**
     * Request timeout (s).
     */
    requestTimeout: number = 1 * 60;

    /**
     * Delay to resume a suspended request resource base url (ms).
     */
    resourceResumeDelay: number = 1 * 60 * 1000;

    /**
     * Flag to get an active request resource (next or the current one).
     */
    resourceGetNext: boolean = true;

    /**
     * Request resources as a map of names and urls.
     * A name represents a protocol, e.g. "api" is used as "api:pathname".
     * You can also use the window location to construct the url.
     *
     * @example
     *      api: location.origin + location.pathname.replace(/$/, '-rest')
     */
    resources: {
        [name: string]: string|string[]
    }

    constructor(config?: any) {
        if (config) {
            Object.assign(this, config);
        }
    }
}
