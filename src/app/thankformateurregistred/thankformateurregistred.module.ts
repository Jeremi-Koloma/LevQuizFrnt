import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThankformateurregistredPageRoutingModule } from './thankformateurregistred-routing.module';

import { ThankformateurregistredPage } from './thankformateurregistred.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThankformateurregistredPageRoutingModule
  ],
  declarations: [ThankformateurregistredPage]
})
export class ThankformateurregistredPageModule {}
