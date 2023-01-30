import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormAddQuizPageRoutingModule } from './form-add-quiz-routing.module';

import { FormAddQuizPage } from './form-add-quiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule, // Module pour les formulaire reactive
    IonicModule,
    FormAddQuizPageRoutingModule
  ],
  declarations: [FormAddQuizPage]
})
export class FormAddQuizPageModule {}
