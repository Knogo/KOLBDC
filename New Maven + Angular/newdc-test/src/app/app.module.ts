import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DungeonlistComponent } from './dungeonlist/dungeonlist.component';
import { DungeonrunnerComponent } from './dungeonrunner/dungeonrunner.component';
import { HelpmenuComponent } from './dungeonrunner/helpmenu/helpmenu.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DungeonService } from './dungeon.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { UserService } from './user.service';
import { AddCredentialsInterceptor } from './add-credentials.interceptor';
import { FormsModule } from '@angular/forms';
import { AccountbarComponent } from './accountbar/accountbar.component';

@NgModule({
  declarations: [
    AppComponent,
    DungeonlistComponent,
    DungeonrunnerComponent,
    HelpmenuComponent,
    LoginComponent,
    AccountbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [DungeonService, UserService, [{provide: HTTP_INTERCEPTORS, useClass: AddCredentialsInterceptor, multi: true}]],
  bootstrap: [AppComponent],
  entryComponents: [HelpmenuComponent]
})
export class AppModule { }
