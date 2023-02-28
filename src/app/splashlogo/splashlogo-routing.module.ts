import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashlogoPage } from './splashlogo.page';

const routes: Routes = [
  {
    path: '',
    component: SplashlogoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplashlogoPageRoutingModule {}
