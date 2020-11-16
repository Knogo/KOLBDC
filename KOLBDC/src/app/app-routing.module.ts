import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DiverListComponent } from './diver-list/diver-list.component';
import { CreatorListComponent } from './creator-list/creator-list.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { DungeonListComponent } from './dungeon-list/dungeon-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/diverlist',
    pathMatch: 'full'
  },
  {
    path: 'diverlist',
    component: DiverListComponent
  },
  {
    path: 'creatorlist',
    component: CreatorListComponent
  },
  {
    path: 'adminlist',
    component: AdminListComponent
  },
  {
    path: 'dungeonlist',
    component: DungeonListComponent
  },
  {
    path: '**',
    redirectTo: '/diverlist',
    pathMatch: 'full'
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
