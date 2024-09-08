import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Grid, h } from 'gridjs';
import 'gridjs/dist/theme/mermaid.css';
import { map, Observable } from 'rxjs';
import { AuthUser } from '../../../models/auth-user.interface';
import { AccountsService } from '../../services/accounts.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatchValidator } from '../../../../shared/validators/password-match.validator';
import { UniqueUsernameValidator } from '../../../../shared/validators/unique-username.validator';
import { MessageService } from 'primeng/api';
import { end, start } from '@popperjs/core';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.scss'
})
export class AccountsComponent implements OnInit, AfterViewInit{

  @ViewChild('datatablesSimple', { static: false }) datatablesSimple!: ElementRef;
  @ViewChild('closeModalAdd') closeModalAdd !: ElementRef;
  @ViewChild('closeModalEdit') closeModalEdit !: ElementRef;
  @ViewChild('closeModalDeact') closeModalDeact !: ElementRef;
  @ViewChild('closeModalDeactChecked') closeModalDeactChecked !: ElementRef;

  adminSection: HTMLDivElement;
  accountsList$: Observable<AuthUser[]>;

  //variables for pagination
  paginatedAccounts$ !: Observable<AuthUser[]>;
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 0;
  pageNumbers: number[] = [];
  totalLength: number = 0;
  currentPageLength: number = 0;

  adminName: string | undefined;
  accountForm: FormGroup;
  submitted: boolean = false;
  accountIndex!: number;
  deactDesc!: string;
  checkedUsers : number[] = [];

  constructor(private fb: FormBuilder,
              private accountsService: AccountsService,
              private usernameValidator: UniqueUsernameValidator,
              private messageService: MessageService
            ) {
    this.adminSection = document.querySelector(".sb-nav-fixed") as HTMLDivElement;

    this.adminName = `${sessionStorage.getItem('first_name')} ${sessionStorage.getItem('last_name')}`;
    this.accountsList$ = this.accountsService.getAccounts();
    this.accountsList$.subscribe(
      data => console.log(data)
    );

    this.accountForm = this.fb.group({
      // Validators.patterns(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/) full name regex
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      username: ['', [Validators.required], this.usernameIsUnique.bind(this)], // check if username already exists -> create fn in backend for checking username -> use it in validator
      email: ['', [Validators.required, Validators.email]],
      is_admin: [false],
      deactivated: [false],
      mobile_num: ['', [Validators.required, Validators.pattern(/^(9)\d{9}/), Validators.maxLength(10)]], // add regex validation for mobile num
      password: ['', Validators.required],
      confirm_password: ['', Validators.required]
    }, {
      validators: passwordMatchValidator
    });
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

    // calculate total number of pages based on the data
    this.accountsList$.subscribe(accounts => {
      this.totalLength = accounts.length;
      this.updatePagination(accounts);
    })

    // Initially show the first page of the data
    this.paginateAccounts();
  }

  ngAfterViewInit(): void {

  }

  // Method to generate page numbers from totalPages
  generatePageNumbers = () => {
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  updatePagination = (accounts: AuthUser[]) => {
    this.totalPages = Math.ceil(accounts.length / this.pageSize);
    this.generatePageNumbers();
  }

  // Method to paginate orders based on the current page
  paginateAccounts = () => {
    this.paginatedAccounts$ = this.accountsList$
      .pipe(
        map(accounts => {
          const startIndex = (this.currentPage - 1) * this.pageSize;
          const endIndex = Math.min(startIndex + this.pageSize, accounts.length);
          this.currentPageLength += endIndex - this.currentPageLength;
          console.log(this.currentPageLength);
          return accounts.slice(startIndex, endIndex);
        })
      );
  }

  // Method to go to next page
  nextPage = () => {
    if(this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateAccounts();
    }
  }

  // Method to go to previous page
  prevPage = () => {
    if(this.currentPage > 1) {
      this.currentPage--;
      this.paginateAccounts();
    }
  }

  gotoPage = (page: number) => {
    this.currentPage = page;
    this.paginateAccounts();
  }

  get f() {
    return this.accountForm.controls;
  }

  get usernameAlreadyTaken() {
    return this.f['username'].hasError('usernameExists');
            // && this.registerForm.get('username')?.touched;
  }

  usernameIsUnique = (control: AbstractControl) => {
    return this.usernameValidator
                  .checkIfUsernameUnique(control.value)
                    .pipe(
                      map((response: boolean) => response ? { usernameExists: true} : null)
                    );
  }
  
  capitalizeWord = (word: string) => {
    let words: string[] = word.split(' ');
    let capitalized = " ";
    words.forEach((token: string) => {
      capitalized += token.charAt(0).toUpperCase() + token.slice(1) + " ";
    })

    console.log(capitalized.trim());
    return capitalized;
  }

  getIndex = (index: number) => {
    this.accountIndex = index;

    this.accountsList$.pipe(
      map(users => users[index])
    ).subscribe(
      user => {
        this.deactDesc = `${user.first_name} ${user.last_name}`;
      }
    );
  }

  onCheck = (index: number) => {
    if(this.checkedUsers.includes(index)) {
      this.checkedUsers = this.checkedUsers.filter(
        (item) => item !== index
      );
    } else {
      this.checkedUsers.push(index);
    }
  }

  populateEditForm = (index: number) => {
    this.accountIndex = index;

    this.accountsList$.pipe(
      map(accounts => accounts[index])
    ).subscribe(
      account => {
        this.accountForm.patchValue({
          first_name: account.first_name,
          last_name: account.last_name,
          username: account.username,
          is_admin: account.is_admin,
          deactivated: account.deactivated,
          email: account.email,
          mobile_num: account.mobile_num,
          password: account.mobile_num
        });
      }
    );
  }

  
  onSubmitCreate = () => {
    this.submitted = true;
    const postData = {...this.accountForm.getRawValue()};
    delete postData.confirm_password;
    postData['first_name'] = this.capitalizeWord(postData['first_name']);
    postData['last_name'] = this.capitalizeWord(postData['last_name']);

    if(this.accountForm.invalid) {
      return;
    }

    this.accountsService.checkIfUsernameExists(postData['username'] as string).subscribe(
      exists => {
        if(!exists) {
          this.accountsService.addUser(postData as AuthUser).subscribe(
            response => {
              console.log("Created user: ", response);
              this.closeModalAdd.nativeElement.click();
              this.accountsList$ = this.accountsService.getAccounts();
              this.messageService.add({ severity:'success', summary: 'Success', detail: 'Created new user' });
            },
            error => {
              this.messageService.add({ severity:'error', summary: 'Error', detail: 'Failed to create new user' });
            }
          );
        } else {
          this.messageService.add({ severity:'error', summary: 'Error', detail: 'User already exists' });
        }
      }
    );

    this.accountForm.reset();
    this.submitted = false;
  }

  onSubmitEdit = (index: number) => {
    this.submitted = true;
    const updatedUser = {...this.accountForm.getRawValue()};
    delete updatedUser.confirm_password;

    if(this.accountForm.invalid) {
      return;
    }

    this.accountsList$.pipe(
      map(users => users[index])
    ).subscribe(
      user => {
        updatedUser['id'] = user.id;
        this.accountsService.updateUser(updatedUser as AuthUser).subscribe(
          response => {
            console.log("Updated user: ", response);
            this.accountsList$ = this.accountsService.getAccounts();
            this.closeModalEdit.nativeElement.click();
            this.messageService.add({ severity:'success', summary: 'Success', detail: 'User information has been updated' });
          },
          error => {
            this.messageService.add({ severity:'error', summary: 'Error', detail: 'Failed to update user information' });
          }
        )
      }
    );

    this.submitted = false;
  }

  onSubmitDeactivateUser = (index: number) => {
    
    this.accountsList$.pipe(
      map(users => users[index])
    ).subscribe(
      user => {
        user.deactivated = !user.deactivated;
        this.accountsService.deactivateUser(user as AuthUser).subscribe(
          response => {
            console.log("Deactivated user: ", response);
            this.accountsList$ = this.accountsService.getAccounts();
            this.closeModalDeact.nativeElement.click();
            this.messageService.add({ severity:'success', summary: 'Success', detail: `${user.first_name} ${user.last_name} has been deactivated` });
          },
          error => {
            console.log(error);
            this.messageService.add({ severity:'error', summary: 'error', detail: 'Failed to deactivate user' });
          }
        );
      }
    );
  }

  onSubmitDeactivateChecked = () => {

    this.checkedUsers.forEach((index) => {
      this.accountsList$.pipe(
        map(users => users[index])
      ).subscribe(
        user => {
          user.deactivated = !user.deactivated;
          this.accountsService.deactivateUser(user as AuthUser).subscribe(
            response => {
              console.log("Deactivated user: ", response);
              this.accountsList$ = this.accountsService.getAccounts();
            },
            error => {
              this.messageService.add({ severity:'error', summary: 'Error', detail: 'Failed to remove product' });
            }
          );
        }
      );
    });

    this.closeModalDeactChecked.nativeElement.click();
    this.messageService.add({ severity:'success', summary: 'Success', detail: `Deactivated ${this.checkedUsers.length} users.` });
  }
}
