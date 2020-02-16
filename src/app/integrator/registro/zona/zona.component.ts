import { Component, OnInit } from '@angular/core';
import { Provincia } from 'app/models/Provincia';
import { Distrito } from 'app/models/Distrito';
import { Paciente } from 'app/models/Paciente';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Zona } from 'app/models/Zona';
import { UbigeoService } from '../../../services/ubigeo.service';
import { UsuarioService } from 'app/services/Usuario.service';
import  Swal from 'sweetalert2';

@Component({
  selector: 'app-zona',
  templateUrl: './zona.component.html',
  styleUrls: ['./zona.component.scss']
})
export class ZonaComponent implements OnInit {

  departamentos: any = [];
  provincias: any = [];
  distritos: any = [];
  zonas: any = [];

  prov: Provincia;
  dist: Distrito;
  zona: Zona;
  paciente: Paciente;

  valorDepartamento : number = 0;
  valorProvincia : number = 0;
  valorDistrito : number = 0;

  nombrezona: string= '';
  

  constructor(private ubigeoService: UbigeoService) { }

  zonaForm = new FormGroup(
    {
      nombrezona: new FormControl('', Validators.required),
      iddis: new FormControl( parseInt(localStorage.getItem("dist")) , Validators.required),
    }
  );

  ngOnInit() {
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

  cargarprovincias(){
    this.prov = {"iddepa":  this.valorDepartamento};

    this.ubigeoService.getProv(this.prov).subscribe(
      res =>{
        this.provincias = res;
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


  registrarZona(form: Zona){

    if(form.nombrezona == ""){
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Ingrese el nombre de la zona',
        showConfirmButton: false,
        timer: 2000
      })
    }else{
      this.ubigeoService.regZona(form).subscribe(
        res =>{        
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: `La zona ${form.nombrezona} ha sido registrada`,
            showConfirmButton: false,
            timer: 1500
          });
          this.ngOnInit();
        },
        err => console.log(err)
      );
      //console.log(form);
      localStorage.setItem("zona", this.nombrezona);
    }

     
    }

    
}
