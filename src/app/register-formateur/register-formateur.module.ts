import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterFormateurPageRoutingModule } from './register-formateur-routing.module';

import { RegisterFormateurPage } from './register-formateur.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterFormateurPageRoutingModule
  ],
  declarations: [RegisterFormateurPage]
})
export class RegisterFormateurPageModule {}
