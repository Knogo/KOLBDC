import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AhomeComponent } from './adminpages/ahome/ahome.component';
import { ChomeComponent } from './creatorpages/chome/chome.component';
import { DhomeComponent } from './diverpages/dhome/dhome.component';
import { AdminGuard } from './userlog/admin.guard';
import { CreatorGuard } from './userlog/creator.guard';
import { DiverGuard } from './userlog/diver.guard';
import { LoginComponent } from './userlog/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'diver',
    component: DhomeComponent, canActivate:[DiverGuard]
  },
  {
    path: 'creator',
    component: ChomeComponent, canActivate:[CreatorGuard]
  },
  {
    path: 'admin',
    component: AhomeComponent, canActivate:[AdminGuard]
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
