import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  credentials: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private authService: AuthService,
    private router: Router,

  ) { }
  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }


  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
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



  async registrarse() {
    const loading = await this.loadingController.create();
    await loading.present();

    const user = await this.authService.register(this.credentials.value);
    await loading.dismiss();

    if (user) {
      this.router.navigateByUrl('/login', { replaceUrl: true });
    } else {
      this.showAlert('Falló el registro', 'Por favor intente de nuevo');
    }
  }
}
