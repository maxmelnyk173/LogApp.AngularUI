import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getAccessToken } from 'src/app/store/selectors/auth.selectors';
import { catchError, first, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.store.pipe(
      select(getAccessToken),
      first(),
      mergeMap(token => {
        const authToken = token.token ? request.clone({
          setHeaders: {
            Authorization: `Bearer ${ token.token }`
          }
        }) : request;

        return next.handle(authToken).pipe(
          catchError(error => {
            if(error instanceof HttpErrorResponse){
              if(error.status == 401){
                this.router.navigate(['/auth/login'])
              }
            }
            throw error;
          })
        );
      })
    )
  }
}
