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
  
  // variables for pagination
  paginatedOrders$!: Observable<Order[]>;
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  pageNumbers: number[] = [];
  availablePageSizes: number[] = [5, 10, 15, 20];
  totalLength: number = 0;
  currentPageLength: number = 0;

  // for checkbox items
  checkedItems: number[] = [];
  // for status badges
  badgeStyle: any;

  // for filters
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
    this.orders$.subscribe(
      data => console.log(data)
    );
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

    // get list of unique statuses
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

    // upon init, initialized the filters
    this.filterLocation(this.selectedLocation);
    this.filterStatus(this.selectedStatus);

    // calculate total number of pages based on the data
    this.orders$.subscribe(orders => {
      this.totalLength = orders.length;
      this.updatePagination(orders);
    });

    // Initially show the first page of data
    this.paginateOrders();
  }

  // Method to generate page numbers from totalPages
  generatePageNumbers = () => {
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updatePagination(orders: Order[]){
    this.totalPages = Math.ceil(orders.length / this.pageSize);
    this.generatePageNumbers();
    // this.paginateOrders();
  }

  // Method to paginate orders based on the current page
  paginateOrders = () => {
    this.paginatedOrders$ = this.orders$
      .pipe(
        map(orders => {
          const startIndex = (this.currentPage - 1) * this.pageSize;
          const endIndex = Math.min(startIndex + this.pageSize, orders.length); // Ensure we don't exceed the total length of the orders
          this.currentPageLength += endIndex - this.currentPageLength;
          return orders.slice(startIndex, endIndex);
        })
      );
  }

  // Method to go to next page
  nextPage = () => {
    if(this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateOrders();
    }
  }

  // Method to go to previous page
  prevPage = () => {
    if(this.currentPage > 1) {
      this.currentPage--;
      this.paginateOrders();
    }
  }

  // Method to go to a specific page
  gotoPage = (page: number) => {
    this.currentPage = page;
    this.paginateOrders();
  }

  // Method to update the pageSize and reset pagination when a new page size is selected
  onPageSizeChange = (event: Event) => {
    const pageSizeSelect = event.target as HTMLSelectElement;
    this.pageSize = parseInt(pageSizeSelect.value); // Get selected page from dropdown
    this.currentPage = 1 // Reset to the first page
    this.orders$.subscribe(orders => {
      this.updatePagination(orders);
      this.paginateOrders();
    });
  }

  // Get checked items
  onCheck = (index: number) => {
    if (this.checkedItems.includes(index)) {
      this.checkedItems = this.checkedItems.filter((item) => item !== index);
    } else {
      this.checkedItems.push(index);
    }
  };

  // Method for populating Order Summary modal
  viewOrderSummary = (index: number) => {
    this.paginatedOrders$.pipe(map((orders) => orders[index])).subscribe((order) => {
      this.selectedOrder = order;
    });
  };

  // Method for updating order status
  updateOrderStatus = (index: number, status: string) => {
    this.orders$.pipe(map((orders) => orders[index])).subscribe((order) => {
      order.status = status;
      this.orderService.updateOrder(order as Order).subscribe(
        (response) => {
          console.log('Updated order status: ', response);
          this.orders$ = this.orderService.getOrders();
          // this.paginateOrders();
          this.searchOrder();
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

  // Method for searchiing orders
  searchOrder = (): void => {
    if (this.searchQuery) {
      this.orders$ = this.orderService
        .getOrders()
        .pipe(
          map((orders) =>
            orders.filter((order) =>
              order.item_name
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase()) ||
              order.customer
                .toLowerCase()
                .includes(this.searchQuery.toLowerCase())
            )
          )
        );
    } else {
      this.orders$ = this.orderService.getOrders();
    }

    this.paginateOrders();
  };


  // Method for filtering location
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

    this.paginateOrders();
  };

  // Method for capturing location select change
  onLocationChange = (event: Event) => {

    const formSelect = event.target as HTMLSelectElement;
    const newLocation = formSelect.value;

    this.selectedLocation = newLocation;
    this.filterLocation(newLocation);
  }

  // Method for filtering status
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

    this.paginateOrders();
  }

  // Method for capturing Status select change
  onStatusChange = (event: Event) => {

    const formSelect = event.target as HTMLSelectElement;
    const newStatus = formSelect.value;

    this.selectedStatus = newStatus;
    this.filterStatus(newStatus);
  }

  refreshOrdersTable = () => {
    this.orders$ = this.orderService.getOrders();
    this.searchOrder();
  }
}
