import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../shared/services/auth-service.service';
import { environment } from '../../../environments/environment';
import { XchaneAuthenticationService } from '../../shared/services/xchane-auth-service.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private xchaneAuthenticationService: XchaneAuthenticationService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //add auth header with jwt if user is logged in and request is to api url

    if (this.xchaneAuthenticationService.currentUserValue != null) {
      const currentUser = this.xchaneAuthenticationService.currentUserValue;
      const isLoggedIn = currentUser && currentUser.token;
      const isApiUrl = request.url.startsWith(environment.apiUrl);
      if (isLoggedIn && isApiUrl) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
      }
    } else if (this.authenticationService.currentUserValue != null) {
      const currentUser = this.authenticationService.currentUserValue;
      const isLoggedIn = currentUser && currentUser.token;
      const isApiUrl = request.url.startsWith(environment.apiUrl);
      if (isLoggedIn && isApiUrl) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        });
      }
    }

    return next.handle(request);
  }
}
