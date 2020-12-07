import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DungeonlistComponent } from './dungeonlist/dungeonlist.component';
import { DungeonrunnerComponent } from './dungeonrunner/dungeonrunner.component';
import { LoginComponent } from './login/login.component';

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
    path: 'dungeonlist',
    component: DungeonlistComponent
  },
  {
    path: 'dungeon/:did', 
    component: DungeonrunnerComponent
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
