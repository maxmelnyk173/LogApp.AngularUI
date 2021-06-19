import { Injectable } from '@angular/core';
import { AuthData } from '../models/AuthData';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { getAccessToken, getAuthData } from 'src/app/store/selectors/auth.selectors';
import { select, Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authData!: AuthData;
  accessTokenString!: string;
  baseUrl: string = 'https://localhost:44383/api/Account/login';

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService, private store: Store) { 
    this.store.pipe(select(getAccessToken)).subscribe(accessToken => this.accessTokenString = accessToken);
  }

  login(email: string, password: string) {
    return this.http.post<AuthData>(this.baseUrl, { email, password }).pipe(map(data => { 
      this.authData = data;
      this.authData.exp = Number(this.jwtHelperService.getTokenExpirationDate(data.token));
      return this.authData;
    }));
  }
}
