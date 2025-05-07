import { HttpContextToken, HttpInterceptorFn, HttpHandler, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading/loading.service';
import { finalize } from 'rxjs';

export const SKIP_LOADING = 
  new HttpContextToken<boolean>(() => false);

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService)
    // Check for a custom attribute 
    // to avoid showing loading spinner
    console.log(req.context.get(SKIP_LOADING));
    
    if (req.context.get(SKIP_LOADING)) {
      // Pass the request directly to the next handler
      loadingService.loadingOff();
      return next(req);
    }

    // Turn on the loading spinner
    loadingService.loadingOn();

    return next(req).pipe(
      finalize(() => {
        // Turn off the loading spinner
        loadingService.loadingOff();
      })
    );
};
