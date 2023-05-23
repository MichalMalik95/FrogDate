import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private formBuilder: FormBuilder,
    private router:Router
  ) {}

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(10),
          ],
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(10),
          ],
        ],
        gender: ['female'],
        dayOfBirth: ['', Validators.required],
        zodiacSign: ['', Validators.required],
        city: ['', Validators.required],
        country: ['', Validators.required],
      },
      { validator: this.passswordMatchValidator }
    );
  }

  passswordMatchValidator(fg: AbstractControl) {
    return fg.get('password')?.value === fg.get('confirmPassword')?.value
      ? null
      : { missmatch: true };
  }

  register() {
    if (this.registerForm.valid) {

      this.user=Object.assign({},this.registerForm.value);


      this.authService.register(this.user).subscribe(
        () => {
          this.alertify.success('Register completed');
        },
        (error) => this.alertify.error('Register error'),
        ()=>{
          this.authService.login(this.user).subscribe(()=>{
            this.router.navigate(['/users']);
          })
        }
      );
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
