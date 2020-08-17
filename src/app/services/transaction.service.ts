import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private  http: HttpClient) { }
  envoi(data: any)  {
    const  headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<any[]>( `${environment.apiUrl}/api/transaction/envoi`, data, { headers});
  }
  retrait(data: any)  {
    const  headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<any[]>( `${environment.apiUrl}/api/transaction/retrait`, data, { headers});
  }
  getCode(data: any)  {
    const  headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.post<any[]>( `${environment.apiUrl}/api/recherche/code`, data, { headers});
  }
  getListeEnvoi() {
    const  headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<any[]>( `${environment.apiUrl}/api/list/envois`, { headers});
  }
  getListeRetrait() {
    const  headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    return this.http.get<any[]>( `${environment.apiUrl}/api/list/retraits`, { headers});
  }
  getInfosCompte() {
      const  headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
      return this.http.get<any[]>( `${environment.apiUrl}/api/get-infos-compte`, { headers});
    }
}
