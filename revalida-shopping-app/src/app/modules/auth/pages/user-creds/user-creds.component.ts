import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-user-creds',
  templateUrl: './user-creds.component.html',
  styleUrl: './user-creds.component.scss'
})
export class UserCredsComponent implements OnInit{

  userCredsForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService
  ) {
    this.userCredsForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      mobile_num: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

 ngOnInit(): void {
     this.userCredsForm.disable();

     this.route.queryParams.subscribe(params => {
      console.log(params['user']);

      this.authService.getUserByUsername(params['user'] as string).subscribe(
        response => {
          if(response.length > 0) {
            this.userCredsForm.patchValue({username: response[0].username})
            this.userCredsForm.patchValue({email: response[0].email})
            this.userCredsForm.patchValue({mobile_num: response[0].mobile_num})
            this.userCredsForm.patchValue({password: response[0].password})
          }
        }
      );
     });
 }
}
