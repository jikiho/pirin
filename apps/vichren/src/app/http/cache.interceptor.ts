/**
 * Provides a request cache.
 *
 * Using the "Cache-Control" header to pass a request configuration.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
 */
import {HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

import {ConfigService} from '../config.service';
import {Utils as utils} from '../utils';

export class CacheInterceptor implements HttpInterceptor {
    /**
     * Cache storage (just a response now).
     */
    private cache = new Map<string, HttpResponse<any>>();

    constructor(private config: ConfigService) {
    }

    /**
     * Prepares cache settings and calls for a request.
     */
    intercept(original: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cacheControl = original.headers.get('Cache-Control'),
            cachable = !/\bno-cache\b/.test(cacheControl),
            storable = !/\bno-store\b/.test(cacheControl),
            request = original.clone({
                headers: original.headers.delete('Cache-Control')
            });

        if (this.config.requestCache && (cachable || storable)) {
            return this.makeRequest(request, next, cachable, storable);
        }

        return next.handle(request);
    }

    /**
     * Makes a request to get, store or reuse a response.
     */
    private makeRequest(request: HttpRequest<any>, next: HttpHandler,
            cachable: boolean, storable: boolean): Observable<HttpEvent<any>> {
        //const key = JSON.stringify(utils.sortKeys({...request}));
        const key = JSON.stringify(request);

        if (cachable) {
            const response = this.cache.get(key);

            if (response) {
                //debuger
                console.debug(`CACHED ${request.method || 'REQUEST'}`, response.url, request);

                return Observable.of(response.clone());
            }
        }

        if (storable) {
            return next.handle(request).do((response: HttpResponse<any>) => {
                if (response instanceof HttpResponse) {
                    this.cache.set(key, response);
                }
            });
        }

        return next.handle(request);
    }
}
