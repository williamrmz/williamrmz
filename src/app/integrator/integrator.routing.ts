import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PacienteComponent } from './registro/paciente/paciente.component';
import { ZonaComponent } from './registro/zona/zona.component';
import { UsuarioComponent } from "./registro/usuario/usuario.component";
import { ListarPacienteComponent } from "./lista/paciente/paciente.component";
import { ListarZonaComponent } from "./lista/zona/zona.component";
import { ListarUsuarioComponent } from "./lista/usuario/usuario.component";
import { PerfilComponent } from "./perfil/perfil.component";
import { ReporteComponent } from "./reporte/reporte.component";

export const IntegratorRoutes: Routes = [
    { path: 'dashboard',            component: DashboardComponent },
    { path: 'registrar/paciente',   component: PacienteComponent},
    { path: 'registrar/zona',       component: ZonaComponent},
    { path: 'registrar/usuario',    component: UsuarioComponent},
    { path: 'listar/paciente',      component: ListarPacienteComponent },
    { path: 'listar/zona',          component: ListarZonaComponent },
    { path: 'listar/usuario',       component: ListarUsuarioComponent },
    { path: 'perfil',               component: PerfilComponent },
    { path: 'reporte',              component: ReporteComponent },
    
    //{ path: 'upgrade',        component: UpgradeComponent }
];

