import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  constructor() { }
  intercept(req, next): Observable<HttpEvent<any>>{
    console.log("In interceptor");
    let token = sessionStorage.getItem('token');
    if(token){
      req = req.clone({
        setHeaders: {
          'VB-API-TOKEN': token
        }
      })
    }
    return next.handle(req);
  }
}
