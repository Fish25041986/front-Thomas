import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Usuario } from '../interfaces/Usuario';
import { Observable } from 'rxjs';
import { ResponseAcceso } from '../interfaces/ResponceAcceso';
import { ResponseUsuario } from '../interfaces/ResponseUsuario';
import { Login } from '../interfaces/Login';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {

  private http = inject(HttpClient)
  private baseUrl:string=appsettings.apiUrl;

  constructor() { }

  registrarse(objecto:Usuario):Observable<ResponseUsuario>{
    return this.http.post<ResponseUsuario>(`${this.baseUrl}usuarios`,objecto)
  }

  login(objecto:Login):Observable<ResponseAcceso>{
    return this.http.post<ResponseAcceso>(`${this.baseUrl}login`,objecto)
  }
}
