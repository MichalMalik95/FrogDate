import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(public authService: AuthService, private alertify:AlertifyService, private router:Router) { }

  ngOnInit() {
  }
  login() {
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success("Pomyślnie zalogowałeś się na konto");
    },
      error => { this.alertify.error("Błąd logowania"); },
      ()=>{this.router.navigate(['/users'])}
    )
  };
  loggedIn(){
    return this.authService.loggedIn();
  };
  loggedOut(){
    localStorage.removeItem('token');
    this.alertify.message("Wylogowano~!");
    this.router.navigate(['/home']);
  };

}import { Router } from '@angular/router';

