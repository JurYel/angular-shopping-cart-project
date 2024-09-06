import { AfterContentInit, AfterViewChecked, AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Grid, h, html } from 'gridjs';
import 'gridjs/dist/theme/mermaid.css';
import { ProductsService } from '../../services/products.service';
import { map, Observable } from 'rxjs';
import { Product } from '../../../models/product.interface';
import { DataTable } from 'simple-datatables';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, AfterViewInit {
  
  @ViewChild('datatablesSimple', { static: false }) datatablesSimple!: ElementRef;
  adminSection: HTMLDivElement;
  productsList$: Observable<Product[]>;
  productForm: FormGroup;
  categories: string[];
  itemImgValue: string;
  submitted: boolean = false;
  productIndex!: number;

  constructor(private fb: FormBuilder,
              private productsService: ProductsService,
              private messageService: MessageService) {

    this.adminSection = document.querySelector(".sb-nav-fixed") as HTMLDivElement;
    
    this.productsList$ = this.productsService.getProducts();
    this.productsList$.subscribe(
      data => console.log(data)
    )

    this.productForm = this.fb.group({
      item_img: ['', [Validators.required]],
      item_name: ['', Validators.required],
      category: ['Select category', Validators.required],  
      quantity: ['', Validators.required],
      unit_price: ['', Validators.required]
    });

    this.categories = [
      "Food",
      "Drinks",
      "Hygiene",
      "Cooking Essentials"
    ]

    console.log(this.f['item_img'].value);
    this.itemImgValue = (this.f['item_img'].value) ? this.f['item_img'].value : 'default_item_img.jpg'; 
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
    
    if(this.datatablesSimple) {
      // new DataTable(this.datatablesSimple.nativeElement, {
      //   searchable: true,
      //   columns: [
      //      // Sort the first column in ascending order
      //     // { select: 0, sort: "asc" },
      //     // { select: 1, sort: "asc" },

      //     // Set the second column as datetime string matching the format "DD/MM/YYY"
      //     // { select: 2 },

      //     // Disable sorting on the third and fourth columns
      //     // { select: [3, 4], sortable: false },
          
      //     // Set the fourth column as datetime string matching the format "DD/MM/YYY"
      //     // { select: 4, type: "date", format: "DD/MM/YYYY" },
         
      //     // Hide the fifth column
      //     // { select: 4, hidden: true },

      //     // Append a button to the sixth column
      //     // {
      //     //     select: 5,
      //     //     type: 'string',
      //     //     render: function(data, td, rowIndex, cellIndex) {
      //     //         return `${data}<button type='button' data-row='${rowIndex}'>Select</button>`;
      //     //     }
      //     // }
      //   ]
      // });
    }
    // new Grid({
    //   from: document.getElementById("myTable") as HTMLTableElement,
    //   columns: [
    //     "Item Image",
    //     "Item Name",
    //     "Category",
    //     "Quantity",
    //     "Unit Price",
    //     {
    //       name: 'Actions',
    //       formatter: (cell, row) => {
    //         // return html(`
    //         //   <button class="btn btn-sm btn-warning" (click)="editRow(row)"><i class="fa fa-pencil"></i> </button>
    //         //   <button class="btn btn-sm btn-danger (click)="deleteRow(row)"><i class="fa fa-trash"></i> </button>
    //         // `);
    //         return h('span', { className: 'btn-group' }, [
    //           h('button', {
    //             className: 'btn btn-sm btn-primary me-2',
    //             onClick: () => alert(`Editing: ${row.cells[0].data} ${row.cells[1].data}`)
    //           }, [
    //             // h('i', { className: 'fa fa-pencil' }),
    //             // h('img', { src: "assets/img/pencil-solid.svg", className: "btn-img" }),
    //             'Edit'
    //           ]),
    //           h('button', {
    //             className: 'btn btn-sm btn-danger',
    //             onClick: () => alert(`Deleting: ${row.cells[0].data} ${row.cells[1].data}`)
    //           }, [
    //             // h('i', { className: 'fa fa-trash' }),
    //             'Delete'
    //           ])
    //         ]);
    //       }
    //     }
    //   ],
    //   data: [
    //     ['Tiger Nixon', 'System Architect', 61, '2011/04/25', '$320,800'],
    //     ['Garrett Winters', 'Accountant', 63, '2011/07/25', '$170,750'],
    //     ['Ashton Cox', 'Junior Technical Author', 66, '2009/01/12', '$86,000'],
    //     ['Cedric Kelly', 'Senior Javascript Developer',  22, '2012/03/29', '$433,060'],
    //     ['Airi Satou', 'Accountant', 33, '2008/11/28', '$162,700'],
    //     ['Brielle Williamson', 'Integration Specialist', 61, '2012/12/02', '$372,000'],
    //     ['Herrod Chandler', 'Sales Assistant',  59, '2012/08/06', '$137,500'],
    //     ['Rhona Davidson', 'Integration Specialist', 55, '2010/10/14', '$327,900'],
    //     ['Colleen Hurst', 'Javascript Developer', 39, '2009/09/15', '$205,500'],
    //     ['Sonya Frost', 'Software Engineer', 23, '2008/12/13', '$103,600'],
    //   ],
    //   search: true,
    //   pagination: true,
    //   sort: true,
    //   resizable: false,
    //   language: {
    //     'search': {
    //       'placeholder': '🔍 Search...'
    //     },
    //     'pagination': {
    //       'previous': '⬅️',
    //       'next': '➡️',
    //       'showing': '😃 Displaying',
    //       'results': () => 'Records'
    //     }
    //   }
    // }).render(document.getElementById('myProductsTable') as HTMLDivElement);
  }


  uploadFile = (event: Event) => {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if(fileList){
      console.log(fileList[0].name)
      this.itemImgValue = fileList[0].name;
    }
  }

  get f() {
    return this.productForm.controls;
  }

  getIndex = (index: number) => {
    this.productIndex = index;
    console.log(this.productIndex)
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

  capitalizeWord = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  onSubmitAdd = () => {
    this.submitted = true;
    const postData = {...this.productForm.getRawValue()};
    postData['item_name'] = this.capitalizeWord(postData['item_name']);
    postData['item_img'] = (postData['item_img'] as string).split('fakepath\\')[1];

    if(this.productForm.invalid){
      return;
    }

   this.productsService.checkIfProductExists(postData['item_name'] as string).subscribe(
    exists => {
      if(!exists) {
        
        this.productsService.addProduct(postData as Product).subscribe(
          response => {
            this.messageService.add({ severity:'success', summary: 'Success', detail: 'New product has been added' });
            this.productsList$ = this.productsService.getProducts();
          },
          error => {
            this.messageService.add({ severity:'error', summary: 'Error', detail: 'Error occured in adding product' });
          }
        )
      } else {
        this.messageService.add({ severity:'error', summary: 'Error', detail: 'This product already exists' });
      }
    }
   );
  }

  onSubmitDeleteItem = (index: number) => {
    
    this.productsList$.pipe(
      map(products => products[index])
    ).subscribe(
      product => {
        this.productsService.deleteProduct(product.id as string).subscribe(
          response => {
            console.log("Deleted item: ", response);
            this.messageService.add({ severity:'success', summary: 'Success', detail: 'Product has been deleted' });
            this.productsList$ = this.productsService.getProducts();
          }
        );
      }
    );
  }
  
}
