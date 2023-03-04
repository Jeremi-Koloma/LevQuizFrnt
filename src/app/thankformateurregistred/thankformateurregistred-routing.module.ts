import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThankformateurregistredPage } from './thankformateurregistred.page';

const routes: Routes = [
  {
    path: '',
    component: ThankformateurregistredPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThankformateurregistredPageRoutingModule {}
