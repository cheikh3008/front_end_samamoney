import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = `${environment.apiUrl}/api/users`;

  constructor(private http: HttpClient) { }
  read(): Observable<User[]>  {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<User[]>(`${environment.apiUrl}/api/list/users`, {headers},
    );
  }
  create(data: User)  {
    const  headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<User[]>(`${environment.apiUrl}/api/users.json`, data, { headers});
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/users/${id}`, data);
  }
  delete(id: number) {
    return this.http.delete<User[]>(`${environment.apiUrl}/api/users/` + id);
  }
  desableUser(id: number) {
    const  headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<User[]>(`${environment.apiUrl}/api/users/status/` + id , { headers});
  }
  desablePartenaire(id: number) {
    const  headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<User[]>(`${environment.apiUrl}/api/bloquer/` + id , { headers});
  }
  getId(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.put(`${environment.apiUrl}/api/users/` + id, { headers});
  }
}
