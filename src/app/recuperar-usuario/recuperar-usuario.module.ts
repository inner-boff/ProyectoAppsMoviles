import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecuperarUsuarioPageRoutingModule } from './recuperar-usuario-routing.module';

import { RecuperarUsuarioPage } from './recuperar-usuario.page';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecuperarUsuarioPageRoutingModule,
    
    ReactiveFormsModule
  ],
  declarations: [RecuperarUsuarioPage]
})
export class RecuperarUsuarioPageModule {}
