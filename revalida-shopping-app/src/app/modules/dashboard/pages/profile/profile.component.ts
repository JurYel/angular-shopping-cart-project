import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  isSubMenuVisible = false;
  profileForm: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private messageService: MessageService
  ) {
    
    this.profileForm = this.fb.group({
      username: [''],
      first_name: [''],
      last_name: [''],
      email: [''],
      mobile_num: ['', [Validators.pattern(/^(9)\d{9}/), Validators.maxLength(10)]],
      gender: [''],
      birthdate: ['']
    });
  }

  ngOnInit(): void {
      const username = sessionStorage.getItem('username');

      this.authService.getUserByUsername(username as string).subscribe(
        response => {
          if(response.length > 0) {
            this.profileForm.patchValue({username: response[0].username});
            this.profileForm.patchValue({first_name: response[0].first_name});
            this.profileForm.patchValue({last_name: response[0].last_name});
            this.profileForm.patchValue({email: response[0].email});
            this.profileForm.patchValue({mobile_num: response[0].mobile_num});
          }
        }
      )
  }

  onSubmit = () => {
    
  }

  toggleSubmenu = (): void => {
    this.isSubMenuVisible = !this.isSubMenuVisible;
  }
}
