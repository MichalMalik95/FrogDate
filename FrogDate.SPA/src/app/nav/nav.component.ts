import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true }}]
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public authService: AuthService, private alertify:AlertifyService, private router:Router) { }

  ngOnInit() {
  }
  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success("Logged in");
    },
      (error:HttpErrorResponse) => { 
        this.alertify.error(error.error); },
      ()=>{this.router.navigate(['/users'])}
    )
  };
  loggedIn(){
    return this.authService.loggedIn();
  };
  loggedOut(){
    localStorage.removeItem('token');
    this.alertify.message("Logged out~!");
    this.router.navigate(['/home']);
  };

}

