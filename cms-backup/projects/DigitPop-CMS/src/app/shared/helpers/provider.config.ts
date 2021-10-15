import { Observable } from 'rxjs';
import { HttpHandler, HttpEvent, HttpRequest, HttpInterceptor, HttpBackend, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { Injector, InjectionToken } from '@angular/core';

export const provideTokenizedHttpClient = (token: InjectionToken<string>, options: { excludes: Function[] } = { excludes: [] }) => {
    return {
        provide: token,
        deps: [HttpBackend, Injector],
        useFactory: (backend: HttpBackend, injector: Injector) => {
            return new HttpClient(
                new HttpDynamicInterceptingHandler(backend, injector, options)
            );
        }
    }
}

class HttpInterceptorHandler implements HttpHandler {
    constructor(private next: HttpHandler, private interceptor: HttpInterceptor) { }
    handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        return this.interceptor.intercept(req, this.next);
    }
}

class HttpDynamicInterceptingHandler implements HttpHandler {
    private chain: any = null;

    constructor(private backend: HttpBackend, private injector: Injector, private options: { excludes: Function[] } = { excludes: [] }) { }

    public handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        if (this.chain === null) {
            const interceptors = this.injector.get(HTTP_INTERCEPTORS, [])
                .filter(entry => !this.options.excludes.includes(entry.constructor));

            this.chain = interceptors.reduceRight((next, interceptor) => {
                return new HttpInterceptorHandler(next, interceptor);
            }, this.backend);
        }
        return this.chain.handle(req);
    }
}
