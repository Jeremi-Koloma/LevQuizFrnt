import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmailsendPage } from './emailsend.page';

const routes: Routes = [
  {
    path: '',
    component: EmailsendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmailsendPageRoutingModule {}
