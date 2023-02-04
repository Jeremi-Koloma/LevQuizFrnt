import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormAddQuizPageRoutingModule } from './form-add-quiz-routing.module';

import { FormAddQuizPage } from './form-add-quiz.page';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Module pour les formulaire reactive
    IonicModule,
    FormAddQuizPageRoutingModule,
    RouterModule.forChild([])
  ],
  declarations: [FormAddQuizPage]
})
export class FormAddQuizPageModule {}
