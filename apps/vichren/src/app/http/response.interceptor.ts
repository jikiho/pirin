/**
 * Provides a standard response handling.
 */
import {HttpInterceptor, HttpRequest, HttpResponse, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

import {ConfigService} from '../config.service';

export class ResponseInterceptor implements HttpInterceptor {
    constructor(private config: ConfigService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .do(response => {
                if (response instanceof HttpResponse) {
                    if (this.config.debug) {
                        console.debug('RESPONSE', response.status, response.url || request.url, response);
                    }
                }
            });
    }
}
