// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { BaseService } from '../base/base.service';
import { AuthRequest, AuthResponse } from '../../interfaces/auth/auth';

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  private readonly baseUrl = 'https://react-bank-project.eapi.joincoded.com/';

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

  register(data: AuthRequest): Observable<AuthResponse> {
    return this.post<AuthResponse, AuthRequest>(
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
