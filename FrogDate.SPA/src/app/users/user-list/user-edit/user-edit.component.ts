import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user:User|any;
  photoUrl:string;

  @ViewChild('editForm') editForm:NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event:any){
    if(this.editForm.dirty){
      $event.returnValue=true;
    }

  };

  constructor(private route:ActivatedRoute,
              private alertify:AlertifyService,
              private userService:UserService,
              private authService:AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.user=data['user'];
    });
    this.authService.currentPhotoUr.subscribe(photoUrl=>this.photoUrl=photoUrl);
  }
  updateUser(){
    this.userService.updateUser(this.authService.decodedToken.nameid,this.user)
    .subscribe(next=>{
      this.alertify.success("Profile updated");
      this.editForm.reset(this.user);
    }, error=>{this.alertify.error(error);
    });

  }
  updateMainPhoto(photoUrl:string){
    this.user.photoUrl=photoUrl;
  }

}
