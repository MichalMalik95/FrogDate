import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  jwthelper=new JwtHelperService();

constructor(private authService:AuthService){}

  ngOnInit(): void {
   const token= localStorage.getItem('token');
   const user:User  = JSON.parse(localStorage.getItem('user') || '{}');
   if(token){
    this.authService.decodedToken=this.jwthelper.decodeToken(token);
   }
   if(user){
    this.authService.currentUser=user;
    this.authService.changeUserPhoto(user.photoUrl ?? '../assets/User_Icon.PNG');
   }
  }

}
