import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getToken } from '../interceptors/auth.interceptor';

export const authGuard: CanActivateFn = (route, state) => {

  let token = getToken('token');
  const router = inject(Router);

  
  if(token)
  {    
    
    return true
  }
  router.navigateByUrl('/login');
  return false
  
};
