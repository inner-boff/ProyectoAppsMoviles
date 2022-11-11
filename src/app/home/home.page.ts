import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Proveedor1Service } from '../services/proveedor1.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  profile = null;

  constructor(
   
    private authService: AuthService,
    private router: Router,
    public proveedor: Proveedor1Service
  ) {}

  async logout() {
    await this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true })
  }

  async changeImage() {}

  option = {
    initialSlide: 1,
    speed: 400,
    autoplay:true,
  }

  // async navegarAClubesJazz() {
  //   console.log('redirigiendo a clubes de jazz')
  //   this.router.navigateByUrl('clubes-jazz', { replaceUrl: true });
  // }

  async navegarAListado(opcion: string){
    console.log("Dio click en " + opcion);
    this.proveedor.opcion = opcion;
    this.router.navigateByUrl('lista-lugar', { replaceUrl: true });
  }  
}
