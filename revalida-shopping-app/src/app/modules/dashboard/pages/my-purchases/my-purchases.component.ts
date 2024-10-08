import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from '../../../models/order.interface';
import { OrderService } from '../../../admin/services/order.service';
import { MessageService } from 'primeng/api';
import { S3UploadService } from '../../services/s3-upload.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-my-purchases',
  templateUrl: './my-purchases.component.html',
  styleUrl: './my-purchases.component.scss'
})
export class MyPurchasesComponent implements OnInit {

  customerUsername: string;
  customerName: string;
  myOrders$: Observable<Order[]>;
  ordersLength: number = 0;
  isSubMenuVisible = false;
  cartItemCount: number = 0;

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
  truncatedOrders: any[] = [];

  // s3 variables
  s3Folder: string;
  imageUrls: string[] = [];
  profileDefaultImg: string;
  savedImageUrl: string;

  constructor(private orderService: OrderService,
              private messageService: MessageService,
              private awsS3Service: S3UploadService,
              private cartService: CartService
  ) {

    this.customerUsername = sessionStorage.getItem('username') as string;
    this.customerName = `${sessionStorage.getItem('first_name')} ${sessionStorage.getItem('last_name')}`;
    this.myOrders$ = this.orderService.getOrdersByUsername(this.customerUsername.trim()).pipe(
      map(orders => orders.filter(order => order.username.toLowerCase().trim() === this.customerUsername.toLowerCase().trim()))
    );
    // this.cartItemCount = parseInt(sessionStorage.getItem('cartItemCount') as string);

    this.cartService.getCartItems(this.customerUsername).subscribe(
      items => {
        if(items.length > 0) {
          this.cartItemCount = items[0].item_name.length;
        }
      }
    )

    this.s3Folder = "assets/users";
    this.profileDefaultImg = `${this.s3Folder}/default_profile_img-100.png`;
    this.savedImageUrl = `${this.s3Folder}/default_profile_img-100.png`;

    this.myOrders$.pipe(
      map(orders => orders.filter(order => order.username.trim().toLowerCase() === this.customerUsername.toLowerCase().trim()))
    ).subscribe(
      orders => {
        this.ordersLength = orders.length;
        console.log(orders)
        this.pageSize = (this.ordersLength > 5)? 5 : this.ordersLength;
        this.totalLength = this.ordersLength;
        orders.forEach(async (order) => {
          if(order.item_name.length > 1) {
            // this.truncatedOrders.push({
            //   item_name: order.item_name.slice(0, 3).push('...'),
            //   quantity: order.quantity.slice(0, 3).map((qty)),
            //   subtotal: order.subtotal.slice(0, 3).push('...')
            // });
            this.truncatedOrders.push({
               // For string arrays, directly append '...'
              item_name: [...order.item_name.slice(0, 1), '...'], 
               // Convert numbers to strings and append '...'
              quantity: [...order.quantity.slice(0, 1).map(qty => qty.toString()), '...'],
              // Same for subtotal, convert to strings and append '...'
              subtotal: [...order.subtotal.slice(0, 1).map(sub => sub.toString()), '...']
            });
          } else {
            this.truncatedOrders.push({
               // For string arrays, directly append '...'
             item_name: order.item_name, 
             // Convert numbers to strings and append '...'
            quantity: order.quantity,
            // Same for subtotal, convert to strings and append '...'
            subtotal: order.subtotal
            });
          }

          this.savedImageUrl = await this.awsS3Service.getSignedUrl(`${this.s3Folder}/${order.customer_img}`);
          this.imageUrls.push(await this.awsS3Service.getSignedUrl(`${this.s3Folder}/${order.customer_img}`));
          console.log(order.customer_img);
        })
      }
    );

    this.badgeStyle = {
      Delivered: 'success',
      Pending: 'warning',
      Shipped: 'info',
      Cancelled: 'danger',
    };
  }

