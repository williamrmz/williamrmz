import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PacienteService } from 'app/services/paciente.service';
import { Paciente } from 'app/models/Paciente';
import  Swal from 'sweetalert2';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-paciente-editar',
  templateUrl: './paciente-editar.component.html',
  styleUrls: ['./paciente-editar.component.scss']
})
export class PacienteEditarComponent implements OnInit {

  nombre:string = this.data.nombre;
  apellido: string = this.data.apellido;
  domicilio: string = this.data.domicilio;

  constructor(public dialogRef: MatDialogRef<PacienteEditarComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private pacienteService : PacienteService, public dialog: MatDialog,private spinner: NgxSpinnerService) { }


    pacienteForm = new FormGroup(
      {
        dni_paciente: new FormControl(this.data.dni_paciente, Validators.required),
        nombre: new FormControl("", Validators.required),
        apellido: new FormControl("", Validators.required),
        domicilio: new FormControl("", Validators.required)        
      }
    );

  ngOnInit() {
  }



  editar(form: Paciente){
    this.spinner.show();

    if(form.nombre=="" || form.apellido== ""){
      this.spinner.hide();      
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Está omitiendo datos importantes (*)!',
        showConfirmButton: false, 
        timer: 2000
      })
  }else{
      this.pacienteService.getEditarPaciente(form).subscribe(
        res =>{        
          this.spinner.hide();
          Swal.fire({
            icon: 'success',
            title: 'Se editó al paciente',
            showConfirmButton: false,
            timer: 1500
          });
          this.dialog.closeAll();

        },
        err => console.log(err)
      );  

      }
  }
}
