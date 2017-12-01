export class EnvironmentBase {
    constructor(config?: any) {
        if (config) {
            Object.assign(this, config);
        }
    }

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
     * Request timeout (sec.)
     */
    requestTimeout: number = 1 * 60;

    /**
     * Delay to resume a suspended request resource base url (msec.)
     */
    resourceResumeDelay: number = 1 * 60 * 1000;

    /**
     * Flag to get an active request resource (next or the current one).
     */
    resourceGetNext: boolean = true;

    /**
     * Request resources as a map of names and urls.
     * There is the window location available and can be freelly used.
     * A name represents a protocol then, e.g. "api" is used as "api:pathname".
     *
     * @example
     *      api: location.origin + location.pathname.replace(/$/, '-rest')
     */
    resources: {
        [name: string]: string|string[]
    }
}
