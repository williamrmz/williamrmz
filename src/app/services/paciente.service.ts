import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Paciente} from '../models/Paciente';
import {Zona} from '../models/Zona';
import {url} from './url';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  
  private API_URI = `${url}/paciente`

  constructor(private http : HttpClient) {  

  }

  getPacientes()
  {
    //la forma de especificar el tipo de dato que queremos recibir
    return this.http.get<Paciente>(`${this.API_URI}/listar`);
  }

  regPaciente(objeto)
  {
    return this.http.post(`${this.API_URI}/registrar`, objeto);
  }

  getPacientesZona(objZona : Zona)
  {
    return this.http.post<Paciente>(`${this.API_URI}/listar`, objZona);
  }

  getEditarPaciente(objPaciente: Paciente)
  {
    return this.http.post<Paciente>(`${this.API_URI}/editar`, objPaciente);
  }

}
