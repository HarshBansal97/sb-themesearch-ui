import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { tap, timeout, catchError } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  constructor(private loaderService: LoaderService) { }
  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.requests.push(req);
    console.log("No of requests--->" + this.requests.length);
    this.loaderService.isLoading.next(true);

    return next.handle(req).pipe(tap((event: HttpEvent<any>) => 
      {
        if (event instanceof HttpResponse) {
          console.log('In loader interceptor, ending the loader');
          this.removeRequest(req);
        }
      },
      (err: any) => {
        console.error('In loader interceptor, error: ending the loader', err);
        this.removeRequest(req);
      }
    ), timeout(600 * 1000), catchError(e => {
      console.error('error caught in loader:', e);
      this.removeRequest(req);
      return throwError(e);
    }));
  }
  // private handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {

  //     // TODO: send the error to remote logging infrastructure
  //     console.log('handleError:',error); // log to console instead

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }
  // private onEnd(): void {
  //   this.hideLoader();
  // }
  // private showLoader(): void {
  //   this.loaderService.show();
  // }
  // private hideLoader(): void {
  //   this.loaderService.hide();
  // }
}