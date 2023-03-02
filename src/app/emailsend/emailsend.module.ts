import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmailsendPageRoutingModule } from './emailsend-routing.module';

import { EmailsendPage } from './emailsend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EmailsendPageRoutingModule
  ],
  declarations: [EmailsendPage]
})
export class EmailsendPageModule {}
