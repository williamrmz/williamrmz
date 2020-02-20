import { Component, OnInit } from '@angular/core';
import { UbigeoService } from '../../../services/ubigeo.service';
import { Zona } from 'app/models/Zona';
import { MatDialog } from '@angular/material';
import { ZonaEditarComponent } from 'app/integrator/editar/zona-editar/zona-editar.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-zona',
  templateUrl: './zona.component.html',
  styleUrls: ['./zona.component.scss']
})
export class ListarZonaComponent implements OnInit {

  constructor(private ubigeoService: UbigeoService, public dialog: MatDialog,private spinner: NgxSpinnerService) { }
  zonas: Zona;

  ngOnInit() {
    this.spinner.show();
    this.ubigeoService.todaZona().subscribe(
      res => {
        this.zonas = res;
        this.spinner.hide();
      },
      err => console.log(err)
    );
  }

  editarZona(zona: any){
    let referencia = this.dialog.open(ZonaEditarComponent, { data: zona});
    referencia.afterClosed().subscribe(result => {
      this.ngOnInit();
    })
  }

}
