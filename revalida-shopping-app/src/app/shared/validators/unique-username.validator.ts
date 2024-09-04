import {  Injectable } from "@angular/core";
import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { AuthService } from "../../modules/auth/services/auth.service";
import { map, Observable } from "rxjs";

@Injectable()
export class UniqueUsernameValidator {

    constructor(private authService: AuthService) {}

    isUsernameUnique: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
        const username: unknown = control.get('username');
        let usernameExists: boolean = false;
    
        this.authService.checkIfUsernameExists(username as string).subscribe(
            exists => {
                if(exists){
                    usernameExists = true;
                } else{
                    usernameExists = false;
                }
            }
        )
       
        return !usernameExists ? null : {usernameExists: true};
    }

    checkIfUsernameUnique = (username: string): Observable<boolean> => {

        return this.authService.checkIfUsernameExists(username as string)
                                    .pipe(
                                        map((response: boolean) => response)
                                    )
    }
}

