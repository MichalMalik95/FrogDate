import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() cancelRegister=new EventEmitter();
  model:any={};
  registerForm:FormGroup;

  constructor(private authService:AuthService,private alertify:AlertifyService ) { }

  ngOnInit() {
    this.registerForm=new FormGroup({
      username:new FormControl('Write your username here',Validators.required),
      password:new FormControl('Write your password here', [Validators.required,Validators.minLength(4),Validators.maxLength(10)]),
      confirmPassword:new FormControl('Confirm your password here', [Validators.required,Validators.minLength(4),Validators.maxLength(10)]),


    })
  }

  register(){
    console.log(this.registerForm.value);
    // this.authService.register(this.model).subscribe(()=>{this.alertify.success("Register completed");},error=>(this.alertify.error("Register error")))
  };
  cancel(){
    this.cancelRegister.emit(false);
  }
}
