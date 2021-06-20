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
  baseUrl: string = "https://localhost:44383/api/Account/login";
  refreshUrl: string = "https://localhost:44383/api/Account/refresh-token/";

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) {}

  login(email: string, password: string) {
    return this.http.post<AuthData>(this.baseUrl, { email, password }).pipe(map(data => { 
      this.authData = data;
      this.authData.exp = Number(this.jwtHelperService.getTokenExpirationDate(data.token));
      return this.authData;
    }));
  }

  refresh(id: string) {
    return this.http.get<AuthData>(this.refreshUrl + id).pipe(map(data => { 
      this.authData = data;
      this.authData.exp = Number(this.jwtHelperService.getTokenExpirationDate(data.token));
      return this.authData;
    }));
  }
}
