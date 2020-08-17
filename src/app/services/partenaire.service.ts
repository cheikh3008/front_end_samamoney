import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Partenaire} from '../models/partenaire';
import {Observable} from 'rxjs';
import {User} from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class PartenaireService {
  constructor(private  http: HttpClient) { }
  createComptePartenaireNew(data: any)  {
    const  headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<Partenaire[]>( `${environment.apiUrl}/api/compte/partenaire/new`, data, { headers});
  }
  createComptePartenaireExistant(data: any)  {
    const  headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<Partenaire[]>( `${environment.apiUrl}/api/compte/partenaire/existant`, data, { headers});
  }
  getCompte(): Observable<any[]>  {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<any[]>(`${environment.apiUrl}/api/list/comptes`, {headers},
    );
  }
  faireDepot(data: any) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<any[]>(`${environment.apiUrl}/api/fairedepot`, data, {headers},
    );
  }
  getPartenaire(): Observable<any[]>  {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<any[]>(`${environment.apiUrl}/api/list/partenaires`, {headers},
    );
  }
  addUserPartenaire(data: any) {
    const  headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<any[]>(`${environment.apiUrl}/api/user/partenaire`, data, { headers});
  }
  getUserPartenaire(): Observable<any[]>  {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<any[]>(`${environment.apiUrl}/api/list/user/partenaire`, {headers},
    );
  }
  getUserPartenaireAffectation(): Observable<any[]>  {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<any[]>(`${environment.apiUrl}/api/list/user/partenaire/affectation`, {headers},
    );
  }
  getNumCompte(data: any) {
    const  headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<any[]>(`${environment.apiUrl}/api/recherche/numero`, data, { headers});
  }
  getNinea(data: any) {
    const  headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<any[]>(`${environment.apiUrl}/api/recherche/ninea`, data, { headers});
  }
  getDepot(): Observable<any[]>  {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<any[]>(`${environment.apiUrl}/api/list/depots`, {headers},
    );
  }
  delete(id: number) {
    return this.http.delete<User[]>(`${environment.apiUrl}/api/users/` + id);
  }
}
