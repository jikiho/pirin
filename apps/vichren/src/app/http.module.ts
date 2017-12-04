/**
 * Provides the HTTP request/response services.
 */
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS, HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import {AppService} from './app.service';
import {ConfigService, ConfigResource} from './config.service';

/**
 * Provides a request locale setting (language).
 */
export class LocaleInterceptor implements HttpInterceptor {
    constructor(private app: AppService) {
    }

    intercept(original: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const locale = original.headers.get('Accept-Language') || this.app.locale;

        if (locale) {
            const lang = this.app.getLocaleLang(locale),
                request = original.clone({
                    headers: original.headers.set('Accept-Language', locale),
                    params: original.params.set('lang', lang)
                });

            return next.handle(request);
        }

        return next.handle(original);
    }
}

/**
 * Provides a request/response cache.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
 */
export class CacheInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
/*
        const control = request.headers.get('Cache-Control');
        
        if (!/\bno-cache\b/.test(control)) {
            //TODO: get cached result
        }
        
        if (!/\bno-store\b/.test(control)) {
            //TODO: set cache result
        }
*/

        return next.handle(request);
    }
}

/**
 * Provides a request timeout.
 */
//TODO: cancel control?
export class TimeoutInterceptor implements HttpInterceptor {
    constructor(private config: ConfigService) {
    }

    intercept(original: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const timeout = original.headers.get('Timeout') || this.config.requestTimeout,
            request = original.clone({
                headers: original.headers.set('Timeout', timeout.toString())
            });

        return next.handle(request);
    }
}

/**
 * Provides a request resource and retries.
 */
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
     * Makes or retries a request based on available resource and pathname.
     */
    private makeRequest(original: HttpRequest<any>, next: HttpHandler,
            pathname: string, resource: ConfigResource, retry: number = 0): Observable<HttpEvent<any>> {
        const base = resource && resource.get(retry > 0),
            request = !base ? original : original.clone({
                url: new URL(pathname, base).toString()
            });

        // debugger
        console.debug(retry ? 'RETRY' : '', request.method || 'REQUEST', request.url, request);

        return next.handle(request)
            .do(response => {
                if (response instanceof HttpResponse) {
                    // debugger
                    console.debug('RESPONSE', response.status, response.url || request.url, response);
                }

                return response;
            })
            .catch((error, caught) => {
                // debugger
                console.debug('FAILED', error.status, error.url || request.url, error);

                if (resource && resource.suspendable(error.status || 0)) {
                    if (resource.suspend(base)) {
                        return this.makeRequest(original, next, pathname, resource, retry += 1);
                    }
                }

                return Observable.throw(error);
            });
    }
}

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LocaleInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CacheInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TimeoutInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ResourceInterceptor,
            multi: true
        }
    ]
})

export class HttpModule {
}
