import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from 'app/models/Usuario';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class ListarUsuarioComponent implements OnInit {

  constructor(private usuarioService: UsuarioService,private spinner: NgxSpinnerService) { }
  usuarios: Usuario;

  ngOnInit() {
    this.spinner.show();
    this.usuarioService.listUsuario().subscribe(
      res => {
        this.usuarios = res;
        this.spinner.hide();
      },
      err => console.log(err)
    );
  }

}
