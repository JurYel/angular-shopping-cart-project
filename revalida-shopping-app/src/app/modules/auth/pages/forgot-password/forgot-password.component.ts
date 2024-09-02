import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  forgotPasswordForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
              private router: Router
  ) {
    this.forgotPasswordForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile_num: ['', [Validators.required, Validators.pattern(/^(9)\d{9}/), Validators.maxLength(10)]]
    });
  }

  get f() {
    return this.forgotPasswordForm.controls;
  }

  onSubmit = () => {
    this.submitted = true;

    if(this.forgotPasswordForm.invalid) {
      return;
    }
  }
}
