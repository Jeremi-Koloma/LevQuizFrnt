import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { InputComponent } from '../input/input.component';


@NgModule({
  declarations: [
    InputComponent // le composant input
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ],
  exports:[
    InputComponent
  ]
})
export class SharedModule { }
