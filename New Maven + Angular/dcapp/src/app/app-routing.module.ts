import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AhomeComponent } from './adminpages/ahome/ahome.component';
import { ChomeComponent } from './creatorpages/chome/chome.component';
import { DhomeComponent } from './diverpages/dhome/dhome.component';
import { DungeonlistComponent } from './dungeonpages/dungeonlist/dungeonlist.component';
import { AdminGuard } from './userlog/admin.guard';
import { CreatorGuard } from './userlog/creator.guard';
import { DiverGuard } from './userlog/diver.guard';
import { EdituserComponent } from './userlog/edituser/edituser.component';
import { LoginComponent } from './userlog/login/login.component';
import { NewuserComponent } from './userlog/newuser/newuser.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'newUser',
    component: NewuserComponent
  },
  {
    path: 'editUser',
    component: EdituserComponent //For Regular users
  },
  {
    path: 'diver',
    canActivate: [DiverGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: DhomeComponent
      },
      {
        path: 'dungeonlist',
        component: DungeonlistComponent
      }]
  },
  {
    path: 'creator',
    component: ChomeComponent, canActivate: [CreatorGuard]
  },
  {
    path: 'admin',
    component: AhomeComponent, canActivate: [AdminGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
