import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from 'app/models/Usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class ListarUsuarioComponent implements OnInit {

  constructor(private usuarioService: UsuarioService) { }
  usuarios: Usuario;

  ngOnInit() {
    this.usuarioService.listUsuario().subscribe(
      res => {
        this.usuarios = res;
        console.log(res)
      },
      err => console.log(err)
    );
  }

}
