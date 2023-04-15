import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users:User[]=[];

  constructor(private userService: UserService, private alertify:AlertifyService) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser(){
    this.userService.getUsers().subscribe((users:User[])=>{
      this.users=users;
    },error=>{
      this.alertify.error(error);
    });

  }
}
