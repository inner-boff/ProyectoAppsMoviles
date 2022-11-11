import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaLugarPageRoutingModule } from './lista-lugar-routing.module';

import { ListaLugarPage } from './lista-lugar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaLugarPageRoutingModule
  ],
  declarations: [ListaLugarPage]
})
export class ListaLugarPageModule {}
