import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export function getToken(name: string): string | null {

  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}


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
