import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Usuario} from '../models/Usuario';
import {url} from './url';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  
  private API_URI =  `${url}/usuario`

  constructor(private http : HttpClient) {  

  }

  regUsuario(user: Usuario)
  {
    //la forma de especificar el tipo de dato que queremos recibir
    return this.http.post<Usuario>(`${this.API_URI}/registrar`, user);
  }

  listUsuario()
  {
    return this.http.get<Usuario>(`${this.API_URI}/listar`);
  }

}
