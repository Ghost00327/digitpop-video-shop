import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BillsbyService } from '../../shared/services/billsby.service';


@Injectable()
export class BillsbyInterceptor implements HttpInterceptor {
    constructor(private billsbyService: BillsbyService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url

        let headers = request.headers
            .set('apikey', `${environment.billsbyKey}`);

        const cloneReq = request.clone({ headers });

        return next.handle(cloneReq);
    }
}
