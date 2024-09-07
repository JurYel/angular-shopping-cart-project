import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from '../../../models/order.interface';
import { OrderService } from '../../services/order.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  adminName: string | undefined;
  orders$: Observable<Order[]>;
  checkedItems: number[] = [];
  badgeStyle: any;
  selectedOrder!: Order;
  searchQuery!: string;
  locationList: string[] = [];
  statusList: string[] = [];
  selectedLocation: string = "All";
  selectedStatus: string = "Any";

  constructor(
    private orderService: OrderService,
    private messageService: MessageService
  ) {
    this.adminName = `${sessionStorage.getItem(
      'first_name'
    )} ${sessionStorage.getItem('last_name')}`;

    this.orders$ = this.orderService.getOrders();
    this.badgeStyle = {
      Delivered: 'success',
      Pending: 'warning',
      Shipped: 'info',
      Cancelled: 'danger',
    };
  }

  ngOnInit(): void {
    // Access the sidebarToggle button
    const sidebarToggle = document.querySelector(
      '#sidebarToggle'
    ) as HTMLElement;

    if (sidebarToggle) {
      // Uncomment the following block to persist sidebar toggle between refreshes
      // if(localStorage.getItem('sb|sidebar-toggle') === 'true') {
      //   document.querySelector(".sb-nav-fixed")?.classList.toggle('sb-sidenav-toggled');
      // }

      sidebarToggle.addEventListener('click', (event) => {
        event.preventDefault();
        // Toggle the class to show/hide sidebar
        document
          .querySelector('.sb-nav-fixed')
          ?.classList.toggle('sb-sidenav-toggled');
        // Persist the state in localStorage
        localStorage.setItem(
          'sb|sidebar-toggle',
          document
            .querySelector('.sb-nav-fixed')
            ?.classList.contains('sb-sidenav-toggled')
            .toString() as string
        );
      });
    }

    // get list of unique locations
    this.orders$
      .pipe(
        map((orders) => [
          'All',
          ...new Set(orders.map((order) => order.location)),
        ])
      )
      .subscribe((locations) => {
        this.locationList = locations;
      });

    this.orders$.pipe(
      map(orders => [
        'Any',
        ...new Set(orders.map((order) => order.status)),
      ])
    ).subscribe(
      (statuses) => {
        this.statusList = statuses;
      }
    )

    this.filterLocation(this.selectedLocation);
    this.filterStatus(this.selectedStatus);
  }

  onCheck = (index: number) => {
    if (this.checkedItems.includes(index)) {
      this.checkedItems = this.checkedItems.filter((item) => item !== index);
    } else {
      this.checkedItems.push(index);
    }
  };

  viewOrderSummary = (index: number) => {
    this.orders$.pipe(map((orders) => orders[index])).subscribe((order) => {
      this.selectedOrder = order;
    });
  };

  updateOrderStatus = (index: number, status: string) => {
    this.orders$.pipe(map((orders) => orders[index])).subscribe((order) => {
      order.status = status;
      this.orderService.updateOrder(order as Order).subscribe(
        (response) => {
          console.log('Updated order status: ', response);
          this.orders$ = this.orderService.getOrders();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Updated order status',
          });
        },
        (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update order status',
          });
        }
      );
    });
  };

  searchOrder = (): void => {
    if (this.searchQuery) {
      this.orders$ = this.orderService
        .getOrders()
        .pipe(
          map((orders) =>
            orders.filter((order) =>
              order.item_name
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase())
            )
          )
        );
    } else {
      this.orders$ = this.orderService.getOrders();
    }
  };

  filterLocation = (location: string) => {
    
    this.orders$ = this.orderService.getOrders().pipe(
      map((orders) => {
        
        // If 'All' is selected, return the entire list of orders
        if(location === 'All'){
          return orders;
        }

        // Otherwise, filter the orders based on the selected location
        return orders.filter(order => order.location.toLowerCase().includes(location.toLowerCase()));
      })
    );
  };

  onLocationChange = (event: Event) => {

    const formSelect = event.target as HTMLSelectElement;
    const newLocation = formSelect.value;

    this.selectedLocation = newLocation;
    this.filterLocation(newLocation);
  }

  filterStatus = (status: string) => {

    this.orders$ = this.orderService.getOrders().pipe(
      map((orders) => {

        // If 'Any' is selected, return the entire list of orders
        if(status === 'Any'){
          return orders;
        }

        // Otherwise, filter the orders based on the selected status
        return orders.filter(order => order.status.toLowerCase().includes(status.toLowerCase()));
      })
    );
  }

  onStatusChange = (event: Event) => {

    const formSelect = event.target as HTMLSelectElement;
    const newStatus = formSelect.value;

    this.selectedStatus = newStatus;
    this.filterStatus(newStatus);
  }
}
