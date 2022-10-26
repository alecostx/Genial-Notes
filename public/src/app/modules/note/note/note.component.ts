import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Note } from 'src/app/models/note.model';
import { NoteService } from 'src/app/services/note/note.service';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  public formNote!: FormGroup;
  public noteList: Array<Note> = [];
  public idUsuario!: number;
  public loading: boolean = false;
  public isEditNote: boolean = false;

  constructor(
    private noteService: NoteService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.setValidatorsForm();
    this.idUsuario = this.userService.getIdUserLoggedLocalData() ? this.userService.getIdUserLoggedLocalData() : 0;
    this.getNoteList();
    this.removeNoteLocalData();
  }

  public setCreateOrEditNote(): void {
    if (!this.noteService.getIdNoteLocalData() && this.noteService.getIdNoteLocalData() !== 0) {
      this.createNewNote(this.idUsuario);
    } else {
      this.editNote(this.noteService.getIdNoteLocalData());
    }
  }

  public createNewNote(idUser: number): void {
    this.loading = true

    let note: Note = {
      titulo: this.formNote.value.title,
      descricao: this.formNote.value.describe,
      idUsuario: idUser
    }

    if (!this.idUsuario) {
      note.id = this.noteList.length;

      this.noteList.push(note);

      this.removeNoteLocalData();
      this.noteService.setNoteListLocalData(this.noteList);
      this.loading = false;
      this.getNoteList();
      this.snackbarService.open('Nota Criada com Sucesso!', 'snackbar-done');
      this.setToggleEditNote();
      this.clearNote();
    } else {
      this.noteService
        .setNewNote(note)
        .subscribe(
          () => {
            this.getNoteList();
            this.snackbarService.open('Nota Criada com Sucesso!', 'snackbar-done');
            this.setToggleEditNote();
            this.clearNote();
          },
          () => this.snackbarService.open('Problemas ao Criar Nota', 'snackbar-error')
        )
        .add(() => this.loading = false);
    }
  } 

  public clearNoteEditting(): void {
    this.noteService.removeIdNoteLocalData();
    this.formNote.get('title')?.setValue('');
    this.formNote.get('describe')?.setValue('');
    this.setToggleEditNote();
  }

  public deleteNote(note: Note): void {
    if (this.noteService.getNoteListLocalData()) {
      this.noteList = this.noteList.filter((res: Note) => res.id !== note.id);

      this.noteService.removeNoteListLocalData();
      this.noteList.length > 0 && this.noteService.setNoteListLocalData(this.noteList);
      this.getNoteList();
      this.snackbarService.open('Nota deletada com sucesso', 'snackbar-done');
    } else {
      this.noteService
        .deleteNotebyId(note.id!)
        .subscribe(
          () => this.snackbarService.open('Nota deletada com sucesso', 'snackbar-done'),
          () => this.snackbarService.open('Problemas para deletar a nota', 'snackbar-error')
        );
    }
  }

  public editNote(idNote: number): void {
    this.loading = true;

    const note: Note = {
      id: idNote,
      titulo: this.formNote.value.title,
      descricao: this.formNote.value.describe,
      idUsuario: this.idUsuario
    }

    if (this.noteService.getNoteListLocalData()){
      this.noteList.forEach(
        (res: Note) => {
          if(res.id === idNote) {
            res.titulo = note.titulo;
            res.descricao = note.descricao;
            return;
          }
        });

      this.noteService.removeNoteListLocalData();
      this.noteService.setNoteListLocalData(this.noteList);
      this.loading = false;
      this.getNoteList();
      this.snackbarService.open('Nota Editada com Sucesso', 'snackbar-done');
      this.setToggleEditNote();
      this.clearNote();
      this.removeNoteLocalData();
    } else {
      this.noteService
        .editNote(note)
        .subscribe(
          () => {
            this.getNoteList();
            this.snackbarService.open('Nota Editada com Sucesso', 'snackbar-done');
            this.removeNoteLocalData();
            this.setToggleEditNote();
            this.clearNote();
          },
          () => this.snackbarService.open('Houve um problema ao editar a nota', 'snackbar-error')
        )
        .add(() => this.loading = false);
    }
  }

  public selectUpdateNote(note: Note): void {
    this.noteService.setIdNoteLocalData(note.id!);
    this.formNote.get('title')?.setValue(note.titulo);
    this.formNote.get('describe')?.setValue(note.descricao);
    this.setToggleEditNote();
  }

  public getNoteList(): void {
    if (this.noteService.getNoteListLocalData()) {
      this.noteList = this.noteService.getNoteListLocalData();
    } else {
      this.noteService
        .getNote(this.idUsuario)
        .subscribe(
          (res: Array<Note>) => this.noteList = res
        );
    }
  }

  public setToggleEditNote(): void {
    this.isEditNote = this.isEditNote ? false : true;
  }

  public get getIdNoteLocalData(): number {
    return this.noteService.getIdNoteLocalData();
  }

  public isEdittingNote(idNote: number): boolean {
    if (!this.noteService.getIdNoteLocalData()) {
      return false;
    }

    return (this.noteService.getIdNoteLocalData() === idNote) ? true : false;
  }

  public get disabledButton(): boolean {
    return this.loading || this.formNote.value.title === "";
  }

  private setValidatorsForm(): void {
    this.formNote = this.formBuilder.group({
      title: ['', [Validators.required]],
      describe: ['', [Validators.required]]
    });
  }

  private removeNoteLocalData(): void {
    this.noteService.removeIdNoteLocalData();
  }

  private clearNote(): void {
    this.formNote.get('title')?.setValue('');
    this.formNote.get('describe')?.setValue('');
  }
}
