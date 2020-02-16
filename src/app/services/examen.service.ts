import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Paciente} from '../models/Paciente';
import {Examen} from '../models/Examen';
import {url} from './url';

@Injectable({
  providedIn: 'root'
})
export class Examenervice {

  
  private API_URI = `${url}/examen`

  constructor(private http : HttpClient) {  

  }

  regPrimerExamen(examen: Examen)
  {
    return this.http.post<Examen>(`${this.API_URI}/regPri`, examen);
  }

  regSegundoExamen(examen: Examen)
  {
    return this.http.post<Examen>(`${this.API_URI}/regSeg`, examen);
  }

}
