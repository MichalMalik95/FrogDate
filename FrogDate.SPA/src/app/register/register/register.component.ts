import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() valuesFromHome:any;
  @Output() cancelRegister=new EventEmitter();
  model:any={};

  constructor() { }

  ngOnInit() {
  }

  register(){
    console.log(this.model);
  }
  cancel(){
    this.cancelRegister.emit(false);
    console.log("Canceled")
  }
}
