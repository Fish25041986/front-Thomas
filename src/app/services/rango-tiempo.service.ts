import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { ResponseRangoTiempo } from '../interfaces/ResponseRangoTiempo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RangoTiempoService {

  private http = inject(HttpClient)
  private baseUrl:string=appsettings.apiUrl;

  constructor() { }

  listaRangoTiempo():Observable<ResponseRangoTiempo>{
    return this.http.get<ResponseRangoTiempo>(`${this.baseUrl}rangotiempo`)
  }
}
