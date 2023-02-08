import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterFormateurPage } from './register-formateur.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterFormateurPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterFormateurPageRoutingModule {}
