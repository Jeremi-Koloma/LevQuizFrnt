import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScorePageRoutingModule } from './score-routing.module';

import { ScorePage } from './score.page';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgxPaginationModule,
    ScorePageRoutingModule
  ],
  declarations: [ScorePage]
})
export class ScorePageModule {}
