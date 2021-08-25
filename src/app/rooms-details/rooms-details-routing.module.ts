import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../guards/auth-guard.service';

import { RoomsDetailsPage } from './rooms-details.page';

const routes: Routes = [
  {
    path: ':id',
    component: RoomsDetailsPage,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomsDetailsPageRoutingModule {}
