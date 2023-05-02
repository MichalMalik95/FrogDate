import { Component } from "@angular/core";
import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home/home.component";
import { UserListComponent } from "./users/user-list/user-list.component";
import { LikesComponent } from "./likes/likes.component";
import { MessagesComponent } from "./messages/messages.component";
import { AuthGuard } from "./guards/auth.guard";
import { UserDetailComponent } from "./users/user-list/user-detail/user-detail.component";
import { UserDetailResolver } from "./_resolvers/user-detail.resolver";
import { UserListResolver } from "./_resolvers/user-list.resolver";
import { UserEditComponent } from "./users/user-list/user-edit/user-edit.component";
import { UserEditResolver } from "./_resolvers/user-edit.resolver";
import { PreventUnsavedChanges } from "./guards/prevent-unsaved-changes.guard";

export const appRoutes:Routes=[
    {path: 'home', component:HomeComponent},
    {path:'',
runGuardsAndResolvers:'always',
canActivate: [AuthGuard],
children: [
    {path: 'users', component:UserListComponent, resolve:{users:UserListResolver}},
    {path: 'users/:id', component:UserDetailComponent, resolve:{user:UserDetailResolver}},
    {path: 'edit', component:UserEditComponent,
                   resolve:{user:UserEditResolver},
                   canDeactivate:[PreventUnsavedChanges]},
    {path: 'liked', component:LikesComponent},
    {path: 'messages', component:MessagesComponent},
]},
    {path: '***', redirectTo:'home',pathMatch:'full'},

];

