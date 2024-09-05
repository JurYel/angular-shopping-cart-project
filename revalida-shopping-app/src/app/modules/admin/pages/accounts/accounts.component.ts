import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Grid, h } from 'gridjs';
import 'gridjs/dist/theme/mermaid.css';
import { Observable } from 'rxjs';
import { AuthUser } from '../../../models/auth-user.interface';
import { AccountsService } from '../../services/accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent implements OnInit, AfterViewInit{

  @ViewChild('datatablesSimple', { static: false }) datatablesSimple!: ElementRef;
  adminSection: HTMLDivElement;
  accountsList$: Observable<AuthUser[]>;

  constructor(private accountsService: AccountsService) {
    this.adminSection = document.querySelector(".sb-nav-fixed") as HTMLDivElement;

    this.accountsList$ = this.accountsService.getAccounts();
    this.accountsList$.subscribe(
      data => console.log(data)
    );
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
            document.querySelector("#accountsTable")?.classList.toggle('table-adjusted');
            // Persist the state in localStorage
            localStorage.setItem('sb|sidebar-toggle', document.querySelector('.sb-nav-fixed')?.classList.contains('sb-sidenav-toggled').toString() as string);
          })
      }
  }

  ngAfterViewInit(): void {

    // new Grid({
    //     from: document.getElementById("myTable") as HTMLTableElement,
    //     columns: [
    //       "Name",
    //       "Position",
    //       {
    //         name: "Office",
    //         hidden: true,
    //         sort: false
    //       },
    //       "Age",
    //       "Salary",
    //       {
    //         name: 'Actions',
    //         formatter: (cell, row) => {
    //           // return html(`
    //           //   <button class="btn btn-sm btn-warning" (click)="editRow(row)"><i class="fa fa-pencil"></i> </button>
    //           //   <button class="btn btn-sm btn-danger (click)="deleteRow(row)"><i class="fa fa-trash"></i> </button>
    //           // `);
    //           return h('span', { className: 'btn-group' }, [
    //             h('button', {
    //               className: 'btn btn-sm btn-primary me-2',
    //               onClick: () => alert(`Editing: ${row.cells[0].data} ${row.cells[1].data}`)
    //             }, [
    //               // h('i', { className: 'fa fa-pencil' }),
    //               // h('img', { src: "assets/img/pencil-solid.svg", className: "btn-img" }),
    //               'Edit'
    //             ]),
    //             h('button', {
    //               className: 'btn btn-sm btn-danger',
    //               onClick: () => alert(`Deleting: ${row.cells[0].data} ${row.cells[1].data}`)
    //             }, [
    //               // h('i', { className: 'fa fa-trash' }),
    //               'Delete'
    //             ])
    //           ]);
    //         }
    //       }
    //     ],
    //     data: [
    //       ['Tiger Nixon', 'System Architect', 61, '2011/04/25', '$320,800'],
    //       ['Garrett Winters', 'Accountant', 63, '2011/07/25', '$170,750'],
    //       ['Ashton Cox', 'Junior Technical Author', 66, '2009/01/12', '$86,000'],
    //       ['Cedric Kelly', 'Senior Javascript Developer',  22, '2012/03/29', '$433,060'],
    //       ['Airi Satou', 'Accountant', 33, '2008/11/28', '$162,700'],
    //       ['Brielle Williamson', 'Integration Specialist', 61, '2012/12/02', '$372,000'],
    //       ['Herrod Chandler', 'Sales Assistant',  59, '2012/08/06', '$137,500'],
    //       ['Rhona Davidson', 'Integration Specialist', 55, '2010/10/14', '$327,900'],
    //       ['Colleen Hurst', 'Javascript Developer', 39, '2009/09/15', '$205,500'],
    //       ['Sonya Frost', 'Software Engineer', 23, '2008/12/13', '$103,600'],
    //     ],
    //     search: true,
    //     pagination: true,
    //     sort: true,
    //     resizable: false,
    //     language: {
    //       'search': {
    //         'placeholder': '🔍 Search...'
    //       },
    //       'pagination': {
    //         'previous': '⬅️',
    //         'next': '➡️',
    //         'showing': '😃 Displaying',
    //         'results': () => 'Records'
    //       }
    //     }
    //   }).render(document.getElementById('myProductsTable') as HTMLDivElement);
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
