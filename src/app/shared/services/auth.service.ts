import { Injectable } from '@angular/core';
import { AuthData } from '../models/AuthData';
import { HttpClient } from '@angular/common/http';
import { map, switchMap} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { getUserData } from 'src/app/store/selectors/auth.selectors';
import { select, Store } from '@ngrx/store';
import { AppSettings } from 'src/app/common/appSettings';
import { CurrentUser } from '../models/User';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authData!: AuthData;
  userId!: string;

  constructor(private http: HttpClient, 
              private jwtHelperService: JwtHelperService, 
              store: Store) {
    store.pipe(select(getUserData)).subscribe(data => {
      return this.userId = data.user.id
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
          return  new Observable<CurrentUser>(user => user.next(body));
        } else {
          return throwError(data);
        }
      })
    );
  }
}
