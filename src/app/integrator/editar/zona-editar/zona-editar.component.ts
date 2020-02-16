import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UbigeoService } from 'app/services/ubigeo.service';
import {  Zona } from 'app/models/Zona';
import  Swal from 'sweetalert2';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-zona-editar',
  templateUrl: './zona-editar.component.html',
  styleUrls: ['./zona-editar.component.scss']
})
export class ZonaEditarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ZonaEditarComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private ubigeoService : UbigeoService, public dialog: MatDialog) { }

  ngOnInit() {
  }

  nombrezona: string = this.data.nombrezona;
  zonaForm = new FormGroup(
    {
      idzona: new FormControl(this.data.idzona, Validators.required),
      nombrezona: new FormControl("", Validators.required), 
    }
  );



  editar(form: Zona){

    if(form.nombrezona== ""){
      
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Tiene que poner un nombre!',
        showConfirmButton: false, 
        timer: 2000
      })
  }else{
      this.ubigeoService.editarZona(form).subscribe(
        res =>{        
          //console.log(res);
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
