import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormAddQuizPage } from './form-add-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: FormAddQuizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormAddQuizPageRoutingModule {}
