import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormAddQuestionPage } from './form-add-question.page';

const routes: Routes = [
  {
    path: '',
    component: FormAddQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormAddQuestionPageRoutingModule {}
