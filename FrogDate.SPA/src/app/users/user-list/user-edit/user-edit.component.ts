import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user:User|any;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data=>{
      this.user=data['user'];
    });
  }

}
