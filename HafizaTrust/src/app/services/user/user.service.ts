import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { ImageInput, User, UserUpdateResponse } from '../../data/user';
import { catchError, Observable, throwError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  baseUrl = 'https://react-bank-project.eapi.joincoded.com/mini-project/api/auth/';
  headerAuth = {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODExZDYxOGE1ZmJjOGRmZTZhOTI0ODYiLCJpYXQiOjE3NDU5OTkzODQsImV4cCI6MTc1NjM2NzM4NH0.kLfoZLkC0omkVZhxXN7Jo8dLp-v3wAQ6p4VWObyiJ6A'}
  username = 'zainab';

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

  updateUser(image: string) {
    return this.put<UserUpdateResponse, ImageInput>(`${this.baseUrl}profile`, {'image': `${image}`}, {}, this.headerAuth)
        .pipe(
          catchError((error) => {
            console.error('updateUser failed:', error);
            return throwError(() => error);
          })
      );
  }
}
