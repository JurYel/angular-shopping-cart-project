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

       // Initialize Grid.js on the existing HTML table
       
      // new Grid({
      //   search: true,
      //   pagination: true,
      //   sort: true,
      //   language: {
      //     'search': {
      //       'placeholder': 'Search...'
      //     },
      //     'pagination': {
      //       'previous': '‹',
      //       'next': '›',
      //       'showing': 'Showing',
      //       'results': () => 'entries'
      //     }
      //   }
      // }).render(document.getElementById("productsTable") as HTMLDivElement);

      // new Grid({
      //   columns: [
      //     'Name', 
      //     'Position', 
      //     'Office', 
      //     'Age', 
      //     'Start date', 
      //     'Salary',
      //     {
      //       name: 'Actions',
      //       formatter: (cell, row) => {
      //         return h('div', { className: 'btn-group' }, [
      //           h('button', {
      //             className: 'btn btn-sm btn-primary me-1',
      //             onClick: () => this.editRow(row)
      //           }, [
      //             h('i', { className: 'fa fa-pencil' }),
      //             ' Edit'
      //           ]),
      //           h('button', {
      //             className: 'btn btn-sm btn-danger',
      //             onClick: () => this.deleteRow(row)
      //           }, [
      //             h('i', { className: 'fa fa-trash' }),
      //             ' Delete'
      //           ])
      //         ]);
      //       }
      //     }
      //   ],
      //   data: [
      //     ['Tiger Nixon', 'System Architect', 'Edinburgh', 61, '2011/04/25', '$320,800'],
      //     ['Garrett Winters', 'Accountant', 'Tokyo', 63, '2011/07/25', '$170,750'],
      //     ['Ashton Cox', 'Junior Technical Author', 'San Francisco', 66, '2009/01/12', '$86,000'],
      //     ['Cedric Kelly', 'Senior Javascript Developer', 'Edinburgh', 22, '2012/03/29', '$433,060'],
      //     ['Airi Satou', 'Accountant', 'Tokyo', 33, '2008/11/28', '$162,700'],
      //     ['Brielle Williamson', 'Integration Specialist', 'New York', 61, '2012/12/02', '$372,000'],
      //     ['Herrod Chandler', 'Sales Assistant', 'San Francisco', 59, '2012/08/06', '$137,500'],
      //     ['Rhona Davidson', 'Integration Specialist', 'Tokyo', 55, '2010/10/14', '$327,900'],
      //     ['Colleen Hurst', 'Javascript Developer', 'San Francisco', 39, '2009/09/15', '$205,500'],
      //     ['Sonya Frost', 'Software Engineer', 'Edinburgh', 23, '2008/12/13', '$103,600'],
      //   ],
      //   search: true,
      //   pagination: {
      //     limit: 10,
      //   },
      //   sort: true,
      //   language: {
      //     'search': {
      //       'placeholder': 'Search...'
      //     },
      //     'pagination': {
      //       'previous': '‹',
      //       'next': '›',
      //       'showing': 'Showing',
      //       'results': () => 'entries'
      //     }
      //   }
      // }).render(document.getElementById('productsTable') as HTMLElement);
  }

  ngAfterViewInit(): void {
    new Grid({
      from: document.getElementById("myTable") as HTMLTableElement,
      search: true,
      pagination: true,
      sort: true,
      resizable: true,
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
