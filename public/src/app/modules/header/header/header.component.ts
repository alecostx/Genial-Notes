import { Component, OnInit } from '@angular/core';

import { NoteService } from 'src/app/services/note/note.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isOpenNavBar: boolean = false;

  constructor(
    private userService: UserService,
    private noteService: NoteService
  ) { }

  ngOnInit(): void {
  }

  public get nameUser(): string {
    return this.userService.getNameUserLocalData();
  }

  public get isLoggedUser(): boolean {
    return this.userService.getIdUserLoggedLocalData() ? true : false;
  }

  public setToggleNavBar(): void {
    this.isOpenNavBar = this.isOpenNavBar ? false : true;
  }

  public clearCredentials(): void {
    this.userService.removeIdUserLoggedLocalData();
    this.userService.removeNameUserLocalData();
    this.noteService.removeIdNoteLocalData();
    this.noteService.removeNoteListLocalData();
    this.setToggleNavBar();
  }
}
