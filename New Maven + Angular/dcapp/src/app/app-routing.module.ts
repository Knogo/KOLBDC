import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AhomeComponent } from './adminpages/ahome/ahome.component';
import { AddCreatorComponent } from './adminpages/creAdmin/add-creator/add-creator.component';
import { CreatorListComponent } from './adminpages/creAdmin/creator-list/creator-list.component';
import { EditCreatorComponent } from './adminpages/creAdmin/edit-creator/edit-creator.component';
import { AddDiverComponent } from './adminpages/divAdmin/add-diver/add-diver.component';
import { DiverListComponent } from './adminpages/divAdmin/diver-list/diver-list.component';
import { EditDiverComponent } from './adminpages/divAdmin/edit-diver/edit-diver.component';
import { AcrawlerComponent } from './adminpages/dunAdmin/acrawler/acrawler.component';
import { AddDungeonComponent } from './adminpages/dunAdmin/add-dungeon/add-dungeon.component';
import { DungeonListComponent } from './adminpages/dunAdmin/dungeon-list/dungeon-list.component';
import { EditDungeonComponent } from './adminpages/dunAdmin/edit-dungeon/edit-dungeon.component';
import { AddUserComponent } from './adminpages/useAdmin/add-user/add-user.component';
import { EditUserComponent } from './adminpages/useAdmin/edit-user/edit-user.component';
import { UserListComponent } from './adminpages/useAdmin/user-list/user-list.component';
import { CcralwerComponent } from './creatorpages/ccralwer/ccralwer.component';
import { CeditorComponent } from './creatorpages/ceditor/ceditor.component';
import { ChomeComponent } from './creatorpages/chome/chome.component';
import { CupgradesComponent } from './creatorpages/cupgrades/cupgrades.component';
import { DcrawlerComponent } from './diverpages/dcrawler/dcrawler.component';
import { DhomeComponent } from './diverpages/dhome/dhome.component';
import { DupgradesComponent } from './diverpages/dupgrades/dupgrades.component';
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
        path: 'upgrades',
        component: DupgradesComponent
      },
      {
        path: 'dungeonlist',
        component: DungeonlistComponent
      },
      {
        path: 'dungeon/:did',
        component: DcrawlerComponent
      }]
  },
  {
    path: 'creator',
    canActivate: [CreatorGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ChomeComponent
      },
      {
        path: 'dungeoncreator',
        component: CeditorComponent
      },
      {
        path: 'upgrades',
        component: CupgradesComponent
      },
      {
        path: 'dungeonlist',
        component: DungeonlistComponent
      },
      {
        path: 'dungeon/:did',
        component: CcralwerComponent
      }]
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: AhomeComponent
      },
      {
        path: 'userlist',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: UserListComponent
          },
          {
            path: 'create',
            component: AddUserComponent
          },
          {
            path: 'edit/:id',
            component: EditUserComponent //Admin version
          }
        ]
      },
      {
        path: 'diverlist',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: DiverListComponent
          },
          {
            path: 'create',
            component: AddDiverComponent
          },
          {
            path: 'edit/:id',
            component: EditDiverComponent //Admin version
          }
        ]
      },
      {
        path: 'creatorlist',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: CreatorListComponent
          },
          {
            path: 'create',
            component: AddCreatorComponent
          },
          {
            path: 'edit/:id',
            component: EditCreatorComponent //Admin version
          }
        ]
      },
      {
        path: 'dungeonlist',
        children: [
          {
            path: '',
            pathMatch: 'full',
            component: DungeonListComponent //Admin version
          },
          {
            path: 'test/:did',
            component: AcrawlerComponent
          },
          {
            path: 'create',
            component: AddDungeonComponent
          },
          {
            path: 'edit/:did',
            component: EditDungeonComponent //Admin version
          }
        ]
      }
    ]
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
