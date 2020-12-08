import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MinvalDirective } from './general/minval.directive';
import { UserbarComponent } from './userlog/userbar/userbar.component';
import { LoginComponent } from './userlog/login/login.component';
import { DhomeComponent } from './diverpages/dhome/dhome.component';
import { DcrawlerComponent } from './diverpages/dcrawler/dcrawler.component';
import { DupgradesComponent } from './diverpages/dupgrades/dupgrades.component';
import { ChomeComponent } from './creatorpages/chome/chome.component';
import { CcralwerComponent } from './creatorpages/ccralwer/ccralwer.component';
import { CupgradesComponent } from './creatorpages/cupgrades/cupgrades.component';
import { CeditorComponent } from './creatorpages/ceditor/ceditor.component';
import { HelpmenuComponent } from './dungeonpages/helpmenu/helpmenu.component';
import { DungeonlistComponent } from './dungeonpages/dungeonlist/dungeonlist.component';
import { AhomeComponent } from './adminpages/ahome/ahome.component';
import { AddDiverComponent } from './adminpages/divAdmin/add-diver/add-diver.component';
import { EditDiverComponent } from './adminpages/divAdmin/edit-diver/edit-diver.component';
import { DiverListComponent } from './adminpages/divAdmin/diver-list/diver-list.component';
import { CreatorListComponent } from './adminpages/creAdmin/creator-list/creator-list.component';
import { AddCreatorComponent } from './adminpages/creAdmin/add-creator/add-creator.component';
import { EditCreatorComponent } from './adminpages/creAdmin/edit-creator/edit-creator.component';
import { UserListComponent } from './adminpages/useAdmin/user-list/user-list.component';
import { AddUserComponent } from './adminpages/useAdmin/add-user/add-user.component';
import { EditUserComponent } from './adminpages/useAdmin/edit-user/edit-user.component';
import { AddDungeonComponent } from './adminpages/dunAdmin/add-dungeon/add-dungeon.component';
import { EditDungeonComponent } from './adminpages/dunAdmin/edit-dungeon/edit-dungeon.component';
import { DungeonListComponent } from './adminpages/dunAdmin/dungeon-list/dungeon-list.component';
import { AcrawlerComponent } from './adminpages/dunAdmin/acrawler/acrawler.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { DungeonService } from './classes/dungeon.service';
import { UserService } from './classes/user.service';
import { AddCredentialsInterceptor } from './general/add-credentials.interceptor';
import { DiverGuard } from './userlog/diver.guard';
import { CreatorGuard } from './userlog/creator.guard';
import { AdminGuard } from './userlog/admin.guard';

@NgModule({
  declarations: [
    AppComponent,
    MinvalDirective,
    UserbarComponent,
    LoginComponent,
    DhomeComponent,
    DcrawlerComponent,
    DupgradesComponent,
    ChomeComponent,
    CcralwerComponent,
    CupgradesComponent,
    CeditorComponent,
    HelpmenuComponent,
    DungeonlistComponent,
    AhomeComponent,
    AddDiverComponent,
    EditDiverComponent,
    DiverListComponent,
    CreatorListComponent,
    AddCreatorComponent,
    EditCreatorComponent,
    UserListComponent,
    AddUserComponent,
    EditUserComponent,
    AddDungeonComponent,
    EditDungeonComponent,
    DungeonListComponent,
    AcrawlerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [DungeonService, UserService, DiverGuard, CreatorGuard, AdminGuard, [{provide: HTTP_INTERCEPTORS, useClass: AddCredentialsInterceptor, multi: true}]],
  bootstrap: [AppComponent],
  entryComponents: [HelpmenuComponent]
})
export class AppModule { }
