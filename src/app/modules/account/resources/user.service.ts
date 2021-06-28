import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppSettings } from 'src/app/common/appSettings';
import { UpdateUser, User } from '../resources/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$: Observable<UpdateUser>;

  constructor(private http: HttpClient) { 
    this.user$ = new Observable<UpdateUser>();
  }

  getAllUsers(){
    return this.http.get<User[]>(AppSettings.baseUrl + "Account/users");
  }

  getUser(id: string){
    return this.http.get<User>(AppSettings.baseUrl + "Account/user/" + id);
  }

  updateUserData(body: UpdateUser){
    return this.http.put<any>(AppSettings.baseUrl + "Account/user", body, { observe: 'response' }).pipe(
      switchMap((data) => {
        if (data.status == 204) {
          this.user$ = new Observable(user => user.next(body))
          return this.user$;
        } else {
          return throwError(data);
        }
      })
    );
  }
}
