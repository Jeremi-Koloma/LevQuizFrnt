import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddReponsePageRoutingModule } from './add-reponse-routing.module';

import { AddReponsePage } from './add-reponse.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddReponsePageRoutingModule
  ],
  declarations: [AddReponsePage]
})
export class AddReponsePageModule {}
