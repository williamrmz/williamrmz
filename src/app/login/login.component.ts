import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'app/models/Usuario';
import { SesionService } from 'app/services/sesion.service';
import  Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string= '';
  clave: string= '';

  constructor(private route: Router, private sesionService: SesionService) { }
  loginForm = new FormGroup(
    {
      email: new FormControl('', Validators.required),
      clave: new FormControl('', Validators.required),
    }
  );

  ngOnInit() {
  }

  ingresar(form: Usuario)
  {
    this.sesionService.getSesion(form).subscribe(
      res =>{        
        if(res[0].estado==200){
          Swal.fire({
            title: `Bienvenido ${res[0].nombre}`,
            showConfirmButton: false,
            showClass: {
              popup: 'animated fadeInDown faster'
            },
            hideClass: {
              popup: 'animated fadeOutUp faster'
            },
            timer: 1500,
          });
          localStorage.setItem("dni", res[0].dni_usuario.toString());
          this.route.navigate(['/dashboard']);
        }else{
          Swal.fire({
            title: `${res[0].nombre}`,
            showConfirmButton: false,
            showClass: {
              popup: 'animated tada faster'
            },
            timer: 1500
          });
        }
        console.log(form)
       console.log(res[0].estado)
        //this.ngOnInit();
      },
    )
    //this.route.navigate(['/dashboard']);
  }




  
}



