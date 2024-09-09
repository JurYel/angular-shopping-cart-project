import { AfterViewChecked, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { MessageService } from 'primeng/api';
import { UniqueUsernameValidator } from '../../../../shared/validators/unique-username.validator';
import { map, Observable, of } from 'rxjs';
import { AuthUser } from '../../../models/auth-user.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { S3UploadService } from '../../services/s3-upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, AfterViewChecked {
  isSubMenuVisible = false;
  profileForm: FormGroup;
  username: string | null;
  userExists = false;
  submitted = false;
  profileImgName: string;
  savedProfileImgName!: string;
  isDefaultImg: boolean = true;
  selectedFile !: File;
  imageUrl: string | null;
  savedImageUrl: string | null;
  timestamp: string;
  s3Folder: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private usernameValidator: UniqueUsernameValidator,
    private s3UploadService: S3UploadService,
    private http: HttpClient
  ) {
    this.profileForm = this.fb.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      profile_img: ['', Validators.required],
      mobile_num: [
        '',
        [Validators.required, Validators.pattern(/^(9)\d{9}/), Validators.maxLength(10)],
      ]
    });

    this.username = sessionStorage.getItem('username');
    this.s3Folder = "assets/users";
    this.profileImgName = (this.f['profile_img'].value) ? this.f['profile_img'].value : `${this.s3Folder}/default_profile_img-100.png`;
    this.imageUrl = `${this.s3Folder}/default_profile_img-100.png`;
    this.savedImageUrl = `${this.s3Folder}/default_profile_img-50.png`;
    this.timestamp = Date.now().toString();
    console.log(this.timestamp);
  }

  ngOnInit(): void {
    this.authService
      .getUserByUsername(this.username as string)
      .subscribe(async (response) => {
        if (response.length > 0) {
          this.profileForm.patchValue({ username: response[0].username });
          this.profileForm.patchValue({ first_name: response[0].first_name });
          this.profileForm.patchValue({ last_name: response[0].last_name });
          this.profileForm.patchValue({ email: response[0].email });
          this.profileForm.patchValue({ mobile_num: response[0].mobile_num });

          const imageSignedUrl = await this.s3UploadService.getSignedUrl(`${this.s3Folder}/${response[0].profile_img}`);
          this.profileImgName = (response[0].profile_img) ? imageSignedUrl : 'default_profile_img-100.png';
          this.imageUrl = imageSignedUrl;
          this.savedImageUrl = imageSignedUrl;
          this.isDefaultImg = this.profileImgName.includes("default");

          if (this.profileForm.get('username')?.value === this.username) {
            this.userExists = true;
            console.log('onInit: ', this.userExists);
          }
        }
      });

    // Constructor is loaded first before ngOnInit hence the addition of validator here
    this.profileForm.get('username')?.addAsyncValidators(this.isUsernameTaken());
  }

  ngAfterViewChecked(): void {}

  get f() {
    return this.profileForm.controls;
  }

  get usernameAlreadyTaken() {
    return this.f['username'].hasError('usernameExists');
  }

  async uploadFile(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if(fileList) {
      if(fileList[0].type.match('image.jpeg') ||
         fileList[0].type.match('image.jpg') ||
         fileList[0].type.match('image.png')){
          // this.profileImgName = fileList[0].name;
          this.selectedFile = fileList[0];

          // Testing file image saving with express
          // const formData: FormData = new FormData();
          // const timestamp = Date.now().toString();
          // this.profileImgName = `${timestamp.slice(0, -3)}.${fileList[0].type.split('/')[1]}`;
          // console.log(this.profileImgName);
          // formData.append('image', fileList[0]);
          // formData.append('name', `${timestamp.slice(0, -3)}.${this.profileImgName.split('.')[1]}`)
          // // formData.append('name', `${this.f['username'].value}-${timestamp}.${this.profileImgName.split('.')[1]}`);

          // // Send image file to the backend
          // this.http.post('http://localhost:3030/api/v1/upload-image', formData)
          //   .subscribe({
          //     next: (response) => console.log("File uploaded successfully", response),
          //     error: (error) => console.error("Error uploading file: ", error)
          //   });

          // Testing file upload to S3 bucket
          this.profileImgName = `${this.f['username'].value}-${this.timestamp.slice(0, -3)}.${fileList[0].type.split('/')[1]}`;
          try {
            const imageKey = `assets/users/${this.profileImgName}`;
            // Upload file to S3 and get the URL
            this.imageUrl = await this.s3UploadService.uploadFile(fileList[0], this.profileImgName);
            this.imageUrl = await this.s3UploadService.getSignedUrl(`${this.s3Folder}/${this.profileImgName}`);

            // Log or use the URL to display the image
            console.log("File uploaded successfully. Image URL: ", this.imageUrl);
          } catch (error) {
            console.error("Error uploading file: ", error);
          }
      } else {
        this.messageService.add({ severity:'error', summary: 'Error', detail: 'Uploaded file must be an image (JPEG/PNG)' });
      }
    }
    
  }

  // can remove this now, updated function below
  isUsernameUnique = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {
    // const usernameValue = this.safetyCheck( () => this.f['username'].value);
    // ERROR HERE
    if (this.userExists) {
      console.log('isUsernmaeUnique: ', this.userExists);
      return this.usernameValidator
        .checkIfUsernameUnique(control.value)
        .pipe(
          map((response: boolean) =>
            response ? { usernameExists: true } : null
          )
        );
    }

    return of(null);

    // return this.usernameValidator
    //               .checkIfUsernameUnique(control.value)
    //                 .pipe(
    //                   map((response: boolean) => response ? { usernameExists: true} : null)
    //                 );
  };

  isUsernameTaken = (): AsyncValidatorFn => {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.usernameValidator.checkIfUsernameUnique(control.value).pipe(
        map((response: boolean) => {
          if (control.value !== this.username) {
            return response ? { usernameExists: true } : null;
          }
          return null;
        })
      );
    };
  };

  toggleSubmenu = (): void => {
    this.isSubMenuVisible = !this.isSubMenuVisible;
  };

  onSubmit = () => {
    this.submitted = true;
    const postData = {...this.profileForm.getRawValue()};
    const timestamp = Date.now().toString();
    const imgName = `${this.f['username'].value}-${timestamp.slice(0, -3)}.${this.profileImgName.split('.')[1]}`

    console.log(postData);
    if(this.profileForm.invalid) {
      return;
    }
    
    this.authService.getIdByUsername(this.username as string).subscribe(
      user => {
        if(user.length > 0){
            postData['is_admin'] = user[0].is_admin;
            postData['password'] = user[0].password;
            postData['deactivated'] = user[0].deactivated;
            postData['profile_img'] = this.profileImgName;
            
            //  // Testing file image saving with express
            // const formData: FormData = new FormData();
            // const headers: HttpHeaders = new HttpHeaders();
            // headers.append('Content-Type', 'multipart/form-data');

            // formData.append('image', this.selectedFile);
            // formData.append('name', imgName);

            // // Send image file to the backend
            // this.http.post('http://localhost:3030/api/v1/upload-image', formData, {
            //   headers: headers
            // }).subscribe({
            //     next: (response) => console.log("File uploaded successfully", response),
            //     error: (error) => console.error("Error uploading file: ", error)
            //   });

            this.authService.updateUser(user[0].id, postData as AuthUser).subscribe(
              response => {
                console.log("Updated user: ", response);
                this.savedImageUrl = this.imageUrl;
                this.messageService.add({ severity:'success', summary: 'Success', detail: 'Information has been updated' });
              },
              error => {
                this.messageService.add({ severity:'error', summary: 'Error', detail: 'Error in updating profile information' });
              }
            );
          }
        }
    );
    
  };
}
