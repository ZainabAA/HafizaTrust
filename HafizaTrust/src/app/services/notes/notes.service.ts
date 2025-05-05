import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Note } from '../../interfaces/note';

@Injectable({
  providedIn: 'root'
})
export class NotesService extends BaseService {
  private readonly baseUrl = 'https://task-react-auth-backend.eapi.joincoded.com/api/';

  constructor(_http: HttpClient) { 
    super(_http)
  }

  getAllNotes(): Observable<Note[]> {
    return this.get<Note[]>(`${this.baseUrl}notes`).pipe(
      catchError((error) => {
        console.error('getAllNotes failed:', error);
        return throwError(() => error);
      }));
  }

  getNote(id: string): Observable<Note> {
    return this.get<Note>(`${this.baseUrl}notes/${id}`).pipe(
      catchError((error) => {
        console.error('getNote failed:', error);
        return throwError(() => error);
      }));
  }

  addNote(note: Note): Observable<Note> {
    return this.post<Note, Note>(`${this.baseUrl}notes`, note).pipe(
      catchError((error) => {
        console.error('getNote failed:', error);
        return throwError(() => error);
      }));
  }
}

