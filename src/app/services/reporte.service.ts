import { Injectable } from '@angular/core';
import {Zona} from '../models/Zona';
import { HttpClient} from '@angular/common/http';
import { Reporte} from '../models/Reporte';
import {url} from './url';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  private API_URI = `${url}/reporte`

  constructor(private http : HttpClient) {  

  }

  getReporte()
  {
    //la forma de especificar el tipo de dato que queremos recibir
    return this.http.get<Reporte[]>(`${this.API_URI}/listar`);
  }

  getReporteZona(zona:Zona)
  {
    return this.http.post<Reporte[]>(`${this.API_URI}/listar`, zona);
  }


  public exportarExcel(json:any[], excelFileName: string): void{
    const worksheet : XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workboot : XLSX.WorkBook = {
      Sheets: {'data': worksheet},
      SheetNames: ['data']
    };
    const excelBuffer: any = XLSX.write(workboot, {bookType: 'xlsx', type: 'array'});

    this.guardarExcel(excelBuffer, excelFileName);
  }

  private guardarExcel(buffer: any, fileName:string): void{
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_export' + new Date().getTime() + EXCEL_EXT); 
  }
}
