import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormAddQuestionPageRoutingModule } from './form-add-question-routing.module';

import { FormAddQuestionPage } from './form-add-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormAddQuestionPageRoutingModule
  ],
  declarations: [FormAddQuestionPage]
})
export class FormAddQuestionPageModule {}
