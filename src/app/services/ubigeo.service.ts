import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Departamento } from '../models/Departamento';
import { Provincia } from '../models/Provincia';
import { Distrito } from '../models/Distrito';
import { Zona } from '../models/Zona';
import {Http, Headers} from '@angular/http';
import { HttpHeaders } from '@angular/common/http';
import {url} from './url';


@Injectable({
  providedIn: 'root'
})
export class UbigeoService {


  private API_URI = `${url}/ubigeo`

  provincia : Provincia;
  distrito: Distrito;
  zona: Zona;

  prov: Provincia;
  dist: Distrito;

  valorDepartamento : number = 0;
  valorProvincia : number = 0;
  valorDistrito : number = 0;
  valorZona : number = 0;
   
  

  constructor(private http : HttpClient) { 

  }

  getDepa()
  {
    //la forma de especificar el tipo de dato que queremos recibir
    return this.http.get(`${this.API_URI}/listarDepa`);
  }

  getProv(provincia : Provincia)
  {
    //la forma de especificar el tipo de dato que queremos recibir
    return this.http.post(`${this.API_URI}/listarProv`, provincia, {headers : {'Content-Type' : 'application/json; charset=UTF-8'}
  });
  }

  getDis(distrito : Distrito)
  {
   
    //la forma de especificar el tipo de dato que queremos recibir
    return this.http.post(`${this.API_URI}/listarDis`, distrito, {headers : {'Content-Type' : 'application/json; charset=UTF-8'}
  });
  }

  getZona(zona : Zona)
  {
    //la forma de especificar el tipo de dato que queremos recibir
    return this.http.post(`${this.API_URI}/listarZona`, zona);
  }

  regZona(zona: Zona)
  {
    return this.http.post(`${this.API_URI}/regZona`, zona);
  }

  todaZona()
  {
    return this.http.get(`${this.API_URI}/todaZona`);
  }

  editarZona(zona: Zona)
  {
    return this.http.post(`${this.API_URI}/editarZona`, zona);
  }

}
