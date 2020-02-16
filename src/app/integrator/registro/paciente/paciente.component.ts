import { Component, OnInit } from '@angular/core';
import { UbigeoService } from '../../../services/ubigeo.service';
import { PacienteService } from "../../../services/paciente.service";
import  Swal from 'sweetalert2';
import { Provincia } from 'app/models/Provincia';
import { Distrito } from 'app/models/Distrito';
import { Zona } from 'app/models/Zona';
import { Paciente } from 'app/models/Paciente';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})
export class PacienteComponent implements OnInit {

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
  valorZona : number = 0;

  

  constructor(private ubigeoService : UbigeoService, private pacienteService: PacienteService) { }


  pacienteForm = new FormGroup(
    {
      dni_paciente: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required) ,
      apellido: new FormControl('', Validators.required),
      sexo: new FormControl('M', Validators.required),
      religion: new FormControl(''),
      seguro: new FormControl(''),
      domicilio: new FormControl(''),
      fecha_nac: new FormControl('', Validators.required),
      edad_gesta: new FormControl('A', Validators.required),
      dni_usuario: new FormControl(localStorage.getItem("dni"), Validators.required),
      idzona: new FormControl(parseInt(localStorage.getItem("zona")), Validators.required)
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


  cargarzonas(){    
    this.zona = {"iddis":  this.valorDistrito};
    this.ubigeoService.getZona(this.zona).subscribe(
      res =>{
        this.zonas = res;
      },
      err => console.log(err)
    );
    //guardar el distrito seleccionado
    localStorage.setItem("dist", this.valorDistrito.toString());
  }



  guardarzona(){
    localStorage.setItem("zona", this.valorZona.toString());
  }


  registrarPaciente(form: Paciente){
    if (form.domicilio == '') {
        form.domicilio = 'NINGUNA'
    }
    if (form.religion == '') {
      form.religion = 'NINGUNA'
    }
    if (form.seguro == '') {
      form.seguro = 'NINGUNO'
    }

    
    if(form.nombre=="" || form.apellido== "" || form.fecha_nac==""){
      
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'Está omitiendo datos importantes (*)!',
          showConfirmButton: false, 
          timer: 2000
        })
    }else if(form.idzona.toString()=="" || !localStorage.getItem("zona")){
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Aún no escoge la zona',
        showConfirmButton: false,
        timer: 2000
      })
    }else if(form.dni_paciente.length !=8){
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'El dni tiene cantidad de caracteres incorrectos',
        showConfirmButton: false,
        timer: 2000
      })
    }    
    else{
      this.pacienteService.regPaciente(form).subscribe(
        res =>{        
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Usuario registrado',
            showConfirmButton: false,
            timer: 1500
          });
          this.ngOnInit();
        },
        err => console.log(err)
      );
      
    }
    console.log(form);
 
  }



}

  


