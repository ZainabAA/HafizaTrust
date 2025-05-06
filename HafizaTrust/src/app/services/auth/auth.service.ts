<<<<<<< HEAD
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }

import { inject, Injectable } from '@angular/core';
=======
import { Injectable } from '@angular/core';
>>>>>>> e2b5ded888163e9447f76b81f81568809e727467
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { BaseService } from '../base/base.service';
import { AuthRequest, AuthResponse } from '../../interfaces/auth/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  private readonly baseUrl = 'https://react-bank-project.eapi.joincoded.com/mini-project/api/auth';
  private _router = inject(Router)

  constructor(_http: HttpClient) {
    super(_http);
  }

  login(data: AuthRequest): Observable<AuthResponse> {
    return this.post<AuthResponse, AuthRequest>(
      `${this.baseUrl}/login`,
      data
    ).pipe(
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    );
  }

  logout()
  {
    document.cookie = "token=;"
    this._router.navigateByUrl('/login')
    
  }

  register(data: FormData): Observable<AuthResponse> {
    return this.post<AuthResponse, FormData>(
      `${this.baseUrl}/register`,
      data
    ).pipe(
      catchError((error) => {
        console.error('Registration failed:', error);
        return throwError(() => error);
      })
    );
  }
}
