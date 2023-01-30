import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameQuizPage } from './game-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: GameQuizPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GameQuizPageRoutingModule {}
