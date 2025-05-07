import { HttpContext, HttpContextToken, HttpInterceptorFn } from '@angular/common/http';

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

export const SKIP_INTERCEPT = new HttpContextToken(() => false);

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = getToken('token');
  
  if (req.context.get(SKIP_INTERCEPT)) {
    return next(req);
  }

  // Clone the request and add the authorization header
  const clonedRequest = token
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      })
    : req;

  return next(clonedRequest);
};
