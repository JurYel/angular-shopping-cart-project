import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {

  forgotPasswordForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private messageService: MessageService
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
    const { username, email, mobile_num } = this.forgotPasswordForm.getRawValue();

    if(this.forgotPasswordForm.invalid) {
      return;
    }

    this.authService.getUserByUsername(username as string).subscribe(
      response => {
        if(response.length > 0 && 
          response[0].email === email &&
          response[0].mobile_num === mobile_num) {
            sessionStorage.setItem('username', username as string);
            this.router.navigate(['/auth/user-creds'], 
              { queryParams: {user: username} }) // reveal password to user
            // or send an email and sms to user with the user's password.
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid email or mobile number' })
          }
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Username does not exist' })
      }
    )
  }
}
