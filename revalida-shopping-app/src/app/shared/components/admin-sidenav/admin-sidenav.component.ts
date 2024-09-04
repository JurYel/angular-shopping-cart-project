import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-sidenav',
  templateUrl: './admin-sidenav.component.html',
  styleUrl: './admin-sidenav.component.scss'
})
export class AdminSidenavComponent implements OnInit {

  @Input('adminSidenavInput') adminSidenav: HTMLBodyElement | undefined;
  @Input('sidebarToggleInput') sidebarToggleBtn: HTMLElement | undefined;

  ngOnInit(): void {
    // Access the sidebarToggle button
    // const sidebarToggle = document.querySelector('#sidebarToggle') as HTMLElement;
    const sidebarToggle = this.sidebarToggleBtn;
    
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

}
