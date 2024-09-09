import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Input('itemCountInput') cartItemsCount: number | undefined;

  constructor(private router: Router) {}

  logOut = () => {
    sessionStorage.clear();
    this.router.navigate(['/auth/login'])
  }
}
