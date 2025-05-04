import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../../interfaces/note';
import { NotesService } from '../../services/notes/notes.service';

@Component({
  selector: 'app-note-details',
  standalone: true,
  imports: [],
  templateUrl: './note-details.component.html',
  styleUrl: './note-details.component.css'
})
export class NoteDetailsComponent {
  note: Note | null = null;
  error = '';

  constructor(route: ActivatedRoute, notesService: NotesService) {
    const id = route.snapshot.params['id'];
    console.log("id: ", route.snapshot.params['id']);
    
    notesService.getNote(id).subscribe({
      next: (res) => {
        this.note = res;
      },
      error: (error) => {
        this.error = 'Note not found';
        console.error(error);
      }
    })
  }
}
