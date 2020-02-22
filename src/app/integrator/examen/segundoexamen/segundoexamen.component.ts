import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Examenervice } from 'app/services/examen.service';
import { Examen } from 'app/models/Examen';
import  Swal from 'sweetalert2';
import { MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-segundoexamen',
  templateUrl: './segundoexamen.component.html',
  styleUrls: ['./segundoexamen.component.scss']
})
export class SegundoexamenComponent implements OnInit {

  peso_fin:string = "";
  talla_fin: string = "";
  resultado: string = "";
  hematocrito:string = "";
  valorTipo: string="";
  tipos: any;
  constructor(public dialogRef: MatDialogRef<SegundoexamenComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private examenService : Examenervice, public dialog: MatDialog,private spinner: NgxSpinnerService) { }

  examenForm = new FormGroup(
    {
      peso_fin: new FormControl('', Validators.required),
      talla_fin: new FormControl('', Validators.required),
      hematocrito_fin: new FormControl(''),
      hemoglobina_fin: new FormControl('', Validators.required),
      resultado_fin: new FormControl('', Validators.required),
      dni_paciente: new FormControl(this.data.dni_paciente, Validators.required),      
    }
  );

  ngOnInit() {

    if(this.data.edad>5){
      this.tipos = [
        {valor: 'N', nombre : 'NORMAL'},
        {valor: 'L', nombre : 'ANEMIA LEVE'},
        {valor: 'M', nombre : 'ANEMIA MODERADA'},
        {valor: 'S', nombre : 'ANEMIA SEVERA'},]
    } else{
      this.tipos = [
        {valor: 'N', nombre : 'NORMAL'},
        {valor: 'A', nombre : 'ANEMIA'},]
    }

  }


  onKey(value: string)
  {
    let sangre= parseFloat(value);
    let edad = this.data.edad;
    let sexo = this.data.sexo;    
    if (sangre < 13.5 && edad<2 )
      {
          //this.resultado="ANEMIA";
          this.valorTipo='A';
      }
      else if (sangre >= 13.5 && edad<2 )
      {
          //this.resultado="NORMAL";
          this.valorTipo='N';
      }

      //////////////////////////// DE 2 A 5 MESES
      else if (sangre >= 9.5  && (edad>=2 && edad<=5))
      {
          //this.resultado="NORMAL";
          this.valorTipo='N';
      }
      else if (sangre < 9.5 && (edad>=2 && edad<=5))
      {
          //this.resultado="ANEMIA";
          this.valorTipo='A';
      }

      ////////////////HASTA 4 AÑOS
      else if (sangre >= 11.0  && (edad>=6 && edad<60))
      {
          //this.resultado="NORMAL";
          this.valorTipo='N';
      }
      else if ((sangre >= 10.0 && sangre <= 10.9) && (edad>=6 && edad<60))
      {
          //this.resultado="ANEMIA LEVE";
          this.valorTipo='L';
      }
      else if ((sangre >= 7.0 && sangre <= 9.9) && (edad>=6 && edad<60))
      {
          //this.resultado="ANEMIA MODERADA";
          this.valorTipo='M';
      }
      else if ((sangre <= 7.0) && (edad>=6 && edad<60))
      {
          //this.resultado="ANEMIA SEVERA";
          this.valorTipo='S';
      }

      ////////////////DE 5 A 11 AÑOS
      else if (sangre >= 11.5 && (edad>=60 && edad<132))
      {
          //this.resultado="NORMAL";
          this.valorTipo='N';
      }
      else if ((sangre >= 11.0 && sangre <= 11.4) && (edad>=60 && edad<132))
      {
          //this.resultado="ANEMIA LEVE";
          this.valorTipo='L';
      }
      else if ((sangre >= 8.0 && sangre <= 10.9) && (edad>=60 && edad<132))
      {
          //this.resultado="ANEMIA MODERADA";
          this.valorTipo='M';
      }
      else if ((sangre <= 8.0) && (edad>=60 && edad<132))
      {
          //this.resultado="ANEMIA SEVERA";
          this.valorTipo='S';
      }

      ////////////////DE 11 A 14 AÑOS
      else if (sangre >= 12 && (edad>=132 && edad<168))
      {
          //this.resultado="NORMAL";
          this.valorTipo='N';
      }
      else if ((sangre >= 11.0 && sangre <= 11.9) && (edad>=132 && edad<168))
      {
          //this.resultado="ANEMIA LEVE";
          this.valorTipo='L';
      }
      else if ((sangre >= 8.0 && sangre <= 10.9) && (edad>=132 && edad<168))
      {
          //this.resultado="ANEMIA MODERADA";
          this.valorTipo='M';
      }
      else if ((sangre <= 8.0) && (edad>=132 && edad<168))
      {
          //this.resultado="ANEMIA SEVERA";
          this.valorTipo='S';
      }

      ////////////////DE 15 A MÁS HOMBRES
      else if (sangre >= 13 && edad>=168 && sexo==("MASCULINO"))
      {
          //this.resultado="NORMAL";
          this.valorTipo='N';
      }
      else if ((sangre >= 11.0 && sangre <= 12.9) && edad>=168 && sexo==("MASCULINO"))
      {
          //this.resultado="ANEMIA LEVE";
          this.valorTipo='L';
      }
      else if ((sangre >= 8.0 && sangre <= 10.9) && (edad>=168) && sexo==("MASCULINO"))
      {
          //this.resultado="ANEMIA MODERADA";
          this.valorTipo='M';
      }
      else if ((sangre <= 8.0) && (edad>=168) && sexo==("MASCULINO"))
      {
          //this.resultado="ANEMIA SEVERA";
          this.valorTipo='S';
      }


      ////////////////DE 15 A MÁS MUJERES
      else if (sangre >= 12 && edad>=168 && sexo==("FEMENINO"))
      {
          //this.resultado="NORMAL";
          this.valorTipo='N';
      }
      else if ((sangre >= 11.0 && sangre <= 11.9) && (edad>=168) && sexo==("FEMENINO"))
      {
          //this.resultado="ANEMIA LEVE";
          this.valorTipo='L';
      }
      else if ((sangre >= 8.0 && sangre <= 10.9) && (edad>=168) && sexo==("FEMENINO"))
      {
          //this.resultado="ANEMIA MODERADA";
          this.valorTipo='M';
      }
      else if ((sangre < 8.0) && (edad>=168) && sexo==("FEMENINO") )
      {
          //this.resultado="ANEMIA SEVERA";
          this.valorTipo='S';
      }else{
        this.valorTipo='';
      }


      this.hematocrito = (sangre*3.2).toFixed(2);

  }


  
  registrarExamen(form: Examen){
    this.spinner.show();
    let sangre= form.hemoglobina_fin;

    form.resultado_fin= this.valorTipo;

    form.hematocrito_fin = parseFloat((sangre*3.2).toFixed(2));

    //console.log(this.talla_fin, this.peso_fin);
    if(form.talla_fin.toString() == "" || form.peso_fin.toString() == "" || form.hemoglobina_fin.toString() =="" || 
    form.hematocrito_fin.toString() == "" || form.resultado_fin.toString() == "")
    {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Faltan datos!',
        showConfirmButton: false,
        timer: 2000
      })
    }else{
      this.examenService.regSegundoExamen(form).subscribe(
        res =>{        
          //console.log(res);          
          this.spinner.hide();
          Swal.fire({
            icon: 'success',
            title: 'Se registró el segundo examen',
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