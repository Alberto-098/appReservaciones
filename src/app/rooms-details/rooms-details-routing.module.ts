import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoomsDetailsPage } from './rooms-details.page';

const routes: Routes = [
  {
    path: '',
    component: RoomsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsDetailsPageRoutingModule {}
