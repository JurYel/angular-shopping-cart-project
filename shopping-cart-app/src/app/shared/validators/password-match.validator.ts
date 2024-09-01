import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirm_password');

    if(!password || !confirmPassword) {
        return null;
    }
    console.log(password.value === confirmPassword.value)
    console.log(password.value)
    console.log(confirmPassword.value)
   
    return password.value === confirmPassword.value ? null : {passwordMismatch: true};
}