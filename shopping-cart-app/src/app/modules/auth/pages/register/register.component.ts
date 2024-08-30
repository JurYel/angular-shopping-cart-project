import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
              private router: Router
  ) {
    this.registerForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile_num: ['', Validators.required], // add regex validation for mobile num
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
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
