import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GaleriaFotosPage } from './galeria-fotos.page';

const routes: Routes = [
  {
    path: '',
    component: GaleriaFotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GaleriaFotosPageRoutingModule {}
