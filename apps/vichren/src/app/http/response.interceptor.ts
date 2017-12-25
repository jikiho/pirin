/**
 * Provides a standard response handling.
 */
import {HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';

export class ResponseInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .do(response => {
                if (response instanceof HttpResponse) {
                    //debuger
                    console.debug('RESPONSE', response.status, response.url || request.url, response);
                }

                return response;
            });
    }
}
