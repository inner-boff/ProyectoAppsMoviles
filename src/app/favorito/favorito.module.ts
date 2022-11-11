import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoritoPageRoutingModule } from './favorito-routing.module';

import { FavoritoPage } from './favorito.page';
//import { GaleriaFotosService } from '../services/galeria-fotos.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritoPageRoutingModule
  ],
  declarations: [FavoritoPage]
})
export class FavoritoPageModule {}
