import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashlogoPageRoutingModule } from './splashlogo-routing.module';

import { SplashlogoPage } from './splashlogo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashlogoPageRoutingModule
  ],
  declarations: [SplashlogoPage]
})
export class SplashlogoPageModule {}
