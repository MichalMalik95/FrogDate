import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() valuesFromHome:any;
  model:any={};

  constructor() { }

  ngOnInit() {
  }

  register(){
    console.log(this.model);
  }
  cancel(){
    console.log("Canceled")
  }
}
