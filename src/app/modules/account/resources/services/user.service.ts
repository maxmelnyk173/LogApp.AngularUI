import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AppSettings } from 'src/app/common/appSettings';
import { CurrentUser, RegisterUser, User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { 
  }

  getAllUsers(){
    return this.http.get<User[]>(AppSettings.baseUrl + "Account/users");
  }

  getUser(id: string){
    return this.http.get<CurrentUser>(AppSettings.baseUrl + "Account/user/" + id);
  }

  addUser(body: RegisterUser){
    return this.http.post<any>(AppSettings.baseUrl + "Account/register-user", body, 
      { responseType: 'text' as 'json', observe: 'response' }).pipe(
      switchMap(data => {
          let user: User = {
            id: data.body,
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            role: body.role,
            position: body.position
          }
          return new Observable<User>(data => data.next(user));
      }),
      catchError(err => throwError(err))
    );
  }

  updateUser(body: User){
    return this.http.put<string>(AppSettings.baseUrl + "Account/user", body, { observe: 'response' }).pipe(
      switchMap(data => {
        if (data.status == 204) {
          return new Observable<User>(user => user.next(body));
        } else {
          return throwError(data);
        }
      })
    );
  }

  deleteUser(id: string){
    return this.http.delete<string>(AppSettings.baseUrl + "Account/user/" + id, { observe: 'response' }).pipe(
      switchMap(data => {
        if (data.status == 204) {
          return new Observable<string>(data => data.next(id));
        } else {
          return throwError(data);
        }
      })
    );
  }

  getRoles(){
    return this.http.get<string[]>(AppSettings.baseUrl + "Account/roles");
  }

  resetPassword( id: string, newPassword: string ){
    return this.http.put<boolean>(AppSettings.baseUrl + "Account/reset-password", { id, newPassword });
  }
}
