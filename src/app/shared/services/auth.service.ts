import { Injectable } from '@angular/core';
import { AuthData } from '../models/AuthData';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authData!: AuthData;
  baseUrl: string = 'https://localhost:44383/api/Account/login';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<AuthData> {
    return this.http.post<AuthData>(this.baseUrl, { email, password }).pipe(map((data: any) =>{
      this.authData = data;
      return this.authData;
    }));
  }
}
