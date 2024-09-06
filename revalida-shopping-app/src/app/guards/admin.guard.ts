import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {

  if(sessionStorage.getItem('is_admin') === 'true'){
    return true;
  } else {
    const router = inject(Router);
    return router.navigate(['error/401']);
  }
};
