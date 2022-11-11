import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecuperarUsuarioPage } from './recuperar-usuario.page';

const routes: Routes = [
  {
    path: '',
    component: RecuperarUsuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecuperarUsuarioPageRoutingModule {}
