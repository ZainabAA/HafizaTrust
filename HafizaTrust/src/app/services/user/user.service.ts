import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../data/user';
import { catchError, Observable, throwError, map } from 'rxjs';
import {getToken} from '../../guards/auth.guard';
@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  baseUrl = 'https://react-bank-project.eapi.joincoded.com/mini-project/api/auth/';
  headerAuth = {'Authorization': `Bearer ${getToken('token')}`}
  username = getToken('username');

  constructor(_httpClient: HttpClient) {
      super(_httpClient)
     }

  getAllUsers(){
    return this.get<User[]>(`${this.baseUrl}users`, {}, this.headerAuth)
        .pipe(
          catchError((error) => {
            console.error('getAllUsers failed:', error);
            return throwError(() => error);
          })
      );
  }

  getUsersById(id: string){
    return this.get<User[]>(`${this.baseUrl}user/${id}`, {}, this.headerAuth)
        .pipe(
          catchError((error) => {
            console.error('getAllUsers failed:', error);
            return throwError(() => error);
          })
      );
  }

  getCurrent() {
    return this.get<User>(`${this.baseUrl}me`, {}, this.headerAuth)
        .pipe(
          catchError((error) => {
            console.error('getAllUsers failed:', error);
            return throwError(() => error);
          })
      );
  }
}
