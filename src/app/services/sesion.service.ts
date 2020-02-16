import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Usuario} from '../models/Usuario';
import {url} from './url';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  
  private API_URI =  `${url}/login`

  constructor(private http : HttpClient) {  

  }

  getSesion(user: Usuario)
  {
    //la forma de especificar el tipo de dato que queremos recibir
    return this.http.post<Usuario>(`${this.API_URI}/sesion`, user);
  }

  verificar(){
    return !!localStorage.getItem('dni');
  }

}
