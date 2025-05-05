import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { PostRequest, PostResponse, Transaction } from '../../data/transaction';
import { catchError, Observable, throwError, map } from 'rxjs';
import { Beneficiary, User } from '../../data/beneficiary';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService extends BaseService {

  baseUrl = 'https://react-bank-project.eapi.joincoded.com/mini-project/api/transactions/';
  headerAuth = {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODExZDYxOGE1ZmJjOGRmZTZhOTI0ODYiLCJpYXQiOjE3NDU5OTkzODQsImV4cCI6MTc1NjM2NzM4NH0.kLfoZLkC0omkVZhxXN7Jo8dLp-v3wAQ6p4VWObyiJ6A'}
  username = 'zainab';

  constructor(_httpClient: HttpClient) {
    super(_httpClient)
   }

   getTransactions(){
    return this.get<Transaction[]>(`${this.baseUrl}my`, {}, this.headerAuth)
    .pipe(
      catchError((error) => {
        console.error('getTransactions failed:', error);
        return throwError(() => error);
      })
    );
   }

   getBeneficiaries(){
    return this.getTransactions().pipe(
      map((res: Transaction[]) => {
        return res.map((b: Transaction) => {
          return { _id: b.to,
          ...this.get<User>(
            `https://react-bank-project.eapi.joincoded.com/mini-project/api/auth/user/${b._id}`, 
            {}, this.headerAuth).subscribe({
              next: (res) => {
                return {username: res.username, image: res.image};
              }
            })
          }
        })
      })
    )
   }

   withdraw(amount: number){
    return this.put<PostResponse, PostRequest>(`${this.baseUrl}withdraw`, {amount: amount}, {}, this.headerAuth)
    .pipe(
      catchError((error) => {
        console.error('withdraw failed:', error);
        return throwError(() => error);
      })
    )
   }

   deposit(amount: number){
    return this.put<PostResponse, PostRequest>(`${this.baseUrl}deposit`, {amount: amount}, {}, this.headerAuth)
    .pipe(
      catchError((error) => {
        console.error('deposit failed:', error);
        return throwError(() => error);
      })
    )
   }

   transfer(amount: number, user: string){
    return this.put<PostResponse, any>(`${this.baseUrl}transfer/${user}`,
      {amount: amount, username: this.username}, {}, this.headerAuth)
    .pipe(
      catchError((error) => {
        console.error('transaction failed:', error);
        return throwError(() => error);
      })
    )
   }
}
