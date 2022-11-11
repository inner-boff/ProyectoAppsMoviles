import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LugarPage } from './lugar.page';

const routes: Routes = [
  {
    path: '',
    component: LugarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LugarPageRoutingModule {}
