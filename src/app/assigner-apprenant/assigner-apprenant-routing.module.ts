import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignerApprenantPage } from './assigner-apprenant.page';

const routes: Routes = [
  {
    path: '',
    component: AssignerApprenantPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignerApprenantPageRoutingModule {}
