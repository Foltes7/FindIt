import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { UserStore } from './userState/user-state';

@Injectable()
export class IntercepterService {

  constructor(private store: Store) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (!request.url.includes('api.unsplash.com'))
    {
      const token =  this.store.selectSnapshot(UserStore.token);
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }


    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
              console.log('event--->>>', event);
          }
          return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let data = {};
        data = {
            reason: error && error.error && error.error.reason ? error.error.reason : '',
            status: error.status
        };
        return throwError(error);
    }));

  }
}
