/**
 * Provides a standard error handling.
 */
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

export class ErrorInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .catch((error, caught) => {
                const empty = false;

                //debuger
                console.debug('FAILED', error.status, error.url || request.url, error);

                if (empty) {
                    return Observable.empty();
                }

                return Observable.throw(error);
            });
    }
}
