import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../../../models/order.interface';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {

  adminName: string | undefined;
  orders$: Observable<Order[]>;
  checkedItems: number[] = [];

  constructor(private orderService: OrderService) {

    this.adminName = `${sessionStorage.getItem('first_name')} ${sessionStorage.getItem('last_name')}`;

    this.orders$ = this.orderService.getOrders();
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

  onCheck = (index: number) => {
    if(this.checkedItems.includes(index)) {
      this.checkedItems = this.checkedItems.filter(
        (item) => item !== index
      );
    } else {
      this.checkedItems.push(index);
    }
  }

  
}
