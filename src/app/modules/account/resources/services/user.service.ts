import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppSettings } from 'src/app/common/appSettings';
import { CurrentUser, User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser$: Observable<CurrentUser>;
  user$: Observable<User>;

  constructor(private http: HttpClient) { 
    this.currentUser$ = new Observable<CurrentUser>();
    this.user$ = new Observable<User>();
  }

  getAllUsers(){
    return this.http.get<User[]>(AppSettings.baseUrl + "Account/users");
  }

  getUser(id: string){
    return this.http.get<CurrentUser>(AppSettings.baseUrl + "Account/user/" + id);
  }

  addUser(body: User){
    return this.http.post<any>(AppSettings.baseUrl + "Account/register", body, { observe: 'response' }).pipe(
      switchMap((data) => {
        if (data.status == 200) {
          this.user$ = new Observable(user => user.next(body))
          return this.user$;
        } else {
          return throwError(data);
        }
      })
    );
  }

  updateUserData(body: CurrentUser){
    return this.http.put<any>(AppSettings.baseUrl + "Account/user", body, { observe: 'response' }).pipe(
      switchMap((data) => {
        if (data.status == 204) {
          this.currentUser$ = new Observable(user => user.next(body))
          return this.currentUser$;
        } else {
          return throwError(data);
        }
      })
    );
  }

  deleteUser(id: string){
    return this.http.delete<string>(AppSettings.baseUrl + "/api/Account/user/" + id, { observe: 'response' }).pipe(
      switchMap((data) => {
        if (data.status == 204) {
          return id;
        } else {
          return throwError(data);
        }
      })
    );
  }

  getRoles(){
    this.http.get<string[]>(AppSettings.baseUrl + "/api/Account/roles");
  }
}
