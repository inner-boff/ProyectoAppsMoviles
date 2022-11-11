import { Component, OnInit } from '@angular/core';



import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-recuperar-usuario',
  templateUrl: './recuperar-usuario.page.html',
  styleUrls: ['./recuperar-usuario.page.scss'],
})
export class RecuperarUsuarioPage implements OnInit {

  credentials: FormGroup;

  constructor(
    private fb: FormBuilder, private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authService: AuthService
  ) { }
  get email() {
    return this.credentials.get('email');
  }
  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]]

    })
  }

  async showAlert(header, message) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
// este es el metodo q fuciona
  //  recuperarUsuario() {
 
  //    if (this.credentials.valid && this.email.valid) {
      
  //      const { email } = this.credentials.value;
  //     this.authService.recuperarContraseña(email);
      
  //     this.showAlert('Enviado! ', 'Por favor revise su casilla de mail');
  //     this.router.navigateByUrl('/login', { replaceUrl: true });
      
  //    }else{
  //     this.showAlert('error', 'Por favor revise su casilla de mail');
  //    }
  //  }

  //metodo pame donde se valida el usuario, falta ver como dejar al usuario en la pagina de recuperar-usuario
  //si el email es invalido
   recuperarUsuario() {
 
    if (this.credentials.valid) {
     
      const { email } = this.credentials.value;
     this.authService.recuperarContraseña(email);
     
     // La siguiente alerta pasó al método 
     // recuperarContraseña() en auth.service.ts -->
 
     //this.showAlert('Enviado! ', 'Por favor revise su casilla de mail');
     //console.log("Enviando correo de recuperacion");

     // Devuelva al usuario a la página de login
     this.router.navigateByUrl('/login', { replaceUrl: true });
     
    }




  }
}
