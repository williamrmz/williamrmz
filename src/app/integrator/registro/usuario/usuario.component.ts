import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'app/models/Usuario';
import { UsuarioService } from 'app/services/usuario.service';
import  Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  constructor(private usuarioService: UsuarioService, private spinner: NgxSpinnerService) { }

  usuarioForm = new FormGroup(
    {
      dni_usuario: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]) ,
      email: new FormControl('', [Validators.required, Validators.email]),
      clave: new FormControl('', [Validators.required]),
      estado: new FormControl('A', [Validators.required]),
      tipo: new FormControl('U', [Validators.required])
    }
  );

  ngOnInit() {
  }

  registrarPaciente(form: Usuario){
    this.spinner.show();

    if(form.nombre=="" || form.email=="" || form.clave=="")
    {
      this.spinner.hide();
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Está omitiendo datos importantes (*)!',
        showConfirmButton: false,
        timer: 2000
      })
    }else if(form.dni_usuario.length !=8)
      {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: 'La cantidad de dígitos del DNI (*)!',
          showConfirmButton: false,
          timer: 2000
        })
    }    
    else{
      this.usuarioService.regUsuario(form).subscribe(
        res =>{        
          this.spinner.hide();
          Swal.fire({
            icon: 'success',
            title: `El usuario de ${form.nombre} ha sido registrado`,
            showConfirmButton: false,
            timer: 1500
          });
          
          this.ngOnInit();
        },
        err => console.log(err)
      );
    }

      
   
    }

}
