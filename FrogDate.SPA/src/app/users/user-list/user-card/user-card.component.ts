import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { Photo } from 'src/app/models/photo';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  @Input() user:User | any;

  constructor(private authService: AuthService, private userService: UserService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  sendLike(id:number){
      this.userService.sendLike(this.authService.decodedToken.nameid, id)
                      .subscribe( data => {
                        this.alertify.success("Now you like " + this.user.username + "<3");
                      }, error => {
                        this.alertify.error(error);
                      });
  }

}
