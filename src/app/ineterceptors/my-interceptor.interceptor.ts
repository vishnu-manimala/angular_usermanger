import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../servicejwt/jwt.service';

@Injectable()
export class MyInterceptorInterceptor implements HttpInterceptor {

  constructor(private jwtService:JwtService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token  = this.jwtService.getSessionData().token;
    console.log("in interceptor",token);
    const modifRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token} `
      }
    });
    return next.handle(modifRequest);
  }
}
