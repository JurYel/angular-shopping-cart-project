import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Grid, h } from 'gridjs';
import 'gridjs/dist/theme/mermaid.css';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, AfterViewInit {

  adminSection: HTMLDivElement;
  sideToggleBtn: HTMLElement;

  constructor() {
    this.adminSection = document.querySelector(".sb-nav-fixed") as HTMLDivElement;
    this.sideToggleBtn = document.querySelector('#sidebarToggle') as HTMLElement;
    console.log(this.adminSection)
  }

  ngOnInit(): void {
      // Access the sidebarToggle button
      const sidebarToggle = document.querySelector('#sidebarToggle') as HTMLElement;

      if(sidebarToggle) {
          // Uncomment the following block to persist sidebar toggle between refreshes
          // if(localStorage.getItem('sb|sidebar-toggle') === 'true') {
          //   document.querySelector(".sb-nav-fixed")?.classList.toggle('sb-sidenav-toggled');
          // }

          sidebarToggle.addEventListener('click', (event) => {
            event.preventDefault();
            // Toggle the class to show/hide sidebar
            document.querySelector(".sb-nav-fixed")?.classList.toggle('sb-sidenav-toggled');
            // Persist the state in localStorage
            localStorage.setItem('sb|sidebar-toggle', document.querySelector('.sb-nav-fixed')?.classList.contains('sb-sidenav-toggled').toString() as string);
          })
      }

  }

  ngAfterViewInit(): void {
    new Grid({
      from: document.getElementById("myTable") as HTMLTableElement,
      columns: [
        {
          name: "Office",
          hidden: true,
          sort: false
        }
      ],
      search: true,
      pagination: true,
      sort: true,
      resizable: false,
      language: {
        'search': {
          'placeholder': '🔍 Search...'
        },
        'pagination': {
          'previous': '⬅️',
          'next': '➡️',
          'showing': '😃 Displaying',
          'results': () => 'Records'
        }
      }
    }).render(document.getElementById('myProductsTable') as HTMLDivElement);
  }

  editRow(row: any) {
    alert(`Edit row with Name: ${row.cells[0].data}`);
    // Implement your edit logic here
  }

  deleteRow(row: any) {
    if (confirm(`Are you sure you want to delete ${row.cells[0].data}?`)) {
      alert(`Deleted row with Name: ${row.cells[0].data}`);
      // Implement your delete logic here
    }
  }
}
