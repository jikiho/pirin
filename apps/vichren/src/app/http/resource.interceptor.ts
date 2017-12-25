/**
 * Provides a request resource and retries.
 */
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

import {ConfigService, ConfigResource} from '../config.service';

export class ResourceInterceptor implements HttpInterceptor {
    constructor(private config: ConfigService) {
    }

    /**
     * Prepares a resource and calls for a request.
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = new URL(request.url),
            resource = this.config.resources.get(url.protocol);

        return this.makeRequest(request, next, url.pathname, resource);
    }

    /**
     * Makes or retries a request.
     */
    private makeRequest(original: HttpRequest<any>, next: HttpHandler,
            pathname: string, resource: ConfigResource, retry: number = 0): Observable<HttpEvent<any>> {
        const base = resource && resource.get(retry > 0), //active resource base url
            request = !base ? original : original.clone({
                url: new URL(pathname, base).toString()
            });

        //debuger
        console.debug(`${retry ? 'RETRY ' : ''}${request.method || 'REQUEST'}`, request.url, request);

        return next.handle(request)
            .catch((error, caught) => {
                //debuger
                console.debug('FAILED', error.status, error.url || request.url, error);

                if (resource && resource.retry(error, base)) {
                    return this.makeRequest(original, next, pathname, resource, retry += 1);
                }

                return Observable.throw(error);
                //return Observable.empty();
            });
    }
}
