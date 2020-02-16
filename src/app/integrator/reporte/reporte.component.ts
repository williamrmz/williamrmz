import { Component, OnInit } from '@angular/core';
import { Reporte } from 'app/models/Reporte';
import { UbigeoService } from '../../services/ubigeo.service';
import { Provincia } from 'app/models/Provincia';
import { Distrito } from 'app/models/Distrito';
import { Zona } from 'app/models/Zona';
import { ReporteService } from '../../services/reporte.service';
import {MatTableDataSource} from '@angular/material/table';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.scss']
})




export class ReporteComponent implements OnInit {

  dataSource = new MatTableDataSource();
  disabled = false;

  reportes : Reporte[];
  departamentos: any = [];
  provincias: any = [];
  distritos: any = [];
  zonas: any = [];

  prov: Provincia;
  dist: Distrito;
  zona: Zona;


  valorDepartamento : number = 0;
  valorProvincia : number = 0;
  valorDistrito : number = 0;
  valorZona : number = 0;
  edad: number;


  
  
  constructor(private ubigeoService : UbigeoService, private reporteService : ReporteService) { }

  ngOnInit() {

    this.reporteService.getReporte().subscribe(
      res => {
        this.reportes = res;
        this.dataSource.data = res;
        console.log(res)
      },
      err => console.log(err)
    );


    if (localStorage.getItem("depa")) {
      this.valorDepartamento = parseInt(localStorage.getItem("depa"));
      this.cargarprovincias();
      if (localStorage.getItem("prov")) {
        this.valorProvincia = parseInt(localStorage.getItem("prov"));
        this.cargardistritos();
        if (localStorage.getItem("dist")) {
          this.valorDistrito = parseInt(localStorage.getItem("dist"));  
          this.cargarzonas();  
          if (localStorage.getItem("zona")) {
            this.valorZona = parseInt(localStorage.getItem("zona"));  
          }
        }
      }   
    }


    this.ubigeoService.getDepa().subscribe(
      res =>{
        this.departamentos = res;
      },
      err => console.log(err)
    );

  }

  exportar(){
    this.reporteService.exportarExcel(this.dataSource.data, 'my_export');
  }

  cargarprovincias(){
    this.prov = {"iddepa":  this.valorDepartamento};

    this.ubigeoService.getProv(this.prov).subscribe(
      res =>{
        this.provincias = res;
        //console.log(res);
      },
      err => console.log(err)
    );
    //guardando el valor del departamento
    localStorage.setItem("depa", this.valorDepartamento.toString());
  }

  cargardistritos(){

    this.dist = {"idpro":  this.valorProvincia};

    this.ubigeoService.getDis(this.dist).subscribe(
      res =>{
        this.distritos = res;
      },
      err => console.log(err)
    );
    //guardar el valor de la provincia
    localStorage.setItem("prov", this.valorProvincia.toString());
  }


  cargarzonas(){

    this.zona = {"iddis":  this.valorDistrito};
    this.ubigeoService.getZona(this.zona).subscribe(
      res =>{
        this.zonas = res;
        //console.log(res);
      },
      err => console.log(err)
    );
    //guardar el distrito seleccionado
    localStorage.setItem("dist", this.valorDistrito.toString());
  }



  guardarzona(){
    localStorage.setItem("zona", this.valorZona.toString());
  }

  
  listar(){
    this.zona = {"idzona":  this.valorZona};
    if(this.disabled){
      this.reporteService.getReporte().subscribe(
        res => {
          this.reportes = res;
          this.dataSource.data = res;
          console.log(res);
        },
        err => console.log(err)
      );
    }else{
      this.reporteService.getReporteZona(this.zona).subscribe(
        res => {
          this.reportes = res;
          this.dataSource.data = res;
          console.log(res);
        },
        err => console.log(err)
      );
    }
  }



}
