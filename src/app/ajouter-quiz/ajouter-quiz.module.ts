import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AjouterQuizPageRoutingModule } from './ajouter-quiz-routing.module';

import { AjouterQuizPage } from './ajouter-quiz.page';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule, // pour la pagination
    IonicModule,
    AjouterQuizPageRoutingModule
  ],
  declarations: [AjouterQuizPage]
})
export class AjouterQuizPageModule {}
