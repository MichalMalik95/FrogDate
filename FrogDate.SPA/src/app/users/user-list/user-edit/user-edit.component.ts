import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user:User|any;
  @ViewChild('editForm') editForm:NgForm;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event:any){
    if(this.editForm.dirty){
      $event.returnValue=true;
    }

  };

  constructor(private route:ActivatedRoute, private alertify:AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.user=data['user'];
    });
  }
  updateUser(){
    console.log(this.user);
    this.alertify.success("Profile updated");
    this.editForm.reset(this.user);
  }

}
