import { Injectable } from '@angular/core';
// importamos para la autorización:
import { Auth, createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public email: any;
  
  constructor(

    private auth: Auth,
    private afAuth: AngularFireAuth,
    private alertController: AlertController


  ) { }

  // y las siguienets funciones
  async register({ email, password }) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (e) {
      return null;
    }
  }

  async login({ email, password }) {
    try {
      const user = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (e) {
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
  }

//   async recuperarContraseña({email}){
//  const user= this.afAuth.sendPasswordResetEmail(email);
//   }
  
//metodo de pame que valida el mail
  async recuperarContraseña(email: string){
    try {
      const user = await this.afAuth.sendPasswordResetEmail(email);
      //console.log(user)
      this.showAlert('Enviado! ', 'Por favor revise su casilla de mail');
      console.log("El mail está registrado - enviando correo de recuperación")
      //return user;
    } catch (e) {
      
      this.showAlert('Disculpe ', 'El correo no está registrado. Registre un nuevo usuario.');
      console.log("El mail no está registrado")
    }
  
    }
    
    // para poder mostrar mensajes de alerta
    async showAlert(header, message) {
      const alert = await this.alertController.create({
        header,
        message,
        buttons: ['OK'],
      });
      await alert.present();
    }
  
}
