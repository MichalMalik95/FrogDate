import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { RegisterComponent } from './register/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { UserService } from './_services/user.service';
import { UserListComponent } from './users/user-list/user-list.component';

@NgModule({
  declarations: [		
    AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      UserListComponent
   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
    
  ],
  providers: [AuthService, AlertifyService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
