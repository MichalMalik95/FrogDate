import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { RegisterComponent } from './register/register/register.component';
import { HomeComponent } from './home/home/home.component';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { UserService } from './_services/user.service';
import { UserListComponent } from './users/user-list/user-list.component';
import { LikesComponent } from './likes/likes.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { UserCardComponent } from './users/user-list/user-card/user-card.component';
import { UserDetailComponent } from './users/user-list/user-detail/user-detail.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UserDetailResolver } from './_resolvers/user-detail.resolver';
import { UserListResolver } from './_resolvers/user-list.resolver';
import { GalleryModule } from 'ng-gallery';
import { UserEditComponent } from './users/user-list/user-edit/user-edit.component';
import { UserEditResolver } from './_resolvers/user-edit.resolver';
import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes.guard';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { PhotosComponent } from './users/photos/photos.component';
import { FileUploadModule } from 'ng2-file-upload';
import { TimeAgoPipe } from './_pipes/time-ago-pipe';
import { PaginationModule,PaginationConfig } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [
    AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      UserListComponent,
      LikesComponent,
      MessagesComponent,
      UserCardComponent,
      UserDetailComponent,
      UserEditComponent,
      PhotosComponent,
      TimeAgoPipe

   ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    GalleryModule,
    GalleryModule.withConfig({  }),
    ReactiveFormsModule,
    FileUploadModule,
    PaginationModule.forRoot(),


  ],
  providers: [
    AuthService,
    AlertifyService,
    UserService,
    AuthGuard,
    UserDetailResolver,
    UserListResolver,
    UserEditResolver,
    PreventUnsavedChanges,
    ErrorInterceptorProvider,
    PaginationConfig],
  bootstrap: [AppComponent]
})
export class AppModule { }