  ngOnInit(): void {
      
    // get list of unique locations
    this.myOrders$
      .pipe(
        map((orders) => [
          'All',
          ...new Set(orders.map((order) => order.location)),
        ])
      ).subscribe((locations) => {
        this.locationList = locations;
      });

    // get list of unique statuses
    this.myOrders$.pipe(
      map(orders => [
        'Any',
        ...new Set(orders.map((order) => order.status)),
      ])
    ).subscribe(
      (statuses) => {
        this.statusList = statuses;
      }
    );

    // upon init, initialized the filters
    this.filterLocation(this.selectedLocation);
    this.filterStatus(this.selectedStatus);

    // calculate total number of pages based on the data
    this.myOrders$.pipe(
      map(orders => orders.filter(order => order.username.toLowerCase().trim() === this.customerUsername.toLowerCase().trim()))
    ).subscribe(orders => {
      this.totalLength = orders.length;
      this.updatePagination(orders);

      orders.forEach(async (order) => {
        this.savedImageUrl = await this.awsS3Service.getSignedUrl(`${this.s3Folder}/${order.customer_img}`);
      });
    });

    // Initially show the first page of data
    this.paginateOrders();
  }

  toggleSubmenu = (): void => {
    this.isSubMenuVisible = !this.isSubMenuVisible;
  }

  // Method to generate page numbers from totalPages
  generatePageNumbers = () => {
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

   // Method for updating pagination upon selecting shown entries limit
   updatePagination(orders: Order[]){
    this.totalPages = Math.ceil(orders.length / this.pageSize);
    this.generatePageNumbers();
    // this.paginateOrders();
  }

  // Method to paginate orders based on the current page
  paginateOrders = () => {
    this.paginatedOrders$ = this.myOrders$
      .pipe(
        map(orders => {
          const myOrders = orders.filter(order => order.username.toLowerCase().trim() === this.customerUsername.toLowerCase().trim());
          const startIndex = (this.currentPage - 1) * this.pageSize;
          const endIndex = Math.min(startIndex + this.pageSize, orders.length); // Ensure we dont exeed the total length of the orders
          this.currentPageLength += endIndex - this.currentPageLength;

          console.log("paginatedOrders: ", myOrders.slice(startIndex, endIndex));
          return myOrders.slice(startIndex, endIndex);
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
    this.pageSize = parseInt(pageSizeSelect.value) // Get selected page from dropdown
    this.currentPage = 1 // Reset the first page
    this.myOrders$.subscribe(orders => {
      // this.updatePagination(orders);
      // this.paginateOrders();
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

  getTotal = () => {

    if(this.selectedOrder) {
      return this.selectedOrder.subtotal.reduce(
        (total, subtotal) => total + subtotal, 0
      );
    }

    return 0;
  }

  // Method for populating Order Summary modal
  viewOrderSummary = (index: number) => {
    this.paginatedOrders$.pipe(map((orders) => orders[index])).subscribe((order) => {
      this.selectedOrder = order;
    });
  };

  // Method for updating order status
  updateOrderStatus = (index: number, status: string) => {
    this.paginatedOrders$.pipe(map((orders) => orders[index])).subscribe((order) => {
      if(order.status === 'Pending') {
        order.status = status;
        this.orderService.updateOrder(order as Order).subscribe(
          (response) => {
            console.log('Updated order status: ', response);
            this.myOrders$ = this.orderService.getOrders();
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
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: `Order has already been ${(order.status === 'Shipped') ? 'shipped' : 'delivered'}`,
        });
      }
    });
  };

   // Method for searchiing orders
   searchOrder = (): void => {
    if (this.searchQuery) {
      this.myOrders$ = this.orderService
        .getOrders()
        .pipe(
          map((orders: Order[]) => {
            // Filter based on the keyword for both item_name and category and customer name
            
            return orders.filter(order => 
              // Check if any of the item_name includes the keyword
              order.item_name.some(item => item.toLowerCase().includes(this.searchQuery.toLowerCase())) || 
              // Check if the customer name includes the keyword
              order.customer.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
              // Check if any of the category includes the keyword
              order.category.some(cat => cat.toLowerCase().includes(this.searchQuery))
            );
          })
        );
    } else {
      this.myOrders$ = this.orderService.getOrders();
    }

    this.paginateOrders();
  };

  // Method for filtering location
  filterLocation = (location: string) => {
    
    this.myOrders$ = this.orderService.getOrders().pipe(
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

    this.myOrders$ = this.orderService.getOrders().pipe(
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
    this.myOrders$ = this.orderService.getOrdersByUsername(this.customerUsername);
    // this.searchOrder();
  }
}
