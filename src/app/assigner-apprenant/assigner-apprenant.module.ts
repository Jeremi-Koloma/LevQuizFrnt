import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignerApprenantPageRoutingModule } from './assigner-apprenant-routing.module';

import { AssignerApprenantPage } from './assigner-apprenant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssignerApprenantPageRoutingModule
  ],
  declarations: [AssignerApprenantPage]
})
export class AssignerApprenantPageModule {}
