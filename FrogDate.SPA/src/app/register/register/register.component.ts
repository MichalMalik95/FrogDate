import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
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

  constructor(private authService:AuthService,private alertify:AlertifyService, private formBuilder:FormBuilder ) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm(){
    this.registerForm=this.formBuilder.group({
      username:['',Validators.required],
      password:['', [Validators.required,Validators.minLength(4),Validators.maxLength(10)]],
      confirmPassword:['', [Validators.required,Validators.minLength(4),Validators.maxLength(10)]],
      gender:['female'],
      dayOfBirth:['',Validators.required],
      zodiacSign:['',Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],
    }, {validator: this.passswordMatchValidator});
  }

  passswordMatchValidator(fg:AbstractControl){
    return fg.get('password')?.value === fg.get('confirmPassword')?.value ? null : {missmatch: true};
  }

  register(){
    console.log(this.registerForm.value);
    // this.authService.register(this.model).subscribe(()=>{this.alertify.success("Register completed");},error=>(this.alertify.error("Register error")))
  };

  cancel(){
    this.cancelRegister.emit(false);
  }
}
