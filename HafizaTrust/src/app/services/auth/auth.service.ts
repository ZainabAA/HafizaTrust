import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { BaseService } from '../base/base.service';
import { AuthRequest, AuthResponse } from '../../interfaces/auth/auth';
import { Router } from '@angular/router';
import { getToken, SKIP_INTERCEPT } from '../../interceptors/auth.interceptor';
import { User } from '../../interfaces/user';
import { getTestBed } from '@angular/core/testing';

// function setCookie(name, value, exdays) {
//   const d = new Date();
//   d.setTime(d.getTime() + (exdays*24*60*60*1000));
//   let expires = "expires="+ d.toUTCString();
//   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

@Injectable({ providedIn: 'root' })
export class AuthService extends BaseService {
  private readonly baseUrl = 'https://react-bank-project.eapi.joincoded.com/mini-project/api/auth';
  private _router = inject(Router);
  readonly $userToken = signal<string | null>(null);

  constructor(_http: HttpClient) {
    super(_http);
    this.$userToken.set(getToken('username'));
  }

  login(data: AuthRequest): Observable<AuthResponse> {
    return this.post<AuthResponse, AuthRequest>(
      `${this.baseUrl}/login`,
      data,
      {
        context: new HttpContext().set(SKIP_INTERCEPT, true)
      }
    ).pipe(
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(() => error);
      })
    );
  }

  setUser(){
    this.$userToken.set(getToken('username'));
  }

  logout()
  {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.$userToken.set(null);
    console.log(document.cookie);
    
    this._router.navigateByUrl('/')
  }

  register(data: FormData): Observable<AuthResponse> {
    return this.post<AuthResponse, FormData>(
      `${this.baseUrl}/register`,
      data,
      {
        context: new HttpContext().set(SKIP_INTERCEPT, true)
      }
    ).pipe(
      catchError((error) => {
        console.error('Registration failed:', error);
        return throwError(() => error);
      })
    );
  }
}
