import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormAddQuizPageRoutingModule } from './form-add-quiz-routing.module';

import { FormAddQuizPage } from './form-add-quiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormAddQuizPageRoutingModule
  ],
  declarations: [FormAddQuizPage]
})
export class FormAddQuizPageModule {}
