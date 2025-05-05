import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

export const roleGuard: CanActivateFn = (route, state) => {

  const userService = inject(UserService);
  const router = inject(Router);

  function getUsername(name: string): string | null {
    const cookies = document.cookie.split('; ');
    for (const cookie of cookies) {
      const [key, value] = cookie.split('=');
      if (key === name) {
        return decodeURIComponent(value);
      }
    }
    return null;
  }

  if (getUsername('username') === 'HafizaAdmin') {
    return true;
  } else {
    // Redirect to the login page if the user is not authenticated
    router.navigate(['/user']);
    return false;
  }
  
};