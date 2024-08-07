import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Patterns } from '../../helper/validation-patterns';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TOKEN_STORAGE_KEY, USER_DETAILS } from '../../common/common-const';
import { RequestI } from '../../interface/common.interface';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private email: string = 'admin@yopmail.com';
  private password: string = '12345678';
  private rememberMe: boolean = true;
  private token: string = 'sjdfsdfh438394hfwefhwlk20944535024u5025jjsfelkj';

  constructor(public router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(Patterns.email),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }

  // Method to check if a form control is invalid and has been touched or is dirty
  isControlInvalid(controlName: string): boolean | undefined {
    const control = this.loginForm.get(controlName);
    return control?.invalid && (control.dirty || control.touched);
  }

  ngOnInit(): void {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) {
      this.router.navigate(['/admin/user']);
    }
  }

  login() {
    console.log('ddfdf');
    if (this.loginForm.invalid) {
      console.log(this.loginForm.valid);
      return;
    }

    const payload: RequestI = {
      data: {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
      },
    };

    // dummy data
    if (
      payload.data.email === this.email &&
      payload.data.password === this.password
    ) {
      localStorage.setItem(TOKEN_STORAGE_KEY, this.token);
      localStorage.setItem(USER_DETAILS, JSON.stringify(payload.data));
      this.router.navigate(['/admin/user']);
    } else {
      alert('Invalid email or password');
    }
  }
}
