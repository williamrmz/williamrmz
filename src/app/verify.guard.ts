import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SesionService } from './services/sesion.service';


@Injectable({
  providedIn: 'root'
})
export class VerifyGuard implements CanActivate {

  constructor(private sesionService:SesionService, private router:Router){}

  canActivate(t): boolean {
    if(this.sesionService.verificar()){
      return true;
    }

    this.router.navigate(['/login']);
    return false;
    
  }
  
}
