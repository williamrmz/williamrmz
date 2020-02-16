import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../../../services/paciente.service';
import { Paciente } from 'app/models/Paciente';
import { UbigeoService } from '../../../services/ubigeo.service';
import { Departamento } from 'app/models/Departamento';
import { Provincia } from 'app/models/Provincia';
import { Distrito } from 'app/models/Distrito';
import { Zona } from 'app/models/Zona';
import { MatDialog } from '@angular/material';
import { PrimerexamenComponent } from '../../examen/primerexamen/primerexamen.component';
import { SegundoexamenComponent } from '../../examen/segundoexamen/segundoexamen.component';
import { PacienteEditarComponent } from 'app/integrator/editar/paciente-editar/paciente-editar.component';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class ListarPacienteComponent implements OnInit {

  pacientes : Paciente;
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
  constructor(
    private pacienteService : PacienteService, 
    private ubigeoService : UbigeoService,
    public dialog: MatDialog,
    ) { }

  ngOnInit() {

    this.pacienteService.getPacientes().subscribe(
      res => {
        this.pacientes = res;
        console.log(res)
      },
      err => console.log(err)
    );

    //si existe un depa seleccionado antes escogerá ese depa cargará sus pronvicias
    if (localStorage.getItem("depa")) {
      this.valorDepartamento = parseInt(localStorage.getItem("depa"));
      this.cargarprovincias();
      //si existe uan provincia seleccionada antes escogerá ese provincia cargará sus distirtos
      if (localStorage.getItem("prov")) {
        this.valorProvincia = parseInt(localStorage.getItem("prov"));
        this.cargardistritos();
        //si existe un distrito seleccionado antes escogerá ese distrito cargará sus zonas
        if (localStorage.getItem("dist")) {
          this.valorDistrito = parseInt(localStorage.getItem("dist"));  
          this.cargarzonas();  
          if (localStorage.getItem("zona")) {
            this.valorZona = parseInt(localStorage.getItem("zona"));  
          }
        }
      }   
    }

    //invocación de los departamentos al iniciar 
    this.ubigeoService.getDepa().subscribe(
      res =>{
        this.departamentos = res;
      },
      err => console.log(err)
    );


    
    
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


  listarPorZona(){
    this.zona = {"idzona":  this.valorZona};
    this.pacienteService.getPacientesZona(this.zona).subscribe(
      res => {
        this.pacientes = res;
        console.log(res);
      },
      err => console.log(err)
    );
  }

  primerExamen(paciente: any){
    let referencia = this.dialog.open(PrimerexamenComponent, { data: paciente});
    referencia.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }


  segundoExamen(paciente: any){
    let referencia = this.dialog.open(SegundoexamenComponent, { data: paciente});
    referencia.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }


  editarPaciente(paciente: any){
    let referencia = this.dialog.open(PacienteEditarComponent, { data: paciente});
    referencia.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }



}
