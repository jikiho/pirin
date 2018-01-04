/**
 * Provides the HTTP request/response services.
 */
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppService} from '../app.service';
import {CacheInterceptor} from './cache.interceptor';
import {ConfigService} from '../config.service';
import {ErrorInterceptor} from './error.interceptor';
import {LocaleInterceptor} from './locale.interceptor';
import {RequestInterceptor} from './request.interceptor';
import {ResponseInterceptor} from './response.interceptor';
import {TimeoutInterceptor} from './timeout.interceptor';

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ResponseInterceptor,
            multi: true,
            deps: [ConfigService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true,
            deps: [ConfigService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: LocaleInterceptor,
            multi: true,
            deps: [AppService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CacheInterceptor,
            multi: true,
            deps: [ConfigService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestInterceptor,
            multi: true,
            deps: [ConfigService]
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TimeoutInterceptor,
            multi: true,
            deps: [ConfigService]
        }
    ]
})

export class HttpModule {
}
