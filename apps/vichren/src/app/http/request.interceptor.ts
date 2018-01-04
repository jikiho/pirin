/**
 * Provides a request resource and retries.
 */
import {HttpInterceptor, HttpRequest, HttpErrorResponse, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

import {ConfigService, ConfigResource} from '../config.service';

export class RequestInterceptor implements HttpInterceptor {
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

        if (this.config.debug) {
            console.debug(`${retry ? 'RETRY ' : ''}${request.method || 'REQUEST'}`, request.url, request);
        }

        return next.handle(request)
            .catch((error: Error) => {
                if (error instanceof HttpErrorResponse) {
                    if (resource && resource.retry(error, base)) {
                        return this.makeRequest(original, next, pathname, resource, retry += 1);
                    }

                    return Observable.throw(new HttpErrorResponse(Object.assign(error, {
                        url: error.url || request.url
                    })));
                }

                return Observable.throw(error);
            });
    }
}
