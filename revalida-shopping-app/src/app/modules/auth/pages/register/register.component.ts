import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../../../../shared/validators/password-match.validator';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { AuthUser } from '../../../models/auth-user.interface';
import { UniqueUsernameValidator } from '../../../../shared/validators/unique-username.validator';
import { map } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registerForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private authService: AuthService,
              private messageService: MessageService,
              private usernameValidator: UniqueUsernameValidator
  ) {
    this.registerForm = this.fb.group({
      // Validators.patterns(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/) full name regex
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', [Validators.required], this.usernameIsUnique.bind(this)], // check if username already exists -> create fn in backend for checking username -> use it in validator
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

  get usernameAlreadyTaken() {
    return this.f['username'].hasError('usernameExists');
            // && this.registerForm.get('username')?.touched;
  }

  usernameIsUnique = (control: AbstractControl) => {
    return this.usernameValidator
                  .checkIfUsernameUnique(control.value)
                    .pipe(
                      map((response: boolean) => response ? { usernameExists: true} : null)
                    );
  }

  onSubmit = () => {
    this.submitted = true;
    const postData = {...this.registerForm.getRawValue()};
    delete postData.confirm_password; // do not need to pass confirm_password to backend

    if(this.registerForm.invalid) {
      return;
    }

    // check if username already exists (must be unique)
    this.authService.checkIfUsernameExists(postData['username'] as string).subscribe(
      exists => {
        if(!exists) {

          this.authService.registerUser(postData as AuthUser).subscribe(
            response => {
              console.log("Registered user: ", response);
              this.messageService.add({ severity:'success', summary: 'Success', detail: 'Registered successfully!' });
              this.router.navigate(['/auth/login']);
            },
            error => {
              console.log("Error Registration: ", error);
              this.messageService.add({ severity:'error', summary: 'Error', detail: 'Error registering user' });
            }
          )
        } else {
          this.messageService.add({ severity:'error', summary: 'Error', detail: 'Username already exists' });
        }
      }
    ); 
  }
}
