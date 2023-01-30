import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameQuizPageRoutingModule } from './game-quiz-routing.module';

import { GameQuizPage } from './game-quiz.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameQuizPageRoutingModule
  ],
  declarations: [GameQuizPage]
})
export class GameQuizPageModule {}
