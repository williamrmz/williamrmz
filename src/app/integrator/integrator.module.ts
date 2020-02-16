import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { IntegratorRoutes } from './integrator.routing';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PacienteComponent } from './registro/paciente/paciente.component';
import { ZonaComponent } from './registro/zona/zona.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuarioComponent } from './registro/usuario/usuario.component';
import { PrimerexamenComponent } from './examen/primerexamen/primerexamen.component';
import { SegundoexamenComponent } from './examen/segundoexamen/segundoexamen.component';
import { ListarPacienteComponent } from './lista/paciente/paciente.component';
import { ListarZonaComponent } from './lista/zona/zona.component';
import { ListarUsuarioComponent } from './lista/usuario/usuario.component';
import { ReporteComponent } from './reporte/reporte.component';
import { PacienteEditarComponent } from './editar/paciente-editar/paciente-editar.component';
import { UsuarioEditarComponent } from './editar/usuario-editar/usuario-editar.component';
import { ZonaEditarComponent } from './editar/zona-editar/zona-editar.component';
import { MaterialModule } from 'app/material/material.module';




@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(IntegratorRoutes),
    //RouterModule.forRoot(IntegratorRoutes, {onSameUrlNavigation: 'reload'}),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  declarations: [
    DashboardComponent,
    PacienteComponent,
    ZonaComponent,
    PerfilComponent,
    UsuarioComponent,
    PrimerexamenComponent,
    SegundoexamenComponent,
    ListarPacienteComponent,
    ListarZonaComponent,
    ListarUsuarioComponent,
    ReporteComponent,    
    PacienteEditarComponent,
    UsuarioEditarComponent,
    ZonaEditarComponent
  ],
  entryComponents: [
    PrimerexamenComponent,
    SegundoexamenComponent,    
    PacienteEditarComponent,
    UsuarioEditarComponent,
    ZonaEditarComponent
  ],
})

export class IntegratorModule {}
