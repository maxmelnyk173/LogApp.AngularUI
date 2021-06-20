import { Injectable } from '@angular/core';
import { AuthData } from '../models/AuthData';
import { HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { getUserData } from 'src/app/store/selectors/auth.selectors';
import { select, Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authData!: AuthData;
  userId!: string;
  baseUrl: string = "https://localhost:44383/api/Account/login";
  refreshUrl: string = "https://localhost:44383/api/Account/refresh-token/";

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService, private store: Store) {
    store.pipe(select(getUserData)).subscribe(data => {
      return this.userId = data.user.id
    });
  }

  login(body: {email: string, password: string}) {
    return this.http.post<AuthData>(this.baseUrl, body).pipe(map(data => { 
      this.authData = data;
      this.authData.exp = Number(this.jwtHelperService.getTokenExpirationDate(data.token));
      return this.authData;
    }));
  }

  refresh() {
    return this.http.get<AuthData>(this.refreshUrl + this.userId).pipe(map(data => { 
      this.authData = data;
      this.authData.exp = Number(this.jwtHelperService.getTokenExpirationDate(data.token));
      return this.authData;
    }));
  }
}
