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
    // let jwt = sessionStorage.getItem('jwt');
    // if(jwt){
    //   req = req.clone({
    //     setHeaders: {
    //       'authorization': jwt
    //     }
    //   })
    // }
    return next.handle(req);
  }
}
