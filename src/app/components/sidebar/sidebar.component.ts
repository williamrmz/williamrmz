import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    children?: {};
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Noticias',  icon: 'dashboard', class: ''},
    { path: '', title: 'Registrar',  icon:'book', class: '', 
    children: 
    [
      {path: '/registrar/paciente', title: 'Registrar Paciente', icon: 'person'},
      {path: '/registrar/zona', title: 'Registrar Zona', icon: 'location_on'},
      {path: '/registrar/usuario', title: 'Registrar Usuario', icon: 'person'},
    ]
    },
    { path: '', title: 'Listar',  icon:'content_paste', class: '',
    children:
    [
      {path: '/listar/paciente', title: 'Listar Pacientes', icon: 'person'},
      {path: '/listar/zona', title: 'Listar Zonas', icon: 'location_on'},
      {path: '/listar/usuario', title: 'Listar Usuarios', icon: 'person'},
    ] 
    },
    { path: '/reporte', title: 'Reporte',  icon:'list_alt', class: '' },
    //{ path: '/perfil', title: 'Perfil',  icon:'accessibility', class: '' }

   
];


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private router:Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  logOut(){
    Swal.fire({
      title: `Hasta luego`,
      showConfirmButton: false,
      showClass: {
        popup: 'animated fadeInDown faster'
      },
      hideClass: {
        popup: 'animated fadeOutUp faster'
      },
      timer: 1500,
    });
    localStorage.removeItem('dni');
    this.router.navigate(['/login']);
  }
}
