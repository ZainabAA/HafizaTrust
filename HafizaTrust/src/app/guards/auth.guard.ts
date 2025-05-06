import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
<<<<<<< HEAD
export function getToken(name: string): string | null {

=======

export function getToken(name: string): string | null {
>>>>>>> f1782f1e08877ee26aa25a4c754d2ea6306e4c76
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

<<<<<<< HEAD

=======
>>>>>>> f1782f1e08877ee26aa25a4c754d2ea6306e4c76
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
