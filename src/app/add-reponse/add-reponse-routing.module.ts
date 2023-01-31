import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddReponsePage } from './add-reponse.page';

const routes: Routes = [
  {
    path: '',
    component: AddReponsePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddReponsePageRoutingModule {}
