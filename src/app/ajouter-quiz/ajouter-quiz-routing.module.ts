import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AjouterQuizPage } from './ajouter-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: AjouterQuizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AjouterQuizPageRoutingModule {}
