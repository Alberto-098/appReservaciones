import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoomsDetailsPageRoutingModule } from './rooms-details-routing.module';

import { RoomsDetailsPage } from './rooms-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoomsDetailsPageRoutingModule
  ],
  declarations: [RoomsDetailsPage]
})
export class RoomsDetailsPageModule {}
