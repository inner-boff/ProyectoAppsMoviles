import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GaleriaFotosPageRoutingModule } from './galeria-fotos-routing.module';

import { GaleriaFotosPage } from './galeria-fotos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GaleriaFotosPageRoutingModule
  ],
  declarations: [GaleriaFotosPage]
})
export class GaleriaFotosPageModule {}
