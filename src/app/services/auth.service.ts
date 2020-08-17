import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Login} from '../models/login';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<Login>;
  public currentUser: Observable<Login>;
  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Login>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Login {
    return this.currentUserSubject.value;
  }

  login(login: Login) {
    return this.http.post<Login>(`${environment.apiUrl}/api/login_check`, login)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        const decoder  = jwt_decode(user.token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('roles', JSON.stringify(decoder.roles));
        localStorage.setItem('username', JSON.stringify(decoder.username));
        this.currentUserSubject.next(user);
        return user;
      }));
  }
  getToken() {
    return localStorage.getItem('roles');
  }
  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
