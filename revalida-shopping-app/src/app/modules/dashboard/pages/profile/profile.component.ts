import { AfterViewChecked, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { MessageService } from 'primeng/api';
import { UniqueUsernameValidator } from '../../../../shared/validators/unique-username.validator';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, AfterViewChecked {
  isSubMenuVisible = false;
  profileForm: FormGroup;
  username: string | null;
  userExists = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private usernameValidator: UniqueUsernameValidator
  ) {
    this.profileForm = this.fb.group({
      username: ['', []],
      first_name: [''],
      last_name: [''],
      email: [''],
      mobile_num: [
        '',
        [Validators.pattern(/^(9)\d{9}/), Validators.maxLength(10)],
      ],
      gender: [''],
      birthdate: [''],
    });

    this.username = sessionStorage.getItem('username');
  }

  ngOnInit(): void {
    this.authService
      .getUserByUsername(this.username as string)
      .subscribe((response) => {
        if (response.length > 0) {
          this.profileForm.patchValue({ username: response[0].username });
          this.profileForm.patchValue({ first_name: response[0].first_name });
          this.profileForm.patchValue({ last_name: response[0].last_name });
          this.profileForm.patchValue({ email: response[0].email });
          this.profileForm.patchValue({ mobile_num: response[0].mobile_num });

          if (this.profileForm.get('username')?.value === this.username) {
            this.userExists = true;
            console.log('onInit: ', this.userExists);
          }
        }
      });

    // Constructor is loaded first before ngOnInit hence the addition of validator here
    this.profileForm.get('username')?.addAsyncValidators(this.isUsernameTaken());
  }

  ngAfterViewChecked(): void {}

  get f() {
    return this.profileForm.controls;
  }

  get usernameAlreadyTaken() {
    return this.f['username'].hasError('usernameExists');
  }

  // can remove this now, updated function below
  isUsernameUnique = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {
    // const usernameValue = this.safetyCheck( () => this.f['username'].value);
    // ERROR HERE
    if (this.userExists) {
      console.log('isUsernmaeUnique: ', this.userExists);
      return this.usernameValidator
        .checkIfUsernameUnique(control.value)
        .pipe(
          map((response: boolean) =>
            response ? { usernameExists: true } : null
          )
        );
    }

    return of(null);

    // return this.usernameValidator
    //               .checkIfUsernameUnique(control.value)
    //                 .pipe(
    //                   map((response: boolean) => response ? { usernameExists: true} : null)
    //                 );
  };

  isUsernameTaken = (): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.usernameValidator.checkIfUsernameUnique(control.value).pipe(
        map((response: boolean) => {
          if (control.value !== this.username) {
            return response ? { usernameExists: true } : null;
          }
          return null;
        })
      );
    };
  };

  toggleSubmenu = (): void => {
    this.isSubMenuVisible = !this.isSubMenuVisible;
  };

  onSubmit = () => {

  };
}
