import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaLugarPage } from './lista-lugar.page';

const routes: Routes = [
  {
    path: '',
    component: ListaLugarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaLugarPageRoutingModule {}
