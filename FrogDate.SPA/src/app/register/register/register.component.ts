import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister=new EventEmitter();
  model:any={};

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  register(){
    this.authService.register(this.model).subscribe(()=>{console.log("Register completed");},error=>(console.log(error)))
  };
  cancel(){
    this.cancelRegister.emit(false);
    console.log("Canceled")
  }
}
