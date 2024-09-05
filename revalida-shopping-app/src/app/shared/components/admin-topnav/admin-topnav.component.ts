import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-topnav',
  templateUrl: './admin-topnav.component.html',
  styleUrl: './admin-topnav.component.scss'
})
export class AdminTopnavComponent implements OnInit {
  
  @Input('adminSidenavInput') adminSidenav: HTMLElement | undefined;

  constructor(private router: Router){}

  ngOnInit(): void {
    const sidebarToggle = document.querySelector('#sidebarToggle') as HTMLElement;
    console.log("sidenav: ", sidebarToggle);
    if(sidebarToggle) {
        // Uncomment the following block to persist sidebar toggle between refreshes
        // if(localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //   document.querySelector(".sb-nav-fixed")?.classList.toggle('sb-sidenav-toggled');
        // }

        sidebarToggle.addEventListener('click', (event) => {
          event.preventDefault();
          // Toggle the class to show/hide sidebar
          // document.querySelector(".sb-nav-fixed")?.classList.toggle('sb-sidenav-toggled');
          this.adminSidenav?.classList.toggle('sb-sidenav-toggled');
          // Persist the state in localStorage
          localStorage.setItem('sb|sidebar-toggle', this.adminSidenav?.classList.contains('sb-sidenav-toggled').toString() as string);
        })
    }
  }

  logOut = () => {
    sessionStorage.clear();
    this.router.navigate(['/auth/login'])
  }
}
