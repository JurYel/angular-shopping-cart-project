import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../../../../shared/validators/password-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
              private router: Router
  ) {
    this.registerForm = this.fb.group({
      // Validators.patterns(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/) full name regex
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required], // check if username already exists -> create fn in backend for checking username -> use it in validator
      email: ['', [Validators.required, Validators.email]],
      is_admin: [false],
      mobile_num: ['', [Validators.required, Validators.pattern(/^(9)\d{9}/), Validators.maxLength(10)]], // add regex validation for mobile num
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    }, {
      validators: passwordMatchValidator
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit = () => {
    this.submitted = true;
    
    if(this.registerForm.invalid) {
      return;
    }
  }
}
