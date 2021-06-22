import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppSettings } from 'src/app/common/appSettings';
import { getUserData } from 'src/app/store/selectors/auth.selectors';
import { User } from '../resources/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, store: Store) { 
  }

  getAllUsers(){
    return this.http.get<User[]>(AppSettings.baseUrl + "Account/users");
  }

  getUser(id: string){
    let user = this.http.get<User>(AppSettings.baseUrl + "Account/user/" + id);
    return user;
  }
}
