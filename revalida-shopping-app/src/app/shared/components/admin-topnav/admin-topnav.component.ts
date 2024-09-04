import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-topnav',
  templateUrl: './admin-topnav.component.html',
  styleUrl: './admin-topnav.component.scss'
})
export class AdminTopnavComponent {

  constructor(private router: Router){}

  logOut = () => {
    sessionStorage.clear();
    this.router.navigate(['/auth/login'])
  }
}
