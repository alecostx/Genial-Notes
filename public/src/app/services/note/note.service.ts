import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Note } from 'src/app/models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private readonly API_URL = `https://localhost:7119/api/Nota/`;

  constructor(
    private http: HttpClient
  ) { }

  public setNewNote(note: Note): Observable<Note> {
    return this.http.post<Note>(`${this.API_URL}Nota`, note);
  }
  
  public getNote(idUsuario: number): Observable<Array<Note>> {
    return this.http.get<Array<Note>>(`${this.API_URL}Nota/${idUsuario}`);
  }

  public editNote(note: Note): Observable<Note> {
    return this.http.patch<Note>(`${this.API_URL}Nota/${note.id}`, note);
  }

  public setIdNoteLocalData(idNote: number): void {
    localStorage.setItem('idNote', JSON.stringify(idNote));
  }

  public getIdNoteLocalData(): number {
    return JSON.parse(localStorage.getItem('idNote')!);
  }

  public removeIdNoteLocalData(): void {
    localStorage.removeItem('idNote');
  }

  public setNoteListLocalData(noteList: Array<Note>): void {
    localStorage.setItem('noteList', JSON.stringify(noteList))
  }

  public getNoteListLocalData(): Array<Note> {
    return JSON.parse(localStorage.getItem('noteList')!);
  }

  public removeNoteListLocalData(): void {
    localStorage.removeItem('noteList');
  }

  public setNotesLocalDataToLogin(idUsuario: number): void {
    const noteList: Array<Note> = this.getNoteListLocalData();

    noteList.forEach((res: Note) => { 
      const note: Note = {
        titulo: res.titulo,
        descricao: res.descricao,
        idUsuario: idUsuario
      }

      this.setNewNote(note)
     })
  }
}
