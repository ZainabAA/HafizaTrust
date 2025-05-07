import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { PostRequest, PostResponse, Transaction } from '../../interfaces/transaction';
import { catchError, Observable, throwError, map } from 'rxjs';
import { getToken } from '../../interceptors/auth.interceptor';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService extends BaseService {

  baseUrl = 'https://react-bank-project.eapi.joincoded.com/mini-project/api/transactions/';

  constructor(_httpClient: HttpClient) {
    super(_httpClient)
   }

   getTransactions(){
    return this.get<Transaction[]>(`${this.baseUrl}my`)
    .pipe(
      catchError((error) => {
        console.error('getTransactions failed:', error);
        return throwError(() => error);
      })
    );
   }

   withdraw(amount: number){
    return this.put<PostResponse, PostRequest>(`${this.baseUrl}withdraw`, {amount: +amount})
    .pipe(
      catchError((error) => {
        console.error('withdraw failed:', error);
        return throwError(() => error);
      })
    )
   }

   deposit(amount: number){
    return this.put<PostResponse, PostRequest>(`${this.baseUrl}deposit`, {amount: amount}, {})
    .pipe(
      catchError((error) => {
        console.error('deposit failed:', error);
        return throwError(() => error);
      })
    )
   }

   transfer(amount: number, user: string){
    return this.put<PostResponse, any>(`${this.baseUrl}transfer/${user}`,
      {amount: amount, username: getToken('username')})
    .pipe(
      catchError((error) => {
        console.error('transaction failed:', error);
        return throwError(() => error);
      })
    )
   }
}
