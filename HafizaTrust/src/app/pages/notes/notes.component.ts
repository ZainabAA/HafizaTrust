import { Component } from '@angular/core';
import { NotesService } from '../../services/notes/notes.service';
import { Note } from '../../interfaces/note';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  notes: Note[] = [];

  constructor(notesService: NotesService) {
    notesService.getAllNotes().subscribe({
      next: (res) => {
        this.notes = res
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
