import { Injectable } from '@angular/core';
import { AuthData } from '../models/AuthData';
import { HttpClient } from '@angular/common/http';
import { map, switchMap} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { getAuthData, getUserData } from 'src/app/store/selectors/auth.selectors';
import { select, Store } from '@ngrx/store';
import { AppSettings } from 'src/app/common/appSettings';
import { Observable, throwError } from 'rxjs';
import { CurrentUser } from 'src/app/modules/account/resources/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authData!: AuthData;
  userId!: string;

  constructor(private http: HttpClient, 
              private jwtHelperService: JwtHelperService, 
              store: Store) {
    store.pipe(select(getAuthData)).subscribe(data => {
      this.userId = data.user.id;
      this.authData = data;
    });
  }

  login(body: {email: string, password: string}) {
    return this.http.post<AuthData>(AppSettings.baseUrl + "Account/login", body).pipe(map(data => { 
      this.authData = data;
      this.authData.exp = Number(this.jwtHelperService.getTokenExpirationDate(data.token));
      return this.authData;
    }));
  }

  refresh() {
    return this.http.get<AuthData>(AppSettings.baseUrl + "Account/refresh-token/" + this.userId).pipe(map(data => { 
      this.authData = data;
      this.authData.exp = Number(this.jwtHelperService.getTokenExpirationDate(data.token));
      return this.authData;
    }));
  }

  updateUserData(body: CurrentUser){
    return this.http.put<any>(AppSettings.baseUrl + "Account/account-data", body, { observe: 'response' }).pipe(
      switchMap(data => {
        if (data.status == 204) {
          let result: AuthData = {
            token: this.authData.token,
            exp: this.authData.exp,
            user : {
              id: body.id,
              firstName: body.firstName,
              lastName: body.lastName,
              position: body.position,
              role: this.authData.user.role
            }
          }
          return  new Observable<AuthData>(user => user.next(result));
        } else {
          return throwError(data);
        }
      })
    );
  }
}
