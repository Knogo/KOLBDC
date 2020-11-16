import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DiverListComponent } from './diver-list/diver-list.component';
import { DiverService } from './diver.service';
import { CreatorListComponent } from './creator-list/creator-list.component';
import { CreatorService } from './creator.service';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminService } from './admin.service';
import { DungeonListComponent } from './dungeon-list/dungeon-list.component';
import { DungeonService } from './dungeon.service';

@NgModule({
  declarations: [
    AppComponent,
    DiverListComponent,
    CreatorListComponent,
    AdminListComponent,
    DungeonListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [DiverService, CreatorService, AdminService, DungeonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
