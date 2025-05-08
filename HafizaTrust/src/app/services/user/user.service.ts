import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient, HttpContext } from '@angular/common/http';
import { ImageInput, User, UserUpdateResponse } from '../../interfaces/user';
import { catchError, Observable, throwError, map } from 'rxjs';
import { getToken, SKIP_INTERCEPT } from '../../interceptors/auth.interceptor';
import { SKIP_LOADING } from '../../interceptors/loading.interceptor';


@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {
  baseUrl = 'https://react-bank-project.eapi.joincoded.com/mini-project/api/auth/';

  constructor(_httpClient: HttpClient) {
      super(_httpClient)
     }

  getAllUsers(){
    return this.get<User[]>(`${this.baseUrl}users`,
          {
            context: new HttpContext().set(SKIP_INTERCEPT, true)
          })
        .pipe(
          catchError((error) => {
            console.error('getAllUsers failed:', error);
            return throwError(() => error);
          })
      );
  }

  getUsersById(id: string){
    return this.get<User>(`${this.baseUrl}user/${id}`,
      {
        context: new HttpContext().set(SKIP_INTERCEPT, true)
      })
        .pipe(
          catchError((error) => {
            console.error('getAllUsers failed:', error);
            return throwError(() => error);
          })
      );
  }

  getCurrent() {
    return this.get<User>(`${this.baseUrl}me`,
      {
        context: new HttpContext().set(SKIP_LOADING, true)
      })
        .pipe(
          catchError((error) => {
            console.error('getAllUsers failed:', error);
            return throwError(() => error);
          })
      );
  }

  addUser(user: { username: string }) {
  return this._http.post<User>(
    `${this.baseUrl}users`,
    user
  ).pipe(
    catchError((error) => {
      console.error('addUser failed:', error);
      return throwError(() => error);
    })
  );
}

  updateUser(image: string) {
    return this.put<UserUpdateResponse, ImageInput>(`${this.baseUrl}profile`, 
      {'image': `${image}`})
        .pipe(
          catchError((error) => {
            console.error('updateUser failed:', error);
            return throwError(() => error);
          })
      );
  }
}
